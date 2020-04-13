import React, {Fragment} from 'react';
import {PageFormLayout} from "../standing-page/page-form-layout";
import {LoadingInline} from "../../common/loading/loading-2";
import {getParams} from "../card-commonds";
import {cardApi} from "../../../api/card/card-api";
import {UpVote} from "../../component/up-vote/up-vote";
import {voteApi} from "../../../api/vote/vote-api";
import {buildTeamApi} from "../../../api/build-team/build-team-api";
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {voteModify} from "../submit-list/submit-list";

export class HeroDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero : null,
            builds : null,
            loading :false
        };
        let {slug} = getParams(props);

        cardApi.getCardOfGame(this.props.game , slug).then(({card}) =>{
            this.setState({ hero : card })
        })
        cardApi.getOverview(this.props.game , slug).then(({pve_votes, pvp_votes }) =>{
            this.setState({
                pve_votes,
                pvp_votes
            })
        })
    }

    componentWillReceiveProps(nextProps){
        let {slug} = getParams(nextProps);
        let {oldSlug} = getParams(this.props);
        if(slug !== oldSlug){
            cardApi.getCardOfGame(nextProps.game , slug).then(({card}) =>{
                cardApi.getOverview(nextProps.game , slug).then(({pve_votes, pvp_votes }) =>{
                    this.setState({
                        hero : card,
                        pve_votes,
                        pvp_votes
                    })
                })
            })
        }

    }

    render() {
        const {hero ,votes, loading, builds, pve_votes, pvp_votes} = this.state ;

        let {game} = getParams(this.props);
        let {config} = this.props;
        let columns = [
            {
                label: 'Build Name',
                renderCell: (item) =>
                    <div
                        className='cell'
                        onClick={()=> this.props.history.push(`/g/${game}/build/${item.slug}`)}
                    >
                        {item.name}
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Formation',
                renderCell: (item) =>
                    <div
                        className='cell flex-row'
                    >
                        {item.heroes.length > 0 && item.heroes.map((hero,index)=>(
                            <img key={index} height='40px' className='hero-image' src={hero.filePath} alt=""/>
                        ))}
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Points',
                renderCell: (item) =>
                    <div
                        className='cell points'
                    >
                        <UpVote
                            loading={loading}
                            // verticalType
                            vote={votes[item._id]}
                            onChange={(status)=> {
                                if(status === votes[item._id].status ) return ;
                                this.setState({loading :true});
                                voteApi.vote(item._id , status).then(({status ,value})=>{
                                    this.setState({loading : false , votes : voteModify(votes, item , status , value) })
                                })
                            }}
                        />
                    </div>
                ,
                classNames: 'mid'
            },
        ]


        return(
            <PageFormLayout
                {...this.props}
                {...{config}}
            >
                {({cards})=> !hero ? <LoadingInline/> :(
                    <div className='hero-display'>
                        <div className='title-sl text-center'>{hero.card_name}</div>
                        <div className="image-wrap justify-center flex-row">
                            <img src={hero.filePath} className='main-hero-image' alt=""/>
                        </div>

                        <div className="vote-area">
                            <div className="pve flex-row">
                                {pve_votes && (
                                    <Fragment>
                                        <div className='tit'>PVE</div>
                                        <UpVote
                                            loading={loading}
                                            vote={pve_votes}
                                            verticalType
                                            onChange={(status)=>{
                                                this.setState({loading :true });
                                                voteApi.votePVE(hero._id , status).then(({value, status}) =>{
                                                    this.setState({loading : false, pve_votes :{value , status} })
                                                })
                                            }}
                                        />
                                    </Fragment>
                                )}
                            </div>

                            <div className="pvp flex-row">
                                {pvp_votes && (
                                    <Fragment>
                                        <div className='tit'>PVP</div>

                                        <UpVote
                                            loading={loading}
                                            vote={pvp_votes}
                                            onChange={(status)=>{
                                                this.setState({loading :true });
                                                voteApi.votePVP(hero._id , status).then(({value, status}) =>{
                                                    this.setState({loading : false , pvp_votes :{value , status}})
                                                })
                                            }}
                                            verticalType
                                        />
                                    </Fragment>
                                )}
                            </div>
                        </div>


                        <PaginationTable
                            ref={elem => this.table = elem}
                            columns={columns}
                            list={builds}
                            api={()=>{
                                return buildTeamApi.getBuildsByHero(game, hero.slug).then(({builds , votes}) => {
                                    this.setState({builds, votes})
                                    return Promise.resolve();
                                })
                            }}
                        />

                    </div>
                )}
            </PageFormLayout>
        )
    }
}