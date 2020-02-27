import React from 'react';
export class LoadingInline extends React.Component {
    render() {
        return(
            <div className="loading-inline loading-wrapper text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

        )
    }
}