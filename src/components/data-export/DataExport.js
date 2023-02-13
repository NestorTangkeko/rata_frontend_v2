import React from 'react';
import {Button,useDisclosure} from '@chakra-ui/react';
import DataExportModal from './DataExportModal';

const DataExport = ({
  type,
  route,
  hidden
}) => {
  const {isOpen, onClose, onOpen} = useDisclosure()

  return (<>
    <Button onClick={onOpen} colorScheme='orange' hidden={hidden}>Export</Button>
      <DataExportModal
        route={route}
        type={type}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

DataExport.defaultProps = {
  type: 'default',
  hidden: false
}

export default DataExport