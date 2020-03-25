import React from "react";

export class SwitchButton extends React.Component {
    render() {
        const {value, disabled = false, onChange} = this.props;
        return (
            <div className="switch-button-container">
                <div
                    className={`switch-button ${value ? "on" : "off"}`}
                    onMouseDown={() => {
                        if (disabled) {
                            return;
                        }
                        if (onChange) {
                            onChange(!value);
                        }
                    }}
                >
                    <div className="button"/>
                </div>
            </div>
        );
    }
}
