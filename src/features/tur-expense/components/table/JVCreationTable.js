import React from 'react'
import { Paginated, IndeterminateCheckbox } from 'components/table';
import CustomPaginated  from './CustomPaginated';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setJVCSelectedRows} from 'lib/redux';

const JVCreationTable = React.forwardRef(({ onSelectedRowsChange }, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedRowsData, setSelectedRowsData] = React.useState([]);
    const tableRef = React.useRef(null);

    // Expose clear method to parent
    React.useImperativeHandle(ref, () => ({
        clearSelection: () => {
            if (tableRef.current) {
                tableRef.current.clearSelection();
            }
        }
    }));

    const columnHelper = createColumnHelper();

    const numberFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const columns = React.useMemo(() => [
        {
            id:'select',
            header:({table}) => (
                <IndeterminateCheckbox
                    {...{
                        isChecked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell:({row}) => (
                <IndeterminateCheckbox
                    {...{
                        isChecked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            )
        },
        columnHelper.accessor('jvc_db_no',{
            header:'Draft Bill No.'
        }),
        columnHelper.accessor('jvc_db_date',{
            header:'Draft Bill Date'
        }),
        columnHelper.accessor('jvc_trip_no',{
            header:'Trip No.'
        }),
        columnHelper.accessor('jvc_invoice_no',{
            header:'BR No.'
        }),
        columnHelper.accessor('jvc_customer',{
            header:'Customer'
        }),
        columnHelper.accessor('jvc_service_type',{
            header:'Service Type'
        }),
        columnHelper.accessor('jvc_location',{
            header:'Location'
        }),
        columnHelper.accessor('jvc_vendor',{
            header:'Vendor'
        }),
        columnHelper.accessor('jvc_vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('jvc_vehicle_id',{
            header:'Vehicle ID'
        }),
        columnHelper.accessor('jvc_stc_from',{
            header:'STC From'
        }),
        columnHelper.accessor('jvc_stc_to',{
            header:'STC To'
        }),
        columnHelper.accessor('jvc_tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('jvc_total_charges',{
            header:'Total Charges',
            cell: info => {
                const numberValue = parseFloat(info.getValue());
                return isNaN(numberValue) ? 'N/A' : numberFormatter.format(numberValue);
            }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    // When Paginated calls this, update local state and notify parent
    const handleSelectedRows = React.useCallback((rows = []) => {
        // Optional filtering logic
        dispatch(setJVCSelectedRows(rows));
    }, [dispatch]);

    return (
        <>
            <CustomPaginated
                ref={tableRef}
                title={'Draft Bill'}
                columns={columns}
                route={'/v2/jv-creation'}
                selectedRows={handleSelectedRows}
                showFilters
            />
        </>
    )
});

export default JVCreationTable