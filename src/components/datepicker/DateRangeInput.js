import { Box,Text } from '@chakra-ui/react';
import React from 'react';
import ReactDatePicker from './ReactDatePicker';
import moment from 'moment';

const DateInput = ({start,end,handleChange,label}) => {
    const [startDate,setStartDate] = React.useState(null)
    const [endDate,setEndDate] = React.useState(null)

    const onChange = dates => {
        let [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        
        start = moment(start).isValid() ? moment(start).format('YYYY-MM-DD') : null;
        end =   moment(end).isValid() ? moment(end).format('YYYY-MM-DD') : null;

        handleChange(!start || !end ? null : `${start},${end}`);
    }

    return (
        <Box display={'flex'} flexDirection='column'>
                <Text fontSize={'sm'} as='b'>{label}</Text>
                <ReactDatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onChange}
                    placeholder='RDD'
                    isClearable
                />
        </Box>
        
    )
}

export default DateInput