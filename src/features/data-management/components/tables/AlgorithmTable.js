import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AlgoModal from '../modals/AlgoModal';
import { useNavigate } from 'react-router-dom';

const AlgorithmTable = ({hasEdit}) => {
    const navigate = useNavigate();
    const {isOpen,onClose,onOpen} = useDisclosure();
    const columnHelper = createColumnHelper();
    const [state,setState]=React.useState({
        header:null,
        details:[]
    })

    const columns = [
        columnHelper.accessor('id',{
            header:'Algo ID',
            cell: props => <Button variant={'link'} size='sm' onClick={()=>{
                const {agg_conditions_tbls,...header} = props.row.original
                setState({
                    ...state,
                    header,
                    details: agg_conditions_tbls
                })
                onOpen();
            }}>{props.getValue()}</Button>
        }),
        columnHelper.accessor('algo_description',{
            header:'Description'
        }),
        columnHelper.accessor('agg_name',{
            header:'Aggregation Name'
        }),
        columnHelper.accessor('with_agg',{
            header:'With Agg?'
        }),
        columnHelper.accessor('parameter',{
            header:'Parameter'
        }),
        columnHelper.accessor('group_by',{
            header:'Group By'
        }),
        columnHelper.accessor('status',{
            header:'Status',
        }),
        columnHelper.display({
            header:'Action',
            cell: props => <Flex>
                <Button size='xs' isDisabled={!hasEdit}
                    onClick={()=>{
                    navigate(props.row.original.id)
                }}>Edit</Button>
            </Flex>
        })
    ]

    return (<>
            <Paginated
                title={'Algorithm'}
                route={'/v2/data-management/algorithm'}
                columns={columns}
            />
            <AlgoModal
                header={state.header}
                details={state.details}
                isOpen={isOpen}
                onClose={onClose}
            />
        </> 
    )
}

export default AlgorithmTable