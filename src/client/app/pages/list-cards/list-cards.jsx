import React from 'react';
import {PaginationTable} from "../../component/pagination-table/pagination-table";
import {cardApi} from "../../../api/card/card-api";

export class ListCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null
        };
        cardApi.getAll().then(data =>{
            this.setState({ cards : data.cards})
        })
    }

    columns = [
        {
            label: 'ID',
            renderCell: (item) =>
                <div
                    className='cell id'
                >
                    {item._id}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Card Image',
            renderCell: (item) =>
                <div
                    className='cell card-image'
                >
                    <img src={item.filePath} width={40} alt=""/>
                </div>
            ,
            classNames: 'mid'
        },
        {
            label : "Card Name",
            renderCell : (item) =>
                <div
                    className='cell card-name'
                >
                    {item.card_name}
                </div>
        },
        {
            label : "Type",
            renderCell : (item) =>
                <div
                    className='cell type'
                >
                    {item.type}
                </div>
        },
        {
            label : "Action",
            renderCell : (item) =>
                <div
                    className='cell action'
                >
                    <i
                        onClick={()=> this.props.history.push(`/card/${item._id}`)}
                        className="far fa-edit"></i>
                </div>,
            classNames: 'mid'
        }
    ]

    render() {
        const {cards} = this.state;
        return (
            <div className='list-cards'>
                <h1 className="main-label">List Card</h1>


                {cards && (
                    <PaginationTable
                        columns={this.columns}
                        list={this.state.cards || []}
                    />
                )}


            </div>
        )
    }
}