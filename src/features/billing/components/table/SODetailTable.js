import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table'
import {useParams} from 'react-router-dom';

const SODetailTable = () => {
      const {id} = useParams();
      const columnHelper = createColumnHelper();
      const columns = React.useMemo(()=> [
        columnHelper.accessor('SO_CODE'),
        columnHelper.accessor('LINE_NO'),
        columnHelper.accessor('ITEM_CODE'),
        columnHelper.accessor('LOCATION_CODE'),
        columnHelper.accessor('UM_CODE'),
        columnHelper.accessor('QUANTITY'),
        columnHelper.accessor('UNIT_PRICE'),
        columnHelper.accessor('EXTENDED_AMT'),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ],[])
  return (
    <>
      <Paginated title={'Sales Order Details'} columns={columns} route={'v2/so-upload/details/'+id}
        customFilters={{
          fk_header_id: id
        }}
      />
    </>
  )
}

export default SODetailTable