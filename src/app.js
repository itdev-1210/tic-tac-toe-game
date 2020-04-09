import React from 'react';
import Game from './game/Game';
class App extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Game />
                </div>
            </div>
        )
    }
}

export default App;