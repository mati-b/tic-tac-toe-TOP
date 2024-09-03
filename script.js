/* let btnBNewGame = document.getElementById('new-game-btn').addEventListener('click',function() {
//   let gameBoard = document.createElement('div');
    gameBoard.className = 'gameboard'

    //board.innerHTML =  "<div class=gameboard></div>"
    document.body.appendChild(gameBoard)
    
    this.disabled = true;
//
    Gameboard.render();

});
*/


const displayController = (()=> {
    const renderMessage = (message) => {

        document.querySelector('#message').innerHTML = message;
    }

    return {
        renderMessage
    }
})();

const Gameboard = (() => {
    let gameBoard = ['','','','','','','','',''];
    
    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class='square' id='square-${index}'>${square}</div>`;
            
        })
        document.querySelector('#gameBoard').innerHTML = boardHTML;
        
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick)
        });
        
    }
    const update = (index, value) => {
        gameBoard[index] = value;
        render();
    }
    
    const getGameboard = () => gameBoard;
    return {
        render,
        getGameboard,
        update,
    }
})();

const createPlayer = (name, mark) => {
    return {
        name, 
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player-one-name').value, '⚒'),
            createPlayer(document.querySelector('#player-two-name').value, '🐤')
        ];

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();

        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', handleClick)
        });

    };

    const handleClick = (event) => {
        if(gameOver) {
            return;
        }
        let index = event.target.id.split('-')[1];
        
        if(Gameboard.getGameboard()[index] !== '') {
            return;
        };
        Gameboard.update(index, players[currentPlayerIndex].mark);
        
        if (checkWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} win!`);
        } else if (checkTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage(`It's a tie!`)
        }
        
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

        //console.log(index)
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, '');
        }
        Gameboard.render();
        document.querySelector('#message').innerHTML = '';
        gameOver = false;
        currentPlayerIndex = 0;
    }

    return {
        start,
        handleClick,
        restart
    }
})();

function checkWin(board) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkTie(board) {
    return board.every(cell => cell !=='')
}


const startBtn = document.querySelector('#new-game-btn');
startBtn.addEventListener('click', function() {

    document.querySelector("#gameBoard").style.visibility = "visible";
    document.querySelector("#gameBoard").style.position = "relative";
    //console.log('hola pibe')
    this.disabled = true;

    
    Game.start();
});

const restartBtn = document.querySelector('#restart-game-btn');
restartBtn.addEventListener('click', function() {

    //console.log('hola pibe')
    //this.disabled = true;

    Game.restart();

});