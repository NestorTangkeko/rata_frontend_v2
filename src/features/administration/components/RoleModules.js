import React from 'react'
 import { Grid,
        GridItem,
        Text,
        Box,
        Switch,
        Flex,
        Button
} from '@chakra-ui/react';
import modules from 'data/modules';

const RoleModules = ({onConfirm, isConfirmLoading, access, hasEdit}) => {
    const columns = [
        {
            header: 'Modules',
            accessor: 'label',
            cell: data => data.isHeader ?
                <Box pb={3} pt={3}>
                    <Text as='b'>{data.value}</Text>
                </Box>
                :  
                <Box pl={2} height='30px'>
                    <Text>{data.value}</Text>
                </Box>      
        },
        {
            header: 'View',
            accessor: 'view',
            cell: data => <Switch isChecked={data.value} 
                    onChange={(e) => 
                        handleChange({
                            accessor: data.accessor,
                            value: e.target.checked,
                            index: data.index,
                            row: data.row
                        })
                    }
                />
        },
        {
            header: 'Create',
            accessor:'create',
            cell: data =>  data.isHeader ? <></> : <Switch isChecked={data.value} isDisabled={!data.row.view} onChange={(e) => 
                handleChange({
                    accessor: data.accessor,
                    value: e.target.checked,
                    index: data.index,
                    row: data.row
                })
            }/>
        },
        {
            header:'Edit',
            accessor:'edit',
            cell: data =>  data.isHeader ? <></> : <Switch isChecked={data.value } isDisabled={!data.row.view} onChange={(e) => 
                handleChange({
                    accessor: data.accessor,
                    value: e.target.checked,
                    index: data.index,
                    row: data.row
                })
            }/>
        },
        {
            header:'Export',
            accessor: 'export',
            cell: data =>  data.isHeader ? <></> : <Switch isChecked={data.value} isDisabled={!data.row.view} onChange={(e) => 
                handleChange({
                    accessor: data.accessor,
                    value: e.target.checked,
                    index: data.index,
                    row: data.row
                })
            }/>
        }
    ]

    const [state,setState] = React.useState([])

    const handleChange = (props) => {    
        let data = [...state];
        data[props.index][props.accessor] = props.value
        if(props.row.isHeader) {
            const temp = data.filter(item => item.header_id === props.row.header_id)
            for(let i in temp) {
                data[Number(props.index) + Number(i)].view = props.value
                if(!props.value){
                    data[Number(props.index) + Number(i)].create =  props.value
                    data[Number(props.index) + Number(i)].edit   =  props.value
                    data[Number(props.index) + Number(i)].export =  props.value
                }
            }
        }
        else{
            if(props.accessor === 'view' && !props.value){
                data[props.index].create    = false
                data[props.index].edit      = false
                data[props.index].export    = false
            }   
        }

        setState(data)
    }
    
    React.useEffect(() => {
        let data = [];
        // eslint-disable-next-line array-callback-return
        modules.map(header => {
            data.push({
                id: header.id,
                header_id: header.id,
                label: header.label,
                isHeader: true,
                view: false 
            })

            data = data.concat(header.children.map(item => {
                return {
                    ...item,
                    header_id: header.id,
                    isHeader:   false,
                    view:       false,
                    create:     false,
                    edit:       false,
                    export:     false
                }
            }))
        })  
        if(access.length > 0) {
            data = data.map(item => {
                const currentAccess = access.find(a => a.header_id === item.header_id && a.id === item.id)
                
                item.view   = currentAccess.view
                item.create = currentAccess.create
                item.edit   = currentAccess.edit
                item.export = currentAccess.export
                
                return item
            })
        }
        setState(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const renderColumns = () => columns.map(item => (
        <GridItem key={item.accessor} borderBottom={'1px'} color='blackAlpha.300'>
            <Text fontSize={'sm'} as='b' color={'orange.500'}>
                {item.header.toUpperCase()}
            </Text>
        </GridItem>
    ))

    const renderData = () => state.map((data,dataIndex) => columns.map((col,index) => 
        <GridItem key={index} borderBottom={'1px'} color='blackAlpha.300' display={'flex'}>
            <Flex p={1} color='black' align={'center'}>
                {col.cell({
                    isHeader:   data.isHeader,
                    accessor:   col.accessor,
                    value:      data[col.accessor],
                    row:       data,
                    index:      dataIndex
                })}
            </Flex>
        </GridItem>
    ))

    const handleConfirm = () => {
        onConfirm(state)
    }

    return (<Flex direction={'column'} gap={2}>
        <Flex align={'baseline'}>
            <Text flexGrow={1} as='b'>Access List</Text>
            <Button colorScheme={'orange'} onClick={handleConfirm} isLoading={isConfirmLoading} disabled={!hasEdit}>Confirm</Button>
        </Flex>
        <Grid templateColumns='repeat(5, 1fr)'>
            {renderColumns()}
            {renderData()}
        </Grid>
    </Flex>
        
    )
}

export default RoleModules