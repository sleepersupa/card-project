import React from 'react';
import {HeroSelect} from "./hero-select";
import {BestList} from "../standing-page/best-list/best-list";
import {GamesSelect} from "../standing-page/games-select";
import {cardApi} from "../../../api/card/card-api";
import {InputForm} from "../../common/input-form/input-form";
import {Input} from "../../common/input/input";
import {AreaInput} from "../../common/area-input/area-input";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
import {minLength, required} from "../../common/form/validations";
import {Editor} from "../../common/editor/editor";
import {BuildTeamForm} from "./build-team-form";
import {PageFormLayout} from "../standing-page/page-form-layout";
export class SubmitTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero : null
        };
        cardApi.getAll().then(({cards}) => this.setState({cards}))
    }

    render() {
        const {hero , cards} =  this.state;

        return (
            <PageFormLayout
                className='submit-team'
            >
                {({cards})=>(
                    <BuildTeamForm
                        build={{name : '', heroes: [] }}
                        cards={cards}
                    />
                )}
            </PageFormLayout>
        )
    }
}

