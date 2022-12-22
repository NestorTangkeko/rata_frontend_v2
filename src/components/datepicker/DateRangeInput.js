import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactDatePicker from './ReactDatePicker';
import moment from 'moment';

const DateInput = ({start,end,handleChange,label}) => {
    const [startDate,setStartDate] = React.useState(null)
    const [endDate,setEndDate] = React.useState(null)

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        handleChange(`${moment(start).format('YYYY-MM-DD')},${moment(end).format('YYYY-MM-DD')}`);
    }

    return (
        <Box>
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