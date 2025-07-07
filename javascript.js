const fields = document.querySelectorAll(".field-item");
const resetBtn = document.querySelector(".reset");
const winnerLabel = document.querySelector(".winner");
const currentPlayerLabel = document.querySelector(".currentplayer");

fields.forEach((item) => item.addEventListener("click", (e) => {
    if (GameManager.getWin() === true) return;
    if (item.textContent !== "") return;

    item.textContent = GameManager.getCurrentPlayerSign();
    GameManager.makeMove(item.id);
}))

resetBtn.addEventListener("click", () => {
    Gameboard.reset();
})

const Gameboard = (() => {
    const field = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const [a, b, c] of winningCombinations) {
            if (
                field[a] !== " " &&
                field[a] === field[b] &&
                field[b] === field[c]
            ) {
                GameManager.setWin(true);
                winnerLabel.textContent = GameManager.getCurrentPlayerName()+ " wins";
                currentPlayerLabel.textContent = "Press to restart"
                GameManager.setCurrentPlayer();
                return true;
            }
        }
        return null
    };

    const print = () => {
        console.log(`  ${field[0]}  |  ${field[1]}  |  ${field[2]} 
            \n  ${field[3]}  |  ${field[4]}  |  ${field[5]} 
            \n  ${field[6]}  |  ${field[7]}  |  ${field[8]}`)
    }

    const reset = () => {
        GameManager.setWin(false);
        for (let i = 0; i < 9; i++) {
            field[i] = " ";
        }
        fields.forEach(field => {
            field.textContent = "";
        })
        winnerLabel.textContent = "Start Game";
        currentPlayerLabel.textContent = " ";
        GameManager.setCurrentPlayer();
    };

    return { field, checkWinner, reset, print };
})();

function createPlayer(name, sign) {
    return {
        name: name,
        sign: sign,
        wins: 0
    };
}

const GameManager = (() => {

    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    let currentplayer = player1;

    let win = false;

    const getWin = () => {
        return win;
    }
    const setWin = (con) => {
        win = con;
    }


    const makeMove = (position) => {

        if (Gameboard.field[position - 1] !== "X" && Gameboard.field[position - 1] !== "O") {
            Gameboard.field[position - 1] = currentplayer.sign;
        }
        Gameboard.checkWinner();
        if(Gameboard.checkWinner()){
            return;
        }
        GameManager.switchPlayer();

    }

    const switchPlayer = () => {
        currentplayer = currentplayer.sign === "X" ? player2 : player1;
        currentPlayerLabel.textContent = getCurrentPlayerName()
    }

    const getCurrentPlayerSign = () => {
        return currentplayer.sign;
    }
    const setCurrentPlayer = () => {
        currentplayer = player1;
    }

    const getCurrentPlayerName = () => {
        return currentplayer.name;
    }

    return {
        makeMove,
        getCurrentPlayerSign,
        setWin,
        getWin,
        switchPlayer,
        getCurrentPlayerName,
        setCurrentPlayer
    }

})();




