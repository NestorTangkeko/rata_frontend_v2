import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@chakra-ui/react';
import { useDownloadReportMutation } from 'lib/redux/api/report.api.slice';

const ReportLogsTable = () => {
    const [download, {isLoading}] = useDownloadReportMutation();
    const {report_name} = useParams()
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('id'), 
        columnHelper.accessor('transaction_date'),
        columnHelper.accessor('report_id'),
        columnHelper.accessor('report_status'),
        columnHelper.accessor('err_message'),
        columnHelper.accessor('file_name'),
        columnHelper.accessor('createdAt', {
            cell: props => moment(props.getValue()).format('YYYY-MM-DD HH:mm:ss')
        }),
        columnHelper.accessor('file_path',{
            header:'Download',
            cell: props => {
                const row = props.row.original;
                const handleDownload = async() => {
                    await download({
                        report: report_name,
                        path: props.getValue(),
                        fileName: row.file_name
                    })
                    .unwrap()
                }
                return <Button isLoading={isLoading} onClick={handleDownload} disabled={props.row.original.report_status !== 'DONE'} colorScheme='orange' size='xs'>Download</Button>
            }
        }),
    ]

    return (
       <>
        <Paginated
            title={'Report Details'}
            route={'/v2/reports/'+report_name}
            columns={columns}
        />
       </>
    )
}

export default ReportLogsTable