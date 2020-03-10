import React from 'react';
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {buildTeamApi} from "../../../api/build-team/build-team-api";
import {PageFormLayout} from "../standing-page/page-form-layout";
export class SubmitList  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            builds : null
        };
    }

    render() {
        const {builds} = this.state ;

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
                            <img height='40px' className='hero-image' src={hero.filePath} alt=""/>
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
                        210
                    </div>
                ,
                classNames: 'right'
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
                               return buildTeamApi.getBuilds().then(data => {
                                    this.setState({ builds : data })
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