import React from 'react'
import { Square } from './Square'
import { checkWinner, checkEndGame } from './../logic/board.js';
import { TURNS } from '../constants';

function Board({ board, turn, move, winner, setBoard, setTurn, setMove, setWinner }) {

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
  
    const newWinner = checkWinner(newBoard, move);
  
    if (newWinner) {
      setWinner(newWinner);
    } // TODO: check if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }
  
  return (
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
  )
}

export default Board