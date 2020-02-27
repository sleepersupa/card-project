import React, {Fragment} from 'react';
import {cardApi} from "../../../api/card/card-api";
import {Loading} from "../../common/loading/loading";
export class HeroListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes : null
        };
        cardApi.getAll().then(({cards}) =>{
            this.setState({heroes : cards})
        })
    }

    render() {
        const {heroes} = this.state;
        const {onClose , onSelect} = this.props ;
        return(
            <div className='hero-list-modal modal-wrapper'>
                <div className="modal-header">
                    Hero List
                </div>

                <div className="modal-body">
                    {!heroes ? <div>Loading...</div> :(
                        <div className='heroes-list'>
                            {heroes.map((hero) => (
                                <img
                                    onClick={() =>{
                                        onSelect(hero)
                                        onClose();
                                    }}
                                    className='image-hero' src={hero.filePath} alt=""/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}