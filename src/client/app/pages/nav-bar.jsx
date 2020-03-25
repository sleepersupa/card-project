import React from 'react';
import {Link} from "react-router-dom";
import NavLink from "react-router-dom/NavLink";
export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game : this.props.match.params.game || null
        };
    }

    componentWillReceiveProps(){
        let rex = /\/g\/w+/g
        if(rex.test(this.props.location.path)){
            var game = this.props.match.params.game;
            this.setState({game});
        }
    }

    render() {
        let rex = /\/g\/w+/g;
        let {game} = this.state;

        let navs = [
            {label : "Home" , link : "/" , condition :()=> !rex.test(this.props.location.path) },
            {label : "Hero List" , link : `/g/${game}/hero-list` , condition :()=> rex.test(this.props.location.path) },
            {label : "Best Formations" , link : `/g/${game}/best` , condition :()=> rex.test(this.props.location.path)},
            {label : "Submit Team" , link : `/g/${game}/submit-team` , condition :()=> rex.test(this.props.location.path)},
            {label : "Submit List" , link : `/g/${game}/submit-list` , condition :()=> rex.test(this.props.location.path)},
            {label : "Beginner Tip" , link : `/g/${game}/tip` , condition :()=> rex.test(this.props.location.path)},
        ];


        return(
            <div className='nav-bar'>
                {navs.filter(n => true ).map((n,i) => (
                    <NavLink key={i} className='nav-item' to={n.link}
                    >
                        <div>
                            {n.label}
                        </div>
                    </NavLink>
                ))}
            </div>
        )
    }
}