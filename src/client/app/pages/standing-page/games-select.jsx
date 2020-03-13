import React from 'react';
export class GamesSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        const {games} = this.props;
        return(
            <div className='games-select flex-row'>
                {games.map((g,i) => (
                    <div
                        onClick={()=> {
                            this.props.history.push(`/g/${g.slug}/submit-list`)
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