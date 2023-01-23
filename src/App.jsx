import { useState } from 'react';
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o',
}


const Square = ({ children, isSelected, updateBoard, index }) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  
  const handleClick = () => {
    updateBoard(index);
  }

  return(
    <div
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4 ,5],
  [6, 7 ,8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // If null = draw;
  const [winner, setWinner] = useState(null);

  const [move, setMove] = useState(1);

  const checkWinner = (boardToCheck) => {
    // First, we check if the game has reached the move number 5. Before that, isn't a reason to check if there's a winner.
    if (move >=5 ) {
      // Iterate of winner combos
      for (const combo of WINNER_COMBOS) {
        // We create a const with the respect combo and check if the value in the positions are equals to each others 2
        const [a, b, c] = combo;
        if (boardToCheck[a] && 
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
          ) {
            return boardToCheck[a];
        }
      }
      return null
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setMove(1);
  }

  const checkEndGame = (boardToCheck) => {
    return !boardToCheck.includes(null);
  }

  const updateBoard = (index) => {

    // If there's something different to null in the index position, return and does nothing.
    if(board[index] || winner) return

    // Change the index board value to X or O
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    setMove(move + 1);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } // TODO: check if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }
  
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Start again</button>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}  
        </Square>      
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}  
        </Square>      
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false 
                    ? 'Draw'
                    : `Won`
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Start again</button>
              </footer>

            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
