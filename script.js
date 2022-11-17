const gameBoard = (() => {
    let cellArray = [null, null, null, null, null, null, null, null, null];
    const getCellContent = (cellIndex) => { return cellArray[cellIndex] }
    const markCell = (symbol, cellIndex) => { cellArray[cellIndex] = symbol }
    const checkIfEmpty = (cellIndex) => {
        if (cellArray[cellIndex] == null) {
            return true;
        } else return false;
    }
    const resetBoard = () => {
        for(let i = 0; i < cellArray.length; i++) {
            cellArray[i] = null;
        }
        displayController.updateGameBoard();
    }

    return {getCellContent, markCell, checkIfEmpty, resetBoard };
})();

const Player = (symbol) => {
    let score = 0;
    const getScore = () => { return score }
    const setScore = (points) => { score += points }
    const getSymbol = () => { return symbol }

    return { getScore, setScore, getSymbol };
}

const displayController = (() => {
    let cells = document.querySelectorAll('.cell');
    const updateGameBoard = () => {
        cells.forEach((cell, cellIndex) => {
            cell.textContent = gameBoard.getCellContent(cellIndex);
        })
    }

    cells.forEach((cell, cellIndex) => {
        cell.addEventListener('click', () => {
            gameController.play(cellIndex);
        });
    })

    return {updateGameBoard}
})();

const gameController = (() => {
    let player1 = Player('O');
    let player2 = Player('X');
    let turnOwner = player1;
    const getTurnOwner = () => { return turnOwner }
    const switchTurn = () => {
        if (turnOwner == player1) {
            turnOwner = player2;
        } else turnOwner = player1;
    }

    const play = (cellIndex) => {
        if (gameBoard.checkIfEmpty(cellIndex)) {
            gameBoard.markCell(getTurnOwner().getSymbol(), cellIndex);
            displayController.updateGameBoard()
            switchTurn();
        }
    }

    return {play}
})();
