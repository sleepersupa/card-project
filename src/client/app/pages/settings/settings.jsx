import React, {Fragment} from 'react';
import {GameFormModal} from "./game-form-modal";
import {modals} from "../../component/modal/modals";
import {cardApi} from "../../../api/card/card-api";
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {gameApi} from "../../../api/game/game-api";

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list : null
        };
    }


    openAddGameModal(){
        const modal =  modals.openModal({
            content : <GameFormModal
                game={null}
                onClose={()=> {
                    modal.close()
                    this.table.refresh();
                }}
            />
        })
    }

    openEditGameModal(game){
        const modal =  modals.openModal({
            content : <GameFormModal
                editType
                game={game}
                onClose={()=> {
                    modal.close()
                    this.table.refresh();
                }}
            />
        })
    }

    render() {
        const {list} = this.state;
        let columns =[
            {
                label: 'Image',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        <img style={{height : 50}} className='game-image' src={item.image} alt=""/>
                    </div>
                ,
                classNames: 'left'
            },
            {
                label: 'Name',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        {item.name}
                    </div>
                ,
                classNames: 'right'
            },
            {
                label: 'Slug',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        {item.slug}
                    </div>
                ,
                classNames: 'mid'
            },
            {
                label: 'Min Heroes',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        {item.min_heroes}
                    </div>
                ,
                classNames: 'right'
            },
            {
                label: 'Max Heroes',
                renderCell: (item) =>
                    <div
                        className='cell'
                    >
                        {item.max_heroes}
                    </div>
                ,
                classNames: 'right'
            },
            {
                label: 'Action',
                renderCell: (item) =>
                    <div
                        className='cell action'
                    >
                        <i
                            onClick={()=> this.openEditGameModal(item)}
                            className="far fa-edit"></i>
                    </div>
                ,
                classNames: 'right'
            },
        ];

        return (
            <div className='settings'>
                <h1 className='main-label'>Manage Games</h1>

                <button
                    onClick={()=> this.openAddGameModal()}
                    className='btn-green'>Add Game
                </button>

                <PaginationTable
                    ref={elem => this.table = elem}
                    columns={columns}
                    list={list}
                    api={()=>{
                        return gameApi.getAll().then(({games}) => {
                            this.setState({list : games});
                            return Promise.resolve();
                        })
                    }}
                />
            </div>
        )
    }
}
