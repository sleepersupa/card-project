import React from 'react';
import {Input} from "../../../common/input/input";
import {UploadImage} from "../../../component/upload-image/upload-image";
import {Form} from "../../../common/form/form";
import {minLength, required} from "../../../common/form/validations";
import { modals} from "../../../component/modal/modals";
import {cardApi} from "../../../../api/card/card-api";
export class CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card : props.card
        };
    }

    openModal(){
        const modal = modals.openModal({
            content: (
                <NewModal
                    onClose={()=>{
                        modal.close();
                    }}
                />
            ),
        })
    }

    onSubmit(){
        const {editType} = this.props;

        if(editType){
            cardApi.modifyCard(this.state.card).then();
        }else{
            cardApi.addCard(this.state.card).then();
        }
    }

    render() {

        const {editType , onSubmit} = this.props;
        const {card} = this.state;
        let validations = [
            {"card_name" : [required("Card Name"), minLength(3, "Card Name")]},
            {"type" : [required("Type"), minLength(3, "Type")]},
            {"filePath" : [required("Image")]},
        ]

        return(
            <div className='card-form'>
                <Form
                    onSubmit={() => this.onSubmit()}
                    formValue={card}
                    validations={validations}
                    render={(getInvalidByKey , invalidPaths) => (
                        <div>
                            <Input
                                value={card.card_name}
                                onChange={(e) => this.setState({card :{...card ,card_name: e.target.value}})}
                                label="Card Name"
                                type="card_name"
                                error={getInvalidByKey("card_name")}
                            />
                            <Input
                                value={card.type}
                                label='Type'
                                onChange={(e) => this.setState({card : {...card ,type: e.target.value}})}
                                type="type"
                                error={getInvalidByKey("type")}
                            />

                            <div className="form-group">
                                <UploadImage
                                    height={200}
                                    classNames={['upload-card']}
                                    filePath={card.filePath}
                                    error={getInvalidByKey("filePath")}
                                    onChange={(filePath)=> this.setState({card: {...card , filePath}})}
                                    multiple={false}
                                />
                            </div>


                            <button className='btn btn-primary' type="submit">Oke</button>
                        </div>
                    )}
                />
            </div>
        )
    }
}

 class NewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div className='new-modal'>
                <div className="col-md-12">
                  Chú ý: Mỗi khách hàng chỉ được mượn một sản phẩm trong một tháng và thời gian sử dụng tối đa là 3 ngày.
                </div>
            </div>
        )
    }
}