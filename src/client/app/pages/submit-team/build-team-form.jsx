import React, {Fragment} from 'react';
import {Form} from "../../common/form/form";
import {maxLength, minLength, required} from "../../common/form/validations";
import {buildTeamApi} from "../../../api/build-team/build-team-api";
import {getParams} from "../card-commonds";
import {HeroSelect} from "./hero-select";
import {Input} from "../../common/input/input";
import {Editor} from "../../common/editor/editor";
import {LoadingInline} from "../../common/loading/loading-2";
import {Checkbox} from "../../common/checkbox/checkbox";

export class BuildTeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            build : props.build
        };
    }


    render() {

        const {build} = this.state;

        const {cards, config, history} = this.props;
        if(!config) return <LoadingInline/>;

        let validations =[
            {"name": [required("Build Name"), minLength(3, "Build Name")]},
            {"created_by": [required("Creator Name"), minLength(3, "Creator Name")]},
            {"heroes": [minLength(config.min_heroes || 1, "Build Heroes") , maxLength(config.max_heroes, "Build Heroes" )]},
        ];

        let {game} = getParams(this.props);

        return(
            <Form
                validations={validations}
                formValue={build}
                onSubmit={() => {
                    buildTeamApi.submit({...build, game}).then((data)=>{
                        history.push(`/g/${game}/build/${data.slug}`)
                    })
                }}
                render={(getInvalidByKey)=>(
                    <Fragment>
                        <div className="step row no-margin">
                            <div className='title-sl text-center'>TEAM BUILDING</div>
                            <div className="label-sl">1. FORM YOUR TEAM UP</div>
                            <div className="hint-label-sl">Select your cards from the list below</div>

                            <HeroSelect
                                heroes={cards}
                                display={(hero)=> (
                                    <img
                                        onClick={()=> {
                                            if(build.heroes.length < config.max_heroes && !build.heroes.find(f => f._id === hero._id)){
                                                this.setState({build: {...build, heroes : [...build.heroes , hero]}})
                                            }
                                        }}
                                        className='hero-image' src={hero.filePath} alt=""
                                    />
                                ) }
                            />
                        </div>

                        <div className="step step-2 row no-margin">
                            <div className="label-sl">2. PICK A NAME FOR YOUR TEAM!</div>
                            <div className="hint-label-sl">What is the name of your team?</div>
                            <HeroSelect
                                heroes={build.heroes}
                                display={(hero)=> (
                                    <img
                                        onClick={()=> {
                                            this.setState({ build: {...build, heroes : build.heroes.filter(h => h._id !== hero._id )}})
                                        }}
                                        className='hero-image' src={hero.filePath} alt=""
                                    />
                                ) }
                                error={getInvalidByKey("heroes")}
                            />
                            <Input
                                value={build.name}
                                onChange={(e) => this.setState({build: {...build, name: e.target.value}})}
                                label="Team Building Name"
                                type="name"
                                error={getInvalidByKey("name")}
                            />

                            <Input
                                value={build.created_by}
                                onChange={(e) => this.setState({build: {...build, created_by: e.target.value}})}
                                label="Creator Name"
                                type="created_by"
                                error={getInvalidByKey("created_by")}
                            />
                            <div className="form-group-sl">

                                <div className="control-label-sl">
                                    Categories
                                </div>

                                {config.tags.map((tag,index)=>(
                                    <Checkbox
                                        key={index}
                                        value={build.tags.includes(tag)}
                                        label={tag}
                                        onChange={(value) => {
                                            this.setState({ build: {...build, tags : !value ? build.tags.filter(t => t !== tag) : [...build.tags, tag]}})
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="step row no-margin">
                            <div className="label-sl">3. TELL US MORE ABOUT YOUR BUILD!</div>
                            <div className="hint-label-sl">Description</div>
                            <Editor
                                minHeight={400}
                                value={build.description}
                                onChange={(value) => {
                                    this.setState({build: {...build, description: value }})
                                }}
                                error={getInvalidByKey("description")}
                            />

                            <button type="submit" className="btn-green btn-submit">
                                Submit
                            </button>
                        </div>
                    </Fragment>
                )}
            />
        )
    }
}