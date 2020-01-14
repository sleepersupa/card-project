import React from 'react';
import {CardForm} from "./card-form/card-form";
import {cardApi} from "../../../api/card/card-api";

export class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card_name: '',
            type: '',
            filePath :''
        };
    }

    render() {
        const {filePath} = this.state;
        return (
            <div className='add-card'>
                <h1 className='main-label'>Add New Card</h1>
                <CardForm
                    {...this.state}
                    onChangeImage={(value) => this.setState({ filePath: value })}
                    onSubmit={(data) => {
                        cardApi.addCard({...data , filePath: filePath }).then(({error , message , card })=>{
                            alert(message);
                            this.props.history.push(`/card/${card._id}`)
                        })
                    }}
                />
            </div>
        )
    }
}