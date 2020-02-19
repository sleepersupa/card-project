import React from 'react';
export class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let {children} = this.props;
        return(
            <div className='admin-layout'>
                <h1>Admin</h1>
                {React.cloneElement(children, {

                })}
            </div>
        )
    }
}