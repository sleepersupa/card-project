import React from 'react';
export class TagPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {tags=[], onClick} = this.props;
        if(!tags || tags.length === 0) return <div>No categories!</div>
        return(
            <div className='tag-preview flex-row'>
                {tags.map((tag,index)=>(
                    <div
                        className='tag'
                        onClick={()=> onClick && onClick(tag)}
                        key={index}>{tag}</div>
                ))}
            </div>
        )
    }
}