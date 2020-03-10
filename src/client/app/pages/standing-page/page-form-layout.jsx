import React from "react";
import {cardApi} from "../../../api/card/card-api";
import classnames from "classnames";
import {BestList} from "./best-list/best-list";

export class PageFormLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards : null
        };
        cardApi.getAll().then(({cards}) => this.setState({cards}))

    }

    render() {
        const {cards}  = this.state;
        const {children, className}  = this.props;
        return(
            <div className={classnames('page-form-layout', className )}>
                <div className="left-side row">
                    <div className="col-md-3 col-sm-12">
                        <BestList
                            label="Best PvP Heroes"
                            list={cards}
                        />
                    </div>
                    <div className="mid-side col-md-6 col-sm-12">
                        { children && children({cards})}
                    </div>
                    <div className="right-side col-md-3 col-sm-12">
                        <BestList
                            label="Best PvP Heroes"
                            list={cards}
                        />
                    </div>
                </div>

            </div>
        )
    }
}