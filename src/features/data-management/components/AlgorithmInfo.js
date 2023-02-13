import React from 'react';
import {Flex} from '@chakra-ui/react';
import Label from 'components/Label';

const AlgorithmInfo = ({data}) => {
  return (
    <Flex>
        <Flex direction={'column'} width='50%'> 
            <Label
                label={'Algorithm Name'}
                value={data?.agg_name}
            />
            <Label
                label={'Description'}
                value={data?.algo_description}  
            />
            <Label label={'Parameter'} value={data?.parameter}/>
        </Flex>
        <Flex direction={'column'}>
            <Label
                label={'With Agg?'}
                value={data?.with_agg ? 'true' : 'false'}  
            />
            <Label
                label={'Status'}
                value={data?.status}
            />
            <Label label={'Group By'} value={data?.group_by}/>
        </Flex>
    </Flex>
  )
}

export default AlgorithmInfo