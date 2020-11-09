const Player = (XorO, name) => {

    const takeTurn = (a) => {
        //check if clicked on valid square
        if (a.target.textContent === '') {
            a.target.textContent = XorO;
            //record position in nodelist of clicked square
            for (let i = 0, n = interface.squares.length;
                i < n; i++) {
                    if (a.target === interface.squares[i]) var pos = i;
                }
            //update board according to clicked square
            gameBoard.board[Math.floor(pos/3)][pos % 3] = XorO;

            return true;
        }
        else {
            alert('Square is already filled. Please pick another one.')
            return false;
        };
    }
   //the event listener is in the gameMode module
    return { XorO, 
        takeTurn,
        name,
    }
};

const player1 = Player('x', '');
const player2 = Player('o', '');

const gameBoard = (() => {
    let board = [['','',''],['','',''],['','','']];
    const checkWin = () => {
        //all possible win conditions
        if (board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x' ||
        board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x' ||
        board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x' ||
        board[0][0] === 'o' && board[0][1] === 'o' && board[0][2] === 'o' ||
        board[1][0] === 'o' && board[1][1] === 'o' && board[1][2] === 'o' ||
        board[2][0] === 'o' && board[2][1] === 'o' && board[2][2] === 'o' || 
        board[0][0] === 'x' && board[1][0] === 'x' && board[2][0] === 'x' ||
        board[0][1] === 'x' && board[1][1] === 'x' && board[2][1] === 'x' ||
        board[0][2] === 'x' && board[1][2] === 'x' && board[2][2] === 'x' ||
        board[0][0] === 'o' && board[1][0] === 'o' && board[2][0] === 'o' ||
        board[0][1] === 'o' && board[1][1] === 'o' && board[2][1] === 'o' ||
        board[0][2] === 'o' && board[1][2] === 'o' && board[2][2] === 'o' ||
        board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x' ||
        board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x' ||
        board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x' ||
        board[0][2] === 'o' && board[1][1] === 'o' && board[2][0] === 'o') return true;
        else return false;
    }
    
    return {
        board, 
        checkWin,
    };
})();

const interface = (() => {
    const boardContainer = document.querySelector('.board-container');
    const fillBoard = (board) => {
        for (let i of board) {
            for (let j of i) {
                let boardSquare = document.createElement('button');
                let mark = document.createTextNode(j);
                boardSquare.appendChild(mark);
                boardSquare.classList.add('square');
                boardContainer.appendChild(boardSquare);
            }
        }
    }

    fillBoard(gameBoard.board);
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    const displayName = () => {
        let temp1 = prompt("Enter player 1's name");
        //loop to make sure player 2 enters different name
        do {
            var temp2 = prompt("Enter player 2's name");
            if (temp2 !== null && temp2 === temp1) alert("Please enter a different name");
        }
            while (temp2 !== null && temp2 === temp1);
        temp1 !== null ? player1.name = temp1 : player1.name = "Player 1";
        temp2 !== null ? player2.name = temp2 : player2.name = "Player 2";
        p1.appendChild(document.createTextNode(player1.name));
        p2.appendChild(document.createTextNode(player2.name));
    }
    displayName();
    //to use in other functions - each "square" of the tic-tac-toe board
    const squares = document.querySelectorAll('.square');
   
    const displayTurn = (player) => {
        if (player === player1.name) {
            p1.classList.add('my-turn');
            p2.classList.remove('my-turn');
        }
        else {
            p2.classList.add('my-turn');
            p1.classList.remove('my-turn');
        }
    }

    const winMessage = (turn) => {
        let winner;
        (turn.name === player1.name) ?  winner = player1.name : winner = player2.name;
        alert(`${winner} has won the game! The game will now reset`);
    }
    return {
        squares,
        displayTurn,
        winMessage,
    };
})();

const gameState = (() => {

    let currentPlayer = player1;
    interface.displayTurn(currentPlayer.name);
    //takes turn, switches active player, and checks if winning position is made
    const turnSwitchCheckWin = (e) => {
        let validTurn = currentPlayer.takeTurn(e);
        if(validTurn)
        {   
            if (gameBoard.checkWin()) 
            {
                interface.winMessage(currentPlayer);
                setTimeout(window.location.reload(), 2000);
               
            }
            else {            
            currentPlayer.name === player1.name ? currentPlayer = player2 : 
            currentPlayer = player1;
            interface.displayTurn(currentPlayer.name);
            } 
        }
    }
       
    interface.squares.forEach((square) => {
        square.addEventListener('click', turnSwitchCheckWin);
    });

})();



