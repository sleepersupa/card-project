import React from "react";
import classnames from "classnames";
export class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: false
        }
    }

    blur() {
        this.input.blur();
    }

    render() {
        let {className, value, onChange, placeholder, type ='text', error, disabled, autoSelect, onKeyDown, onFocus, onBlur, label} = this.props;
        let {focus} = this.state;

        return (

            <div className={classnames("form-group-sl input-sl", className, focus && "focused")}>
                {label && (
                    <div className="control-label-sl">
                        {label}
                    </div>
                )}

                <input
                    ref={input => this.input = input}
                    value={value === undefined ? "" : value}
                    className={classnames("form-control-sl", error && "is-invalid")}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={() => {this.setState({focus: true}); onFocus && onFocus()}}
                    onBlur={() => {this.setState({focus: false}); onBlur && onBlur()}}
                    type={type}
                    disabled={disabled}
                    onClick={() => {
                        autoSelect && this.input.select();
                    }}
                    autoComplete='false'
                    onKeyDown={onKeyDown}
                />

                <div className="error-text">
                    {error}
                </div>
            </div>
        );
    }
}