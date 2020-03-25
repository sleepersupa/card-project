import React from "react";
import {SwitchButton} from "../switch-button/switch-button";


export function SwitchInline({onChange, toggleValue, toggleLabel, className = null, disabled = false}) {
    return (
        <div className={`switch-inline ${className}`} onClick={() => !disabled && onChange(!toggleValue)}>
            <SwitchButton disabled={disabled} value={toggleValue}/>
            { toggleLabel && (
                <div className="label">
                    { toggleLabel.length > 1
                        ? toggleValue ? toggleLabel[0] : toggleLabel[1]
                        : toggleLabel[0]
                    }
                </div>
            )}
        </div>
    )
}
