import React from 'react';
import {GamesSelect} from "./games-select";
import {cardApi} from "../../../api/card/card-api";
import {BestList} from "./best-list/best-list";
export class StandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards : null
        };
        cardApi.getAll().then(({cards}) => this.setState({cards}))
    }

    render() {
        console.log(this.props);
        const {cards} = this.state;
        return(
            <div className='standing-page'>
                <div className="left-side row">
                    <div className="col-md-3 col-sm-12">
                        <BestList
                            label="Best PvP Heroes"
                            list={cards}
                        />
                    </div>
                    <div className="mid-side col-md-6 col-sm-12">
                        <h1 className='text-center'>Select The Game</h1>
                        <GamesSelect
                            {...this.props}
                        />
                    </div>
                    <div className="right-side col-md-3 col-sm-12">
                        <BestList
                            label="Best PvP Heroes"
                            list={cards}
                        />
                    </div>
                </div>

            </div>
        )
    }
}