import React from 'react';
import {Input} from "../input/input";

export class TagsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    render() {
        let {tags = [], onEnter, onRemove, readOnly} = this.props;

        return (
            <div className='enter-tags'>
                {readOnly && <h3>Tags</h3>}
                {tags.length > 0 && tags.map((t, i) => (<span key={i} className='tag'>{t}
                    <i className="fa sort-icon remove-icon fa-trash" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(t);
                    }}/>
                </span>))}

                {!readOnly &&
                    <Input
                        label="Tags"
                        value={this.state.value}
                        onChange={(e) => this.setState({value: e.target.value})}
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                e.preventDefault();
                                onEnter(e.target.value);
                                this.setState({value: ''})
                            }
                        }}
                    />
                }

            </div>
        )
    }
}