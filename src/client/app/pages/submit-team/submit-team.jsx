import React from 'react';
import {HeroSelect} from "./hero-select";
import {BestList} from "../standing-page/best-list/best-list";
import {GamesSelect} from "../standing-page/games-select";
import {cardApi} from "../../../api/card/card-api";
import {InputForm} from "../../common/input-form/input-form";
import {Input} from "../../common/input/input";
import {AreaInput} from "../../common/area-input/area-input";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
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
        return(
            <div className='submit-team row'>
                <div className="col-md-3 col-sm-12">
                    <BestList
                        label="Best PvP Heroes"
                        list={cards}
                    />
                </div>
                <div className="mid-side col-md-6 col-sm-12">
                    <div className="step row no-margin">
                        <div className='title-sl text-center'>TEAM BUILDING</div>
                        <div className="label-sl">1. FORM YOUR TEAM UP</div>
                        <div className="hint-label-sl">Select your cards from the list below</div>

                        <HeroSelect
                            heroes={cards}
                            onSelect={(hero)=> {
                                this.setState({hero})
                            } }
                        />
                    </div>

                    <div className="step row no-margin">
                        <div className="label-sl">2. PICK A NAME FOR YOUR TEAM!</div>
                        <div className="hint-label-sl">What is the name of your team?</div>
                        <Input
                            value={"123"}
                            // onChange={(e) => this.setState({card: {...card, card_name: e.target.value}})}
                            label="Team Building Name"
                            // type="card_name"
                            // error={getInvalidByKey("card_name")}
                        />
                    </div>
                    <div className="step row no-margin">
                        <div className="label-sl">3. TELL US MORE ABOUT YOUR BUILD!</div>
                        <div className="hint-label-sl">Description</div>
                        <TextAreaForm
                            value={'123'}
                        />
                    </div>
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

