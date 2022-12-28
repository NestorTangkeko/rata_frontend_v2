    import React from 'react';
import { Table as CTable,
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
    Spacer
} from "@chakra-ui/react";

import {
    // Column,
    // Table as ReactTable,
    // PaginationState,
    useReactTable,
    getCoreRowModel,
    // getFilteredRowModel,
    getPaginationRowModel,
    // ColumnDef,
    // OnChangeFn,
    flexRender,
  } from '@tanstack/react-table'
  const pageSizes = [
    5,
    10,
    20,
    50,
    100
]

const Table = ({data,columns,title}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <Box borderWidth={'1px'} rounded='sm'>
            <Box display={'flex'} p='1' flexDirection={'column'} gap='2'>
                <Box fontWeight={'semibold'} as='h4'>{title}</Box>
                <Flex direction={'row'} justifyContent='space-between'>  
                    <Spacer/> 
                    <Text fontSize={'small'}>Count: {data.length || 0}</Text>
                </Flex>
            </Box>
            <TableContainer borderTop={'inherit'}>
                <CTable variant={'simple'} size='sm'>
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
                </CTable>
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

export default Table

