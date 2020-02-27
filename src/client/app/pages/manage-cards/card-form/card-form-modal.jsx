import React from 'react';
import {Input} from "../../../common/input/input";
import {UploadImage} from "../../../component/upload-image/upload-image";
import {Form} from "../../../common/form/form";
import {minLength, required} from "../../../common/form/validations";
import {cardApi} from "../../../../api/card/card-api";

export class CardFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: !props.card ? {} : props.card
        };
    }


    onSubmit() {
        const {editType, onClose } = this.props;

        if (editType) {
            cardApi.modifyCard(this.state.card).then(()=> onClose && onClose());
        } else {
            cardApi.addCard(this.state.card).then(()=> onClose && onClose());
        }
    }

    render() {

        const {editType, onSubmit} = this.props;
        const {card} = this.state;

        let validations = [
            {"card_name": [required("Card Name"), minLength(3, "Card Name")]},
            {"type": [required("Type"), minLength(3, "Type")]},
            {"filePath": [required("Image")]},
        ]

        return (
            <div className='card-form-modal'>

                <div className="modal-header">
                    {editType ? "Edit Card" : "Add New Card"}
                </div>
                <div className="modal-body">
                    <Form
                        onSubmit={() => this.onSubmit()}
                        formValue={card}
                        validations={validations}
                        render={(getInvalidByKey, invalidPaths) => (
                            <div>
                                <Input
                                    value={card.card_name}
                                    onChange={(e) => this.setState({card: {...card, card_name: e.target.value}})}
                                    label="Card Name"
                                    type="card_name"
                                    error={getInvalidByKey("card_name")}
                                />
                                <Input
                                    value={card.type}
                                    label='Type'
                                    onChange={(e) => this.setState({card: {...card, type: e.target.value}})}
                                    type="type"
                                    error={getInvalidByKey("type")}
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


                                <button className='btn-green' type="submit">Submit</button>
                            </div>
                        )}
                    />
                </div>

            </div>
        )
    }
}