import { InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import React,{forwardRef} from 'react';
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./chakra-datepicker.css";

const customDateInput = ({ value, onClick, onChange },ref) => (
    <Input
      placeholder='Date'
      autoComplete="off"
      background="white"
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange}
    />
  );

customDateInput.displayName = "DateInput";
const CustomInput = forwardRef(customDateInput);
const icon = <CalendarIcon fontSize="sm" />;


const ReactDatePicker = ({
    onChange,
    isClearable = false,
    showPopperArrow = false,
    startDate,
    endDate,
    placeholder,
    selectsRange,
    ...props
}) => {
  return (
    <>
     <InputGroup>
        <DatePicker
          selectsRange
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          className="react-datapicker__input-text"
          customInput={<CustomInput />}
          dateFormat="MM/dd/yyyy"
          
          {...props}
        />
        <InputRightElement color="gray.500" children={icon} />
      </InputGroup>
    </>
  )
}

export default ReactDatePicker