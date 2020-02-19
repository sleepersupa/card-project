// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import {SlInput} from "../../component/sl-input/sl-input";
// import {UploadImage} from "../../component/upload-image/upload-image";
//
//
//
// export class ValidationSchemaExample extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstName: '',
//             lastName: '',
//             email: '',
//             filePath:''
//         };
//         this.SignupSchema = Yup.object().shape({
//             firstName: Yup.string()
//                 .min(2, 'Too Short!')
//                 .max(50, 'Too Long!')
//                 .required('Required'),
//             lastName: Yup.string()
//                 .min(2, 'Too Short!')
//                 .max(50, 'Too Long!')
//                 .required('Required'),
//             email: Yup.string()
//                 .email('Invalid email')
//                 .required('Required'),
//         });
//     }
//
//     render() {
//         return(
//             <div>
//                 <h1>Signup</h1>
//                 <Formik
//                     initialValues={this.state}
//                     validationSchema={this.SignupSchema}
//                     onSubmit={values => {
//                         // same shape as initial values
//                         console.log('huy')
//                         console.log(values);
//                     }}
//                 >
//                     {({ errors, touched }) => (
//                         <Form
//                             className='sl-form login-form'
//                         >
//                             <SlInput
//                                 name="firstName"
//                                 placeholder='First Name'
//                                 error={errors.firstName && touched.firstName }
//                                 errorMessage={errors.firstName}
//                                 classNames='first-name'
//                             />
//
//                             <SlInput
//                                 name="lastName"
//                                 placeholder='Last Name'
//                                 error={errors.lastName && touched.lastName }
//                                 errorMessage={errors.lastName}
//                                 classNames='last-name'
//                             />
//
//                             <SlInput
//                                 name="email"
//                                 placeholder='Email'
//                                 error={errors.email && touched.email }
//                                 errorMessage={errors.email}
//                                 classNames='email'
//                                 type='email'
//                             />
//
//                             <UploadImage
//                                 height={50}
//                                 classNames={['upload-card']}
//                                 filePath={this.state.filePath}
//                                 onChange={(filePath)=> this.setState({filePath})}
//                             />
//
//                             <button className='btn btn-primary' type="submit">Submit</button>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         )
//     }
// }