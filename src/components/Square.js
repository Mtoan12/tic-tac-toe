export default function Square({ value, onSquareClick, className }) {
    return (
        <button className={`square ${className}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}
