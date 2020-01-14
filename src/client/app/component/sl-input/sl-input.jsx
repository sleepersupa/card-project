import React from 'react';
import {Field, Form} from "formik";
import classnames from 'classnames';

export class SlInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {error , name , errorMessage, classNames , type , placeholder }  = this.props ;
        return(
            <div className={classnames('sl-input',classNames)}>
                <Field placeholder={placeholder} name={name} type={type} />
                {error ? (
                    <div className='er-message'>{errorMessage}</div>
                ) : null}
            </div>
        )
    }
}