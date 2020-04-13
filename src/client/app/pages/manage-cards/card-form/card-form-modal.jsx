import React, {Fragment} from 'react';
import {Input} from "../../../common/input/input";
import {UploadImage} from "../../../component/upload-image/upload-image";
import {Form} from "../../../common/form/form";
import {minLength, required} from "../../../common/form/validations";
import {cardApi} from "../../../../api/card/card-api";
import {SlSelect} from "../../../common/sl-select/sl-select";

export class CardFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: !props.card ? {faction: null } : props.card ,
            selectedGame : !props.card ? null : props.games.find( g => g._id === props.card.game) ,
        };
    }


    onSubmit() {
        const {editType, onClose , onDelete} = this.props;

        if (editType) {
            cardApi.modifyCard(this.state.card).then(() => onClose && onClose());
        } else {
            cardApi.addCard(this.state.card).then(() => onClose && onClose());
        }
    }

    onDelete(id) {
        const {editType, onClose} = this.props;
        cardApi.deleteCard(id).then(() => { onClose && onClose()})
    }

    render() {

        const {editType, onSubmit , games} = this.props;
        const {card, selectedGame} = this.state;
        console.log(this.state)
        let validations = [
            {"card_name": [required("Card Name"), minLength(3, "Card Name")]},
            {"type": [required("Type")]},
            {"faction": [required("Faction")]},
            {"filePath": [required("Image")]},
            {"game": [required("Game")]},
        ]

        return (
            <div className='card-form-modal'>

                <div className="modal-header">
                    {editType ? "Edit Card" : "Add New Card"}
                </div>
                <Form
                    onSubmit={() => this.onSubmit()}
                    formValue={card}
                    validations={validations}
                    render={(getInvalidByKey, invalidPaths) => (
                        <div>
                            <div className="modal-body">

                                <Input
                                    value={card.card_name}
                                    onChange={(e) => this.setState({card: {...card, card_name: e.target.value}})}
                                    label="Card Name"
                                    type="card_name"
                                    error={getInvalidByKey("card_name")}
                                />

                                <SlSelect
                                    label="Game"
                                    display={(item)=> !item ? "Please select a game": (
                                        <div className='flex-row'>
                                            <img style={{height : 22 , borderRadius : 3}} src={item.image} alt=""/>
                                            <span style={{paddingLeft : 10}}>{item.name}</span>
                                        </div>
                                    )}
                                    value={selectedGame}
                                    onChange={(value) => this.setState({selectedGame :value, card: {...card, game:  value? value._id : null , type :null , faction : null  }})}
                                    list={games}
                                    error={getInvalidByKey("game")}
                                    maxHeight={200}
                                />

                                <SlSelect
                                    label="Type"
                                    display={(item) => !item ? "Please select a type" :(
                                        <div>
                                            {item}
                                        </div>
                                    )}

                                    value={card.type}
                                    onChange={(value) => {
                                        this.setState( {card : {...card, type : value}})
                                    }}
                                    list={games && selectedGame? games.find(g => g._id === selectedGame._id).types : []}
                                    maxHeight={200}
                                />

                                <SlSelect
                                    label="Faction"
                                    display={(item) => !item ? "Please select a faction" :(
                                        <div>
                                            {item}
                                        </div>
                                    )}

                                    value={card.faction}
                                    onChange={(value) => {
                                        this.setState( {card : {...card, faction : value}})
                                    }}
                                    list={games && selectedGame? games.find(g => g._id === selectedGame._id).factions : []}
                                    maxHeight={200}
                                />


                                <div className="form-group">
                                    <UploadImage
                                        height={200}
                                        classNames={['upload-card']}
                                        filePath={card.filePath}
                                        error={getInvalidByKey("filePath")}
                                        onChange={(filePath) => this.setState({card: {...card, filePath}})}
                                        multiple={false}
                                    />
                                </div>


                            </div>

                            <div className="modal-footer">
                                <button className='btn-green' type="submit">Submit</button>
                                {editType && <button className='btn-orange' onClick={()=> {}}>Delete</button>}
                            </div>

                        </div>
                    )}
                />

            </div>
        )
    }
}