import React from 'react'
import { IndeterminateCheckbox } from 'components/table';
import JVPaginated  from './JVPaginated';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';
import {setJVCSelectedRows} from 'lib/redux';

const JVCreationTable = ({ onSelectedRowsChange, onClearSelectionCallback }) => {
    const dispatch = useDispatch();

    const resetSelectionRef = React.useRef(null);

    const numberFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const columnHelper = createColumnHelper();

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
            ),
            meta: { sticky: true }
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
    ],[]);

    // Expose the resetSelection function to the parent
    React.useEffect(() => {
        if (onClearSelectionCallback && resetSelectionRef.current) {
            onClearSelectionCallback(resetSelectionRef.current);
        }
    }, [onClearSelectionCallback, resetSelectionRef.current]);

    // When Paginated calls this, update local state and notify parent
    const handleSelectedRows = React.useCallback((rows = []) => {
        dispatch(setJVCSelectedRows(rows));
    }, [dispatch]);

    return (
        <>
            <JVPaginated
                title={'Draft Bill'}
                columns={columns}
                route={'/v2/jv-creation'}
                selectedRows={handleSelectedRows}
                resetSelectionRef={resetSelectionRef}
                showFilters
            />
        </>
    )
};

export default JVCreationTable;