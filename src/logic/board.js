import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck, move) => {
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

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null);
}