import React from 'react';
import {Input} from "../common/input/input";
import {NavBar} from "./nav-bar";
export class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {children} = this.props ;
        return(
            <div className='default-layout'>
                <NavBar
                    {...this.props}
                />
                {children && children({...this.props})}
            </div>
        )
    }
}