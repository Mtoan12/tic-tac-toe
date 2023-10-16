const calculateLocation = (currentSquares, nextSquares) => {
    for (let i = 0; i < currentSquares.length; i++) {
        if (currentSquares[i] !== nextSquares[i]) {
            const row = Math.floor(i / 3) + 1;
            const col = (i % 3) + 1;
            return [row, col, nextSquares[i]];
        }
    }
    return null;
};

export default calculateLocation;
