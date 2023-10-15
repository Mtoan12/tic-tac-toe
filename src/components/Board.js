import calculateWinner from '../utils/calculateWinner';
import Square from './Square';

export function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    const winSquares = calculateWinner(squares);
    const winner = winSquares && squares[winSquares[0]];
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    if (squares.findIndex((square) => square === null) < 0 && !winner) {
        status = 'Draw';
    }

    const boardRows = [];
    const rows = 3;
    const cols = 3;
    for (let i = 0; i < rows; i++) {
        const boardCols = [];
        for (let j = 0; j < cols; j++) {
            const index = 3 * i + j;
            const className = `${winSquares && winSquares.includes(index) ? 'win-square' : ''}`;
            boardCols.push(
                <Square
                    key={index}
                    className={className}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                />
            );
        }
        boardRows.push(
            <div key={i} className="board-row">
                {boardCols}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}
