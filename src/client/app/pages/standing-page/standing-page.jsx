import React, {Fragment} from 'react';
import {GamesSelect} from "./games-select";
import {PageFormLayout} from "./page-form-layout";
export class StandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return(
            <PageFormLayout
                className='standing-page'
            >
                {({cards})=>(
                    <Fragment>
                        <h1 className='text-center'>Select The Game</h1>
                        <GamesSelect
                            {...this.props}
                        />
                    </Fragment>
                )}
            </PageFormLayout>
        )
    }
}
