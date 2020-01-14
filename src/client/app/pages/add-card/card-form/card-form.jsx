import React from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {SlInput} from "../../../component/sl-input/sl-input";
import {UploadImage} from "../../../component/upload-image/upload-image";
export class CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.SignupSchema = Yup.object().shape({
            card_name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            type: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required')
        });
    }

    render() {
        const {filePath , onChangeImage , onSubmit } =this.props;
        return(
            <div className='card-form-wrapper'>
                <Formik
                    initialValues={this.props}
                    validationSchema={this.SignupSchema}
                    onSubmit={values => onSubmit && onSubmit(values) }
                >
                    {({ errors, touched }) => (
                        <Form
                            className='sl-form card-form'
                        >
                            <SlInput
                                name="card_name"
                                placeholder='Card Name'
                                error={errors.card_name && touched.card_name }
                                errorMessage={errors.card_name}
                                classNames='card-name'
                            />

                            <SlInput
                                name="type"
                                placeholder='Type'
                                error={errors.type && touched.type }
                                errorMessage={errors.type}
                                classNames='type'
                            />

                            <UploadImage
                                height={200}
                                classNames={['upload-card']}
                                filePath={filePath}
                                onChange={(filePath)=> onChangeImage(filePath)}
                                multiple={false}
                            />
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}