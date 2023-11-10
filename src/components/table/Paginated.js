import React from 'react';
import { Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button,
    Text,
    Select,
    Input,
    Flex,
    IconButton,
    filter
} from "@chakra-ui/react";
import {RepeatIcon} from '@chakra-ui/icons';
import {
    useReactTable,
    flexRender,
    getCoreRowModel
} from "@tanstack/react-table";

import TableFilters from './TableFilters';
import DebounceInput from '../input/DebounceInput';
import {useGetDataQuery} from 'lib/redux/api/table.api.slice';
const pageSizes = [
    5,
    10,
    20,
    50,
    100
]

const Paginated = ({title,columns,route,showFilters,customFilters,selectedRows}) => {
    const [page,setPage] = React.useState({
        pageSize:10,
        pageIndex:0
    });

    const [globalFilter,setGlobalFilter] = React.useState('')
    const [columnFilters,setColumnFilters] = React.useState([])
    const [rowSelection, setRowSelection] = React.useState({})
  
    const {data = [],refetch,isLoading} = useGetDataQuery({
        route:route,
        query:{
            totalPage:page.pageSize,
            page:page.pageIndex,
            search:globalFilter,
            ...customFilters,
            ...columnFilters.reduce((result,item) => {
                result[item.id] = item.value instanceof Object && !Array.isArray(item.value)  ? item.value.value : item.value
                return result
            },{})
        }
    })

    const table = useReactTable({
        columns,
        data:data?.data || [],
        pageCount: data?.pageCount,    
        state:{
            pagination:{
                ...page
            },
            columnFilters,
            globalFilter,
            rowSelection 
        },
        getCoreRowModel:        getCoreRowModel(),
        manualPagination:       true,
        manualFiltering:        true,
        enableRowSelection:     true,
        onPaginationChange:     setPage,
        onColumnFiltersChange:  setColumnFilters,
        onGlobalFilterChange:   setGlobalFilter,
        onRowSelectionChange:   setRowSelection
    })


    //clear selectedRows
    React.useEffect(() => {
        setRowSelection({})
    },[page,columnFilters,globalFilter])

    React.useEffect(() => {
        const rows = Object.keys(rowSelection).map(i => Number(i))
        const temp = data?.data || [];
        if(selectedRows){
            if(rows.length > 0) {
                selectedRows(temp.filter((value,index) => rows.includes(index)))
            }
            else {
                selectedRows([])
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rowSelection])

    return (
        <Box borderWidth={'1px'} rounded='sm' width={'full'}>
        <Box display={'flex'} p='1' flexDirection={'column'} gap='2'>
            <Box fontWeight={'semibold'} as='h4'>{title}</Box>
            <Flex gap={1}>
                {
                    showFilters ? 
                    table.getHeaderGroups().map(headerGroup => 
                        headerGroup.headers.map(header => {
                            return (header.column.getCanFilter() ? 
                            <TableFilters key={header.column.id} column={header.column} table={table}/> : null)
                            
                        })
                    ): null
                }
            </Flex>
            <Flex direction={'row'} justifyContent='space-between'>   
                <Flex gap={1}>
                    <DebounceInput value={globalFilter ?? ''} onChange={value => setGlobalFilter(String(value))} />
                    <IconButton icon={<RepeatIcon/>} size='sm' onClick={refetch} isLoading={isLoading}/>
                </Flex> 
                <Text fontSize={'small'}>Count: {data?.rows || 0}</Text>
            </Flex>  
        </Box>
        <TableContainer borderTop={'inherit'} >
            <Table variant='simple' size='sm'>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header=> (
                                    <Th key={header.id}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </Th>
                                ))
                            }
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Td key={cell.id} fontSize='small'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Box display={{lg:'flex'}} justifyContent={{lg:'space-between'}} p='1' alignItems={'center'}>
            <Button width={{xl:'md',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.previousPage()}} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Box display={'flex'} columnGap='2' p={2} justifyContent='center' alignItems={'center'}>
                <Text fontSize={'sm'}>Page</Text>
                <Input 
                    type='number' 
                    width={'10'} 
                    size='sm' 
                    defaultValue={table.getState().pagination.pageIndex + 1} 
                    onChange={(e)=>{
                        const page = e.target.value ?   Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}/>
                <Text fontSize={'sm'}>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</Text>
                <Select 
                    width={'30'} 
                    size='sm' 
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size} rows</option>
                    ))}
                </Select>
            </Box>
            <Button width={{xl:'md',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.nextPage()}} disabled={!table.getCanNextPage()}>Next</Button>
        </Box>
    </Box>
    )
}

Paginated.defaultProps = {
 
}

export default Paginated