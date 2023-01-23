import React from 'react';
import {createColumnHelper} from '@tanstack/react-table';
import {Paginated} from 'components/table';
import {Button} from '@chakra-ui/react'

const ContractTariffTable = ({contract_id,isLoading,handleCancelTariff}) => {
    const columnHelper = createColumnHelper();
    const columns=[
        columnHelper.accessor('tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('tariff_rate',{
            header:'Tariff Rate'
        }),
        columnHelper.accessor('status',{
            header:'Status'
        }),
        columnHelper.accessor('fk_agg_id',{
            header:'Algorithm'
        }),
        columnHelper.accessor('valid_from',{
            header:'Valid From'
        }),
        columnHelper.accessor('valid_to',{
            header:'Valid To'
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const data = props.row.original
                const handleClick = async() => {
                    await handleCancelTariff(data.tariff_id)
                }
                return <Button size='xs' colorScheme={'red'} onClick={handleClick} isLoading={isLoading} isDisabled={data.status === 'INACTIVE'}>{'Deactivate'}</Button>
            }
        })
    ]
  return (
    <Paginated
        title={'Contract Tariff'}
        route={'/v2/contract/contract-tariff'}
        customFilters={{
            contract_id:contract_id
        }}
        columns={columns}
    />
  )
}

export default ContractTariffTable