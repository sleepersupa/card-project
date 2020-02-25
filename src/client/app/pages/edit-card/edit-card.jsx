// import React from 'react';
// import {CardForm} from "../manage-cards/card-form/card-form-modal";
// import {cardApi} from "../../../api/card/card-api";
// export class EditCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             cardDraft : null ,
//             loading : true ,
//
//         };
//
//         cardApi.getCard(props.match.params.id).then(data =>{
//             this.setState({
//                 cardDraft : data.card
//             })
//         })
//     }
//
//     render() {
//         const {cardDraft}  = this.state;
//         return(
//             <div className='edit-card-wrapper'>
//                 <h1 className='main-label'>Edit Card</h1>
//                 {cardDraft && (
//                     <CardForm
//                         card={cardDraft}
//                         editType
//                     />
//                 )}
//
//             </div>
//         )
//     }
// }