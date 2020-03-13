import React, {Fragment} from 'react';
import {isNumber, isSlug, minLength, required} from "../../common/form/validations";
import {Input} from "../../common/input/input";
import {UploadImage} from "../../component/upload-image/upload-image";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
import {Form} from "../../common/form/form";
import {Editor} from "../../common/editor/editor";
import {gameApi} from "../../../api/game/game-api";
export class GameFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game ? props.game : {}
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
                                            value={game.max_heroes}
                                            onChange={(e) => this.setState({game: {...game, max_heroes: e.target.value}})}
                                            label={"Max Heroes"}
                                            type="max_heroes"
                                            error={getInvalidByKey("max_heroes")}
                                        />

                                        <Input
                                            value={game.slug}
                                            onChange={(e) => this.setState({game: {...game, slug: e.target.value}})}
                                            label={"Slug"}
                                            type="slug"
                                            error={getInvalidByKey("slug")}
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