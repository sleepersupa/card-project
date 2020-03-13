import React from 'react';
import classnames from "classnames";
export class SlSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDropDown : false
        };
    }


    componentWillMount(){
        document.addEventListener('mousedown',this.handleClick,false) ;
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClick,false) ;
    }

    handleClick=(e)=>{
        if(this.node.contains(e.target)){
            return ;
        }
        this.setState({
            displayDropDown: false
        })
    }

    render() {
        const {displayDropDown} = this.state;
        const {label , className , display ,value, list, maxHeight = 300, error , onChange } = this.props;
        console.log(value);
        return(
            <div
                onClick={()=>this.setState({displayDropDown : !this.state.displayDropDown})}
                ref={node => this.node = node} className={classnames("form-group-sl select-sl", className)}>
                {label && (
                    <div className="control-label-sl">
                        {label}
                    </div>
                )}

                <div
                    className={classnames("form-control-sl", error && "is-invalid")}
                >
                    {display && display(value)}
                    {value && (
                        <i
                            className="fas fa-times"
                            onClick={(e)=> {
                                e.preventDefault() ;
                                e.stopPropagation();
                                onChange && onChange(null) ;
                                this.setState({ displayDropDown: false})
                            }}
                        >
                        </i>
                    )}

                    <i className="fas fa-sort-down"></i>
                </div>



                <div className="error-text">
                    {error}
                </div>

                {displayDropDown && (
                    <div style={{maxHeight : maxHeight}} className="dropdown-content">
                        {list && list.map((item, index) =>{
                            return(
                                <div
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onChange && onChange(item);
                                        this.setState({ displayDropDown: false})
                                    }}
                                    key={index} className='item'>
                                    {display(item)}
                                </div>
                            )
                        })}
                    </div>
                )}

            </div>
        )
    }
}