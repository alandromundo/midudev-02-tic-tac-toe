import { useState } from 'react';
import { TURNS } from './constants.js'
import './App.css'
import Board from './components/Board.jsx';
import WinnerModal from './components/WinnerModal.jsx';
import Turns from './components/Turns.jsx';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // If false = draw; if true = someone Won
  const [winner, setWinner] = useState(null);

  const [move, setMove] = useState(1);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setMove(1);
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Start again</button>
      <section className="game">
        <Board 
          board={board}
          turn={turn} 
          move={move}
          winner={winner}
          setBoard={setBoard}
          setTurn={setTurn}
          setMove={setMove}
          setWinner={setWinner}
        />
      </section>

      <Turns turn={turn}/>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
