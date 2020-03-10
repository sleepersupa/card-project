import React, {Fragment} from 'react';
import {PageFormLayout} from "../standing-page/page-form-layout";
import {buildTeamApi} from "../../../api/build-team/build-team-api";
import {LoadingInline} from "../../common/loading/loading-2";
export class BuildDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            build : null
        };
        buildTeamApi.getBuild(this.props.match.params.slug).then(data => {
            this.setState({build : data})
        })
    }

    render() {
        const {build } =this.state;
        return(
            <PageFormLayout
                // className='build-display'
            >
                {({cards})=> !build ? <LoadingInline/> :(
                    <div className='build-display'>
                        <div className='title-sl text-left'>{build.name}</div>
                        <div className="hint-label-sl">Shared by: {build.created_by || "Admin"}</div>

                        <div className="flex-row justify-center">
                            {build.heroes.map((hero, index)=>(
                                <img key={index} height='60px' style={{marginRight : 5}} src={hero.filePath} alt=""/>
                            ))}
                        </div>
                    </div>
                )}
            </PageFormLayout>
        )
    }
}