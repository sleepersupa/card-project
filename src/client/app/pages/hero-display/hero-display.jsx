import React from 'react';
import {PageFormLayout} from "../standing-page/page-form-layout";
import {LoadingInline} from "../../common/loading/loading-2";
import {getParams} from "../card-commonds";
import {cardApi} from "../../../api/card/card-api";
import {UpVote} from "../../component/up-vote/up-vote";
export class HeroDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero : null
        };
        let {slug} = getParams(props);

        cardApi.getCardOfGame(this.props.game , slug).then(({card}) =>{
            this.setState({ hero : card })
        })
    }

    render() {
        const {hero} = this.state ;

        return(
            <PageFormLayout
            >
                {({cards})=> !hero ? <LoadingInline/> :(
                    <div className='hero-display'>
                        <div className='title-sl text-center'>{hero.card_name}</div>
                        <div className="image-wrap justify-center flex-row">
                            <img src={hero.filePath} className='hero-image' alt=""/>
                        </div>

                        <div className="vote-area">
                            <div className="pve flex-row">
                                <div className='tit'>PVE</div>
                                <UpVote

                                    verticalType
                                />
                            </div>
                            <div className="pvp flex-row">
                                <div className='tit'>PVP</div>

                                <UpVote
                                    verticalType
                                />
                            </div>
                        </div>
                    </div>
                )}
            </PageFormLayout>
        )
    }
}