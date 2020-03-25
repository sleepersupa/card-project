import React from "react";
import classnames from "classnames";
import {BestList} from "./best-list/best-list";
import {voteApi} from "../../../api/vote/vote-api";

export class PageFormLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards : null
        };
        voteApi.voteManifest(props.game).then(({cards}) => this.setState({cards}))

    }

    render() {
        const {cards}  = this.state;
        const {children, className, history, game}  = this.props;
        return(
            <div className={classnames('page-form-layout', className )}>
                <div className="row no-margin">
                    <div className="left-side col col-md-3 col-sm-12 no-padding">
                        <BestList
                            label="Best PvP Heroes"
                            list={cards}
                            onClick={(card) => history.push(`/g/${game}/hero/${card.slug}`)}
                        />
                    </div>
                    <div className="mid-side col col-md-6 col-sm-12">
                        { children && children({cards})}
                    </div>
                    <div className="right-side col col-md-3 col-sm-12 no-padding">
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