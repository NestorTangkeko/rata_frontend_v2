import React from 'react';
import FormControl from './FormControl';
import {Field}      from 'formik';
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

  return (
    <FormControl label={label} id={id} error={error} touched={touched}>
        <Field
            as={Input}
            id={id}
            name={name}
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

