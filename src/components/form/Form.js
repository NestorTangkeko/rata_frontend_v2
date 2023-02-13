import React from 'react';
import {Formik} from 'formik';
import {
    Flex
} from '@chakra-ui/react';

const Form = ({
    onSubmit,
    children,
    schema,
    initialValues
}) => {

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
        {({handleSubmit,errors,touched,values,setFieldValue})=> 
                <form onSubmit={handleSubmit}>
                    <Flex gap={3} direction='column'>
                        {children({errors,touched,values,setFieldValue})}
                    </Flex>
                </form>
            }
        </Formik>
    )
}

export default Form