import React from 'react';
import {Formik as FFormik, Form} from 'formik';

function Formik({
    children,
    initialValues={},
    validationSchema={},
    onSubmit
}) {
  return (
    <FFormik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        <Form>
            {children}
        </Form>
    </FFormik>
  )
}

export default Formik