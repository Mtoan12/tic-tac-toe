import { useState } from 'react';
import { Board } from './Board';
import calculateLocation from '../utils/calculateLocation';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [decreasing, setDecreasing] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const location = calculateLocation(currentSquares, nextSquares);
        setHistory(nextHistory);
        setCoordinates([...coordinates, location]);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        if (decreasing && move !== 0) {
            move = history.length - move;
        }
        let description;
        let location =
            coordinates.length > 0 && move > 0 ? `(${coordinates[move - 1].join(',')})` : '';
        if (move > 0) {
            description = `Go to move #${move} ${location}`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                {move === currentMove ? (
                    <span className="current-move">{`You are at move #${move} ${location}`}</span>
                ) : (
                    <button className="jump-btn" onClick={() => jumpTo(move)}>
                        {description}
                    </button>
                )}
            </li>
        );
    });

    const handleSortClick = () => {
        setDecreasing(!decreasing);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={handleSortClick} className="sort-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                    </svg>
                    <span>Sort</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                    </svg>
                </button>
                <ol className="jump-btn-list">{moves}</ol>
            </div>
        </div>
    );
}
