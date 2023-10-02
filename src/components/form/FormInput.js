import React from 'react';
import FormControl from './FormControl';
import {Field, useField}      from 'formik';
import {Input} from '@chakra-ui/react';

const FormInput = ({
    id,
    type,
    name,
    label,
    error,
    touched,
    isDisabled
}) => {
  const [field,meta] = useField(name);
  
  return (
    <FormControl label={label} id={id} error={meta.error} touched={meta.touched}>
        <Field
            as={Input}
            id={id}
            name={field.name}
            placeholder={label}
            isDisabled={isDisabled}
            type={type}
        />
    </FormControl>
  )
}

FormInput.defaultProps = {
  type:'text'
}

export default FormInput

