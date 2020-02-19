import React from 'react';
import {Link} from "react-router-dom";
export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        let navs = [
            {label : "Home" , link : "/"},
            {label : "Hero List" , link : "/hero-list"},
            {label : "Best Formations" , link : "/best"},
            {label : "Submit Team" , link : "/submit-team"},
            {label : "Beginner Tip" , link : "/tip"},
        ]
        return(
            <div className='nav-bar'>
                {navs.map((n,i) => (
                    <Link key={i} className='nav-item' to={n.link} >
                        <div>
                            {n.label}
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}