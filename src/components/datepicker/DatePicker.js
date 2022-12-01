import React from 'react';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DatePicker = ({
    selected,
    onSelect
}) => {

    return (
        <DayPicker
            mode='single'
            selected={selected}
            onSelect={onSelect}
        />
    )
}

export default DatePicker