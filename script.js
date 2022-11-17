const gameBoard = (() => {
    const cellArray = [null, null, 'o', null, null, 'x', null, null, null];
    const getCellContent = (cellIndex) => {return cellArray[cellIndex]}
    const markCell = (symbol, cellIndex) => {cellArray[cellIndex] = symbol}
    const checkIfEmpty = (cellIndex) => {
        if(cellArray[cellIndex] == null) {
            return true;
        } else return false;
    }
    const resetBoard = () => {
        cellArray.forEach(cell => {
            cell = null;
        })
    }

    return {getCellContent, markCell, checkIfEmpty, resetBoard};
})();

const Player = (symbol) => {
    let score = 0;
    const getScore = () => {return score}
    const setScore = (points) => {score += points}
    const getSymbol = () => {return symbol}

    return {getScore, setScore, getSymbol};
}

const displayController = (() => {
    let cells = document.querySelectorAll('.cell');
    const updateGameBoard = () => {
        cells.forEach((cell, cellIndex) => {
            cell.textContent = gameBoard.getCellContent(cellIndex);
        })
    }

    return {updateGameBoard}
})();
