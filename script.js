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
        for (let i = 0; i < cellArray.length; i++) {
            cellArray[i] = null;
        }
    }

    return { getCellContent, markCell, checkIfEmpty, resetBoard };
})();

const Player = (name, symbol) => {
    let score = 0;
    const getName = () => { return name }
    const getScore = () => { return score }
    const addScore = () => { score += 1 }
    const getSymbol = () => { return symbol }

    return { getName, getScore, addScore, getSymbol};
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
            if(gameController.getGameState()) {
                gameController.play(cellIndex);
            }
        });
    })

    return { updateGameBoard }
})();

const gameController = (() => {
    let player1 = Player('P1', 'O');
    let player2 = Player('P2', 'X');
    let turnOwner = player1;
    let gameState = true;
    let round = 1;
    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [3, 4, 5],
        [1, 4, 7],
        [6, 7, 8],
        [2, 5, 8],
        [2, 4, 6]
    ];

    const handleTie = () => {
        console.log(`It's a tie!`);
        setTimeout(() => {
            resetRound();
        }, 3000);
    }
    const getTurnOwner = () => { return turnOwner }
    const switchTurn = () => {
        if (turnOwner == player1) {
            turnOwner = player2;
        } else turnOwner = player1;
    }

    const getGameState = () => {return gameState}

    const play = (cellIndex) => {
        if (gameBoard.checkIfEmpty(cellIndex)) {
            gameBoard.markCell(getTurnOwner().getSymbol(), cellIndex);
            displayController.updateGameBoard()
            checkBoard();
            switchTurn();
        }
    }

    const checkBoard = () => {
        if(checkForTriplets(getTurnOwner())) {
            setWinner(getTurnOwner());
        } else checkForTie();
    }

    const checkForTriplets = (player) => {
        playerSymbol = player.getSymbol();
        let found = false;
        winConditions.forEach(condition => {
            let matchCount = 0;
            for (let i = 0; i <= 2; i++) {
                if (gameBoard.getCellContent(condition[i]) == playerSymbol) {
                    matchCount++;
                }
            }
            if (matchCount == 3) {
                found = true;
            }
        })
        return found;
    }

    const checkForTie = () => {
        let nulls = 0;
        for(let i = 0; i <= 8; i++) {
            if(gameBoard.getCellContent(i) == null) {
                nulls++;
            }
        }
        if(nulls == 0) {
            handleTie();
        }
    }

    const resetRound = () => {
        console.clear();
        round = 1;
        gameBoard.resetBoard();
        displayController.updateGameBoard()
        turnOwner = player1;
        gameState = true;
    }

    const setWinner = (player) => {
        gameState = false;
        player.addScore();
        console.log(`Round over. The winner is ${player.getName()}. ${player.getName()}'s score: ${player.getScore()}`);
        setTimeout(() => {
            resetRound();
        }, 3000);
    }

    return { play , getGameState, checkForTriplets, getTurnOwner}
})();
