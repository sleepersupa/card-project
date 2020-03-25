import React from 'react';
export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {onChange, value , label} =this.props;
        return(
            <div className='checkbox-sl'>
                <input
                    className='check-box'
                    value={value}
                    onChange={()=> onChange(!value)}
                    type="checkbox"/>
                <span className='checkbox-label'>
                    {label}
                </span>
            </div>
        )
    }
}