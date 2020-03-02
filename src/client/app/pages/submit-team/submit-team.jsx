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
        console.log(hero)
        console.log(cards)
        return(
            <div className='submit-team row'>
                <div className="col-md-3 col-sm-12">
                    <BestList
                        label="Best PvP Heroes"
                        list={cards}
                    />
                </div>
                <div className="mid-side col-md-6 col-sm-12">
                    {cards && (
                        <BuildTeamForm
                            build={{name : '', heroes: [] }}
                            cards={cards}
                        />
                    )}

                </div>
                <div className="right-side col-md-3 col-sm-12">
                    <BestList
                        label="Best PvP Heroes"
                        list={cards}
                    />
                </div>

            </div>
        )
    }
}

