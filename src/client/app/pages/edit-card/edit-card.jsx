import React from 'react';
import {CardForm} from "../add-card/card-form/card-form";
import {cardApi} from "../../../api/card/card-api";
export class EditCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDraft : null ,
            loading : true ,

        };

        cardApi.getCard(props.match.params.id).then(data =>{
            this.setState({
                cardDraft : data.card
            })
        })
    }

    render() {
        const {cardDraft}  = this.state;
        return(
            <div className='edit-card-wrapper'>
                <h1 className='main-label'>Edit Card</h1>
                {
                    cardDraft && (
                        <CardForm
                            {...this.state.cardDraft}
                            onChangeImage={(value) => this.setState({ cardDraft: {...cardDraft , filePath : value } })}
                            onSubmit={(data) => {
                                cardApi.modifyCard({...data, filePath: cardDraft.filePath , _id : cardDraft._id  }).then(({error , message })=>{
                                    alert(message);
                                })
                            }}
                        />
                    )
                }

            </div>
        )
    }
}