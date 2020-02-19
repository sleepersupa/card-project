import React from 'react';
export class GamesSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {

        let games = [
            {name : "Game 1" , image : "/assets/img/game1.png" , main_path : "/game-1" },
            {name : "Game 1" , image : "/assets/img/game2.png" , main_path : "/game-2" },
            {name : "Game 1" , image : "/assets/img/game3.png" , main_path : "/game-3" },
        ]
        return(
            <div className='games-select flex-row'>
                {games.map((g,i) => (
                    <div
                        onClick={()=> {
                            console.log('lol')
                            this.props.history.push(g.main_path)
                        }}
                        key={i} className='game wrapper'>
                        <img className='game-image' src={g.image} alt=""/>
                        <h3>{g.name}</h3>
                    </div>
                ))}
            </div>
        )
    }
}