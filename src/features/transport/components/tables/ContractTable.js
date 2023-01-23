import React from 'react';
import {createColumnHelper} from '@tanstack/react-table';
import {Button} from '@chakra-ui/react';
import {Paginated} from 'components/table';

const ContractTable = ({goToDetails}) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('contract_id',{
            header:'Contract ID',
            cell:props => {
                const data = props.getValue();
                const handleClick = () => {
                    goToDetails(data)
                }
                return <Button variant='link' colorScheme={'blue'} size='xs' onClick={handleClick}>{data}</Button>
            }
        }),
        columnHelper.accessor('contract_description',{
            header:'Description'
        }),
        columnHelper.accessor('contract_type',{
            header:'Contract Type'
        }),
        columnHelper.accessor('contract_status',{
            header:'Contract Status'
        }),
        columnHelper.accessor('principal_code',{
            header:'Principal Code'
        }),
        columnHelper.accessor('vendor_group',{
            header:'Trucker Group'
        }),
        columnHelper.accessor('valid_from',{
            header:'Valid From'
        }),
        columnHelper.accessor('valid_to',{
            header:'Valid To'
        })
    ]
    
    return (
        <Paginated
            title={'Transport Contract'}
            columns={columns}
            route={'/v2/contract'}
        />
    )
}

export default ContractTable