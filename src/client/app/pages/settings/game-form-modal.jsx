import React, {Fragment} from 'react';
import {isNumber, isSlug, minLength, required} from "../../common/form/validations";
import {Input} from "../../common/input/input";
import {UploadImage} from "../../component/upload-image/upload-image";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
import {Form} from "../../common/form/form";
import {Editor} from "../../common/editor/editor";
import {gameApi} from "../../../api/game/game-api";
import {SwitchInline} from "../../common/switch-inline/switch-inline";
import {TagsForm} from "../../common/tags-form/tags-form";
export class GameFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game ? props.game : {tags:[] , types :[], factions :[]}
        };
    }

    onSubmit(){
        const {editType , onClose } = this.props ;
        let {game } = this.state;

        if(editType){
            gameApi.editGame(game).then(()=>{
                onClose && onClose()
            })
        }else{
            gameApi.addGame(game).then(()=>{
                onClose && onClose()
            })
        }
    }

    render() {
        const {editType} = this.props ;
        let {game } = this.state;


        let validations = [
            {"name": [required("Name"), minLength(3, "Name")]},
            {"min_heroes": [required("Min Heroes"), isNumber()]},
            {"max_heroes": [required("Max Heroes"), isNumber()]},
            {"image": [required("Image")]},
            {"slug": [required("Slug"), isSlug("Slug")]},

        ];


        return(
            <div className='game-form-modal'>

                <div className="modal-header">
                    {editType ? "Edit Game" : "Add New Game"}
                </div>

                <Form
                    onSubmit={() => this.onSubmit()}
                    formValue={game}
                    validations={validations}
                    render={(getInvalidByKey) => {
                        return (
                            <Fragment>
                                <div className="modal-body">
                                    <div className='game-form'>
                                        <Input
                                            value={game.name}
                                            onChange={(e) => this.setState({game: {...game, name: e.target.value}})}
                                            label={"Game Name"}
                                            type="name"
                                            error={getInvalidByKey("name")}
                                        />

                                        <Input
                                            value={game.min_heroes}
                                            onChange={(e) => this.setState({game: {...game, min_heroes: e.target.value}})}
                                            label={"Min Heroes"}
                                            type="min_heroes"
                                            error={getInvalidByKey("min_heroes")}
                                        />


                                        <Input
                                            value={game.max_heroes}
                                            onChange={(e) => this.setState({game: {...game, max_heroes: e.target.value}})}
                                            label={"Max Heroes"}
                                            type="max_heroes"
                                            error={getInvalidByKey("max_heroes")}
                                        />

                                        <div className="form-group-sl">
                                            <div className="control-label-sl">Hero Unique</div>
                                            <SwitchInline
                                                onChange={(allow) => this.setState({ game : {...game, heroUnique : allow }})}
                                                toggleValue={game.heroUnique}
                                                toggleLabel={["Enabled","Disabled"]}
                                            />
                                        </div>


                                        <Input
                                            value={game.slug}
                                            onChange={(e) => this.setState({game: {...game, slug: e.target.value}})}
                                            label={"Slug"}
                                            type="slug"
                                            error={getInvalidByKey("slug")}
                                        />

                                        <TagsForm
                                            label="Types"
                                            tags={game.types || []}
                                            onEnter={(value) => value.length >0 && this.setState({ game : {...game, types :[...(game.types||[]) ,value.trim()] }})}
                                            onRemove={(value) => this.setState({game : {...game, types : game.types.filter(t => t!== value )}})}
                                        />

                                        <TagsForm
                                            label="Factions"
                                            tags={game.factions || []}
                                            onEnter={(value) => value.length >0 && this.setState({ game : {...game, factions :[...(game.factions||[]) ,value.trim()] }})}
                                            onRemove={(value) => this.setState({game : {...game, factions : game.factions.filter(t => t!== value )}})}
                                        />

                                        <TagsForm
                                            label="Tags"
                                            tags={game.tags || []}
                                            onEnter={(value) => value.length >0 && this.setState({ game : {...game, tags :[...(game.tags||[]) ,value.trim()] }})}
                                            onRemove={(value) => this.setState({game : {...game, tags : game.tags.filter(t => t!== value )}})}
                                        />
                                        <div className="form-group">
                                            <UploadImage
                                                height={200}
                                                classNames={['upload-game']}
                                                filePath={game.image}
                                                error={getInvalidByKey("image")}
                                                onChange={(image) => this.setState({game: {...game, image}})}
                                                multiple={false}
                                            />
                                        </div>

                                        <Editor
                                            minHeight={400}
                                            value={game.description}
                                            onChange={(e) => this.setState({game: {...game, description: e.target.value}})}
                                            error={getInvalidByKey("description")}
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type='submit' className='btn-green'>Submit</button>
                                </div>
                            </Fragment>

                        )
                    }}
                />
            </div>
        )
    }
}