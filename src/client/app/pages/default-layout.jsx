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
                <div className="layout-header">
                    <div className="head-panel flex-row">
                        <div className="panel-left flex-row">
                            <img className='main-game-image' src="https://vietmod.co/wp-content/uploads/2019/06/icon-790.png" alt=""/>
                            <div className='main-game-name'>Game AFK Arena</div>
                        </div>

                        <div className="panel-right flex-row">
                            <Input
                                value='123'
                                onChange={() => {}}
                            />
                            <button className='btn-search'>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                    </div>
                </div>
                <NavBar/>
                {children}
            </div>
        )
    }
}