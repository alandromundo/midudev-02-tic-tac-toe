import React from 'react'
import { Square } from './Square';

function WinnerModal({ resetGame, winner }) {

  if (winner === null) return null
  
  const winnerEndText = winner === false ? 'Draw' : 'Won';

  return (
    <section className='winner'>
      <div className="text">
        <h2>
          {winnerEndText}
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

export default WinnerModal