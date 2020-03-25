import React from 'react';
import {cardApi} from "../../../api/card/card-api";
import {BuildTeamForm} from "./build-team-form";
import {PageFormLayout} from "../standing-page/page-form-layout";
import {getParams} from "../card-commonds";
export class SubmitTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero : null
        };
        let {game} = getParams(this.props);
        cardApi.getAllOfGame(game).then(({cards}) => this.setState({cards}))    }

    render() {
        const {hero , cards} =  this.state;
        return (
            <PageFormLayout
                className='submit-team'
                {...this.props}
            >
                {()=>(
                    <BuildTeamForm
                        build={{name : '', heroes: [], tags:[] }}
                        cards={cards}
                        {...this.props}
                    />
                )}
            </PageFormLayout>
        )
    }
}

