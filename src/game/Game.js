import React from 'react';
import Board from '../board/Board';
import calculateWinner from '../calculateWinner';
import _get from 'lodash/get';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xisNext: true
        }
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const currentState = history[history.length - 1]
        const squares = currentState.squares.slice()
        if(calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xisNext ? 'X' : 'O'
        this.setState({
            history: history.concat([
                {
                    squares
                }
            ]),
            stepNumber: history.length,
            xisNext: !this.state.xisNext
        })
    }

    jumpTo = (step) => {
        this.setState({ 
            stepNumber: step,
            xisNext: (step % 2) == 0
        })
    }

    handleReset = () => {
        this.setState({ history: [
            {
                squares: Array(9).fill(null)
            }
        ]})
    }

    render() {
        const history= _get(this.state,'history', [])
        const currentState = history[this.state.stepNumber] || {};
        const winner = calculateWinner(_get(currentState,'squares', []));

        const moves = history.map((step, move) => {
            console.log(move, 'move')
            const desc = move ? 
            'Go to move =' + move : 'Go to game start';
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        if(winner) {
            status = 'Winner is ' + winner
        } else {
            status = this.state.xisNext ? 'Xs turn' : 'Os turn'
        }

        return (
            <div>
                <Board 
                    squares={_get(currentState,'squares', [])}
                    onClick={i => this.handleClick(i)}
                />
                <button onClick={this.handleReset}>Reset</button>
                <div>{status}</div>
                <div>{moves}</div>
            </div>
        )
    }
}

export default Game;