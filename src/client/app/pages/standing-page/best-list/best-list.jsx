import React from 'react';
export class BestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {label , list} = this.props ;
        if(!list ) return null ;
        return(
            <div className='best-list'>
                <div className='head'>
                    <i className="fas fa-bars"></i>
                    {label}
                </div>

                <div className='list-items'>
                    {list.map((item, index) =>(
                        <div key={index} className='item'>
                            <img className='item-image' src={item.filePath} alt=""/>
                            <div className="item-name">
                                {item.card_name}
                            </div>
                            <div className="rating">
                                <div className='cur-rate text-center'>9.8</div>
                                <div className='per-rate'>out of 10</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}