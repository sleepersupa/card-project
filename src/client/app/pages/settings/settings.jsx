import React, {Fragment} from 'react';
import {isNumber, minLength, required} from "../../common/form/validations";
import {Form} from "../../common/form/form";
import {Input} from "../../common/input/input";
import {AreaInput} from "../../common/area-input/area-input";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
import {UploadImage} from "../../component/upload-image/upload-image";

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let clones = [
            {
                name: "Game 1",
                max_heroes: 4,
                key : "game1",
                image :"",
                description: " String "
            },
            {
                name : "Game 2",
                max_heroes : 5,
                key : "game2",
                image :"",
                description: " String "
            },
            {
                name : "Game 1",
                max_heroes : 3,
                key : "game3",
                image :"",
                description: " String "
            }
        ]
        return (
            <div className='settings'>
                {clones.map((g, i) => (
                    <SettingsForm
                        game={g}
                        key={i}
                        index={i}
                    />
                ))}
            </div>
        )
    }
}


class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game ? props.game : {}
        };
    }

    onSubmit() {

    }

    render() {
        let {game } = this.state;
        let { index } = this.props;

        let validations = [
            {"name": [required("Name"), minLength(3, "Name")]},
            {"max_heroes": [required("Max Heroes"), isNumber()]},
            {"image": [required("Image")]},
        ]

        return (
            <Form
                onSubmit={() => this.onSubmit()}
                formValue={game}
                validations={validations}
                render={(getInvalidByKey) => {
                    return (
                        <div className='game-form'>
                            <div className='game-label'>Game {index +1 }</div>
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

                            <TextAreaForm
                                value={game.description}
                                onChange={(e) => this.setState({game: {...game, description: e.target.value}})}
                                label={"Description"}
                                type="description"
                            />

                            <button type='submit' className='btn-green'>Submit</button>
                        </div>
                    )
                }}
            />
        )
    }
}