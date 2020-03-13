import React from 'react';
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {buildTeamApi} from "../../../api/build-team/build-team-api";
import {PageFormLayout} from "../standing-page/page-form-layout";
import {UpVote} from "../../component/up-vote/up-vote";
import {voteApi} from "../../../api/vote/vote-api";
import {getParams} from "../card-commonds";
export class SubmitList  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            builds : null,
            loading : false,
            votes : null
        };
    }

    voteModify(votes , item, status , value ){
        return {
            ...votes,
            [item._id] : {...votes[item._id] ,
                status,
                value : value
            }
        }
    }

    render() {
        const {builds , loading , votes } = this.state ;
        let {game} = getParams(this.props);
        let columns = [
            {
                label: 'Build Name',
                renderCell: (item) =>
                    <div
                        className='cell'
                        onClick={()=> this.props.history.push(`/g/game-1/build/${item.slug}`)}
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
                                    this.setState({loading : false , votes : this.voteModify(votes, item , status , value) })
                                })
                            }}
                        />
                    </div>
                ,
                classNames: 'mid'
            },
        ]

        return(
            <PageFormLayout>
                {({cards})=>(
                    <div className='submit-list'>
                        <div className='title-sl text-center'>Submit List</div>

                        <PaginationTable
                            ref={elem => this.table = elem}
                            columns={columns}
                            list={builds}
                            api={()=>{
                               return buildTeamApi.getBuilds(game).then(({builds , votes}) => {
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