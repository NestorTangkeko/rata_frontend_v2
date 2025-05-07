import React from 'react'
import { IndeterminateCheckbox } from 'components/table';
import JVPaginated  from './JVPaginated';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {setJVRSelectedRows} from 'lib/redux';

import { useExportJVCMutation, useExportJVRMutation } from 'lib/redux/api/jv_reversal.api.slice';

const JVReversalTable = ({ onSelectedRowsChange, onClearSelectionCallback }) => {
    const [exportJVC, {jvcLoading}] = useExportJVCMutation();
    const [exportJVR, {jvrLoading}] = useExportJVRMutation();
    const toast = useToast();

    const dispatch = useDispatch();

    const resetSelectionRef = React.useRef(null);

    const numberFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const handleJVCExport = async (jv_ref) => {
        try {
            const result = await exportJVC(jv_ref).unwrap();
            console.log(result);

            toast({
                title: "Success",
                description: "JV Create file exported successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to export JV Create file",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleJVRExport = async (jv_ref) => {
        try {
            const result = await exportJVR(jv_ref).unwrap();
            console.log(result);

            toast({
                title: "Success",
                description: "JV Reverse file exported successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to export JV Reverse file",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

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
        columnHelper.accessor('jvr_db_no',{
            header:'Draft Bill No.'
        }),
        columnHelper.accessor('jvr_db_date',{
            header:'Draft Bill Date'
        }),
        columnHelper.accessor('jvr_trip_no',{
            header:'Trip No.'
        }),
        columnHelper.accessor('jvr_invoice_no',{
            header:'BR No.'
        }),
        columnHelper.accessor('jvr_customer_desc',{
            header:'Customer'
        }),
        columnHelper.accessor('jvr_service_type_desc',{
            header:'Service Type'
        }),
        columnHelper.accessor('jvr_location',{
            header:'Location'
        }),
        columnHelper.accessor('jvr_vendor_desc',{
            header:'Vendor'
        }),
        columnHelper.accessor('jvr_vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('jvr_vehicle_id',{
            header:'Vehicle ID'
        }),
        columnHelper.accessor('jvr_ship_from',{
            header:'STC From'
        }),
        columnHelper.accessor('jvr_ship_to',{
            header:'STC To'
        }),
        columnHelper.accessor('jvr_tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('jvr_total_charges',{
            header:'Total Charges',
            cell: info => {
                const numberValue = parseFloat(info.getValue());
                return isNaN(numberValue) ? 'N/A' : numberFormatter.format(numberValue);
            }
        }),
        columnHelper.accessor('jv_create_ref_no',{
            header:'JV Create Number',
            cell: props => {
                const handleClick = () => {
                    console.log(`Downloading file: ${props.getValue()}`);
                    handleJVCExport(props.getValue())
                }
                return <Button size={'xs'} onClick={handleClick} variant='link' colorScheme='blue'>{props.getValue()}</Button>
            }
        }),
        columnHelper.accessor('jv_status',{
            header:'Status'
        }),
        columnHelper.accessor('jv_actual_cr',{
            header:'CR'
        }),
        columnHelper.accessor('jv_actual_cr_date',{
            header:'CR Date'
        }),
        columnHelper.accessor('jv_actual_trip_number',{
            header:'Trip Number'
        }),
        columnHelper.accessor('jv_actual_vendor',{
            header:'Actual Vendor'
        }),
        columnHelper.accessor('jv_actual_vehicle_type',{
            header:'Actual Vehicle Type'
        }),
        columnHelper.accessor('jv_actual_charges',{
            header:'Actual Charges',
            cell: info => {
                const numberValue = parseFloat(info.getValue());
                return isNaN(numberValue) ? 'N/A' : numberFormatter.format(numberValue);
            }
        }),
        columnHelper.accessor('jv_reverse_ref_no',{
            header:'JV Reverse Number',
            cell: props => {
                const handleClick = () => {
                    console.log(`Downloading file: ${props.getValue()}`);
                    handleJVRExport(props.getValue());
                }
                return <Button size={'xs'} onClick={handleClick} variant='link' colorScheme='blue'>{props.getValue()}</Button>
            }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    // Expose the resetSelection function to the parent
    React.useEffect(() => {
        if (onClearSelectionCallback && resetSelectionRef.current) {
            onClearSelectionCallback(resetSelectionRef.current);
        }
    }, [onClearSelectionCallback, resetSelectionRef.current]);

    // When Paginated calls this, update local state and notify parent
    const handleSelectedRows = React.useCallback((rows = []) => {
        // dispatch(setJVRSelectedRows(rows));
        dispatch(setJVRSelectedRows(
            rows.filter(item => (
                item.jv_actual_cr  &&
                item.jv_status === 'For Creation'
            )
        )))
    }, [dispatch]);

    return (
        <>
            <JVPaginated
                title={'Draft Bill'}
                columns={columns}
                route={'/v2/jv-reversal'}
                selectedRows={handleSelectedRows}
                resetSelectionRef={resetSelectionRef}
                showFilters
            />
        </>
    )
};

export default JVReversalTable;