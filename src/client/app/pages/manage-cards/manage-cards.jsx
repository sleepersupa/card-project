import React from 'react';
import { CardFormModal} from "./card-form/card-form-modal";
import {cardApi} from "../../../api/card/card-api";
import {modals} from "../../component/modal/modals";
import {PaginationTable} from "../../component/pagination-table/pagination-table";

export class ManageCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:  null
        };

    }


    addNewCard(){

        const modal = modals.openModal({
            content : <CardFormModal
                card={null}
                onClose={()=>{
                    modal.close();
                    this.table.refresh();
                }}
            />
        })
    }

    editCard(card) {
        const modal = modals.openModal({
            content : <CardFormModal
                card={card}
                editType
                onClose={()=>{
                    modal.close();
                    this.table.refresh();
                }}
            />
        })
    }

    render() {
        const {list} = this.state;
        let columns= [
            {
                label: 'Image',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        <img className='card-image' src={item.filePath} alt=""/>
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Card Name',
                renderCell: (item) =>
                    <div
                        className='cell card-name'
                    >
                        {item.card_name}
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Action',
                renderCell: (item) =>
                    <div
                        className='cell action'
                    >
                        <i
                            onClick={()=> this.editCard(item)}
                            className="far fa-edit"></i>
                    </div>
                ,
                classNames: 'right'
            },
        ]

        return (
            <div className='manage-cards'>
                <h1 className='main-label'>Manage Cards</h1>
                <button
                    onClick={()=> this.addNewCard()}
                    className='btn-green'
                >
                    Add new Card
                </button>

                <PaginationTable
                    ref={elem => this.table = elem}
                    columns={columns}
                    list={list}
                    api={()=>{
                        return cardApi.getAll().then(({cards}) => {
                            this.setState({list : cards});
                            return Promise.resolve();
                        })
                    }}
                />
            </div>
        )
    }
}