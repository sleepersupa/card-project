import React, {Fragment} from 'react';
import {GamesSelect} from "./games-select";
import {homeApi} from "../../../api/home/home-api";
import {LazyImage} from "../../common/lazy-image/lazy-image";
export class StandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games : null
        };

        homeApi.getHome().then(({games})=>{
            this.setState({games})
        })
    }

    render() {
        const {games} = this.state;
        return (
            <div className="standing-page">
                <h1 className='text-center'>Select The Game</h1>
                {games && (
                    <GamesSelect
                        {...{...this.props,games}}
                    />
                )}

                {/*<LazyImage*/}
                {/*    placeHolder={"https://dummyimage.com/400x300/fff/ffffff.png"}*/}
                {/*    src={"https://about.phamvanlam.com/lazy-loading-image-demo/static/media/01.c62ad7d5.jpg"}*/}
                {/*    width={`100%`}*/}
                {/*    height={`auto`}*/}
                {/*    effect={"opacity"}*/}
                {/*    alt={"12332"}*/}
                {/*/>*/}

            </div>
        )
    }
}
