import React from 'react';
import { CardFormModal} from "./card-form/card-form-modal";
import {cardApi} from "../../../api/card/card-api";
import {modals} from "../../component/modal/modals";
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {gameApi} from "../../../api/game/game-api";

export class ManageCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:  null
        };
        gameApi.getAll().then(({games})=>{
            this.setState({games})
        })
    }


    addNewCard(){
        const {games} = this.state;
        const modal = modals.openModal({
            content : <CardFormModal
                {...{card : null, games}}
                onClose={()=>{
                    modal.close();
                    this.table.refresh();
                }}
            />
        })
    }

    editCard(card) {
        const {games} = this.state;

        const modal = modals.openModal({
            content : <CardFormModal
                {...{card, games}}
                editType
                onClose={()=>{
                    modal.close();
                    this.table.refresh();
                }}
            />
        })
    }

    render() {
        const {list , games} = this.state;
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
                label: 'Type',
                renderCell: (item) =>
                    <div
                        className='cell card-type'
                    >
                        {item.type}
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Game',
                renderCell: (item) =>
                {
                    let game = item.game && games.find(g => g._id === item.game);
                    if (!game) return <div>non-select</div>
                    return(
                        <div
                            className='cell card-name'
                        >
                            <div className='flex-row'>
                                <img style={{height : 22 , borderRadius : 3}} src={game.image} alt=""/>
                                <span style={{paddingLeft : 10}}>{game.name}</span>
                            </div>

                        </div>
                    )
                }
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
                {games && (
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
                )}

            </div>
        )
    }
}