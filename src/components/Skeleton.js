import React from 'react';
import {SkeletonText, Flex} from '@chakra-ui/react';

const Skeleton = () => {
  return (
    <Flex direction={'column'}>
        <SkeletonText mt='4' noOfLines={4} spacing='5' skeletonHeight='2' />
    </Flex>
  )
}

export default Skeleton