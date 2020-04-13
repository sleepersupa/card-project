import React from 'react';
import classnames from 'classnames';

export class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {flex = "column" , data = null, render } = this.props ;
        let typesFlex={
            column : 'flex-column',
            row : 'flex-row'
        }
        return(
            <div className={classnames('list-view' , typesFlex[flex])}>
                {data && data.map((item, index)=>(
                    render(item , index)
                ))}
            </div>
        )
    }
}