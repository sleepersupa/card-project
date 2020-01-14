import React from 'react';
import {Field, Form, Formik} from "formik";
export class SlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div className='sl-form'>
                <Formik
                    initialValues={this.state}
                    validationSchema={this.SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log('huy')
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="firstName" />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}
                            {/*<Field name="lastName" />*/}
                            {/*{errors.lastName && touched.lastName ? (*/}
                            {/*    <div>{errors.lastName}</div>*/}
                            {/*) : null}*/}
                            {/*<Field name="email" type="email" />*/}
                            {/*{errors.email && touched.email ? <div>{errors.email}</div> : null}*/}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}