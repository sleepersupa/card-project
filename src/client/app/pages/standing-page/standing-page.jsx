import React from 'react';
import {GamesSelect} from "./games-select";
export class StandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log(this.props);
        return(
            <div className='standing-page'>
                <h1 className='text-center'>Select The Game</h1>
                <GamesSelect
                    {...this.props}
                />
            </div>
        )
    }
}