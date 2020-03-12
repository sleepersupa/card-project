import React from 'react';

import classnames from 'classnames';

export class UpVote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {verticalType , vote = { status : 2} , onChange , loading} = this.props ;
        return(
            <div className={classnames('up-vote', verticalType ? "flex-column" : "flex-row")}>
                <Arrow
                    onClick={()=> !loading && onChange(1)}
                    isUp active={vote.status === 1}/>
                <div className='votes'>{vote.value}</div>
                <Arrow
                    onClick={()=> !loading && onChange(2)}
                    active={vote.status === 2}/>
            </div>
        )
    }
}

const Arrow =({isUp , active = false , onClick})=>{
    let statusMaps= {
        0:{
            // default
            fill : "#acacac"
        },
        1:{
            // up vote
            fill : "#6EE43E"
        },
        2:{
            //down vote
            fill : "#FD2923"
        }
    }
    return(
        <svg
            onClick={()=> onClick()}
            className={classnames("arrow", isUp? "arrow-up": "arrow-down")} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill={statusMaps[active ? isUp ? 1 : 2 : 0].fill} d="M12 8V4l8 8-8 8v-4H4V8z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}


