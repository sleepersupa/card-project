
import React from 'react';
import {LoadingInline} from "../../common/loading/loading-2";
export class HeroSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // openHeroListModal(){
    //     console.log('lk')
    //     const {onSelect} = this.props;
    //     const modal = modals.openModal({
    //         content : <HeroListModal
    //             hero={null}
    //             onSelect={onSelect}
    //             onClose={()=>{
    //                 modal.close();
    //             }}
    //         />
    //     })
    // }

    render() {
        const {heroes , onSelect ,error , onDelete, display } =this.props;
        if(!heroes || heroes.length <= 0) return <LoadingInline/>
        return(
            <div
                className='hero-select'>
                {heroes.map((hero,index) =>(
                    <div key={index} className='hero-wrap'>
                        {display && display(hero)}
                        {/*<img*/}
                        {/*    onClick={()=> onSelect && onSelect(hero)}*/}
                        {/*    className='hero-image' src={hero.filePath} alt=""/>*/}
                        {/*{onDelete && (*/}
                        {/*    <i*/}
                        {/*        onClick={()=> onDelete(hero) }*/}
                        {/*        className="far fa-trash-alt"></i>*/}
                        {/*)}*/}
                    </div>

                ))}

                {error && (
                    <div className="error-text">
                        {error}
                    </div>
                )}

            </div>
        )
    }
}