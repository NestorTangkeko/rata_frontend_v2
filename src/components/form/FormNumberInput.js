import React from 'react';
import FormControl from './FormControl';
import {useField}      from 'formik';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';

const FormNumberInput = ({
    id,
    name,
    label,
    error,
    touched,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [fields,meta,helpers] = useField(name)
    const parse = (val) => val.replace(/^\$/, '')

    const {setValue,setTouched} = helpers
    const {value} = meta
  
    
    return (
        <FormControl label={label} id={id} error={error} touched={touched}>
            <NumberInput
                name={name}
                onChange={(valueString) => setValue(parse(valueString))}
                value={value}
                min={0}
                precision={2}
                onBlur={()=>setTouched(true)}
                placeholder={label}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    )
}

export default FormNumberInput