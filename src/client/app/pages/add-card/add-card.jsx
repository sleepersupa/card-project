import React from 'react';
import {CardForm} from "./card-form/card-form";
import {cardApi} from "../../../api/card/card-api";

export class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='add-card'>
                <h1 className='main-label'>Add New Card</h1>
                <CardForm
                    card={this.state}
                />
            </div>
        )
    }
}