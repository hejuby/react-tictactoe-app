import { useState } from "react";
import { WINNING_CASES } from "./constant";
import Board from "./Board";
import "./App.css";

const App = () => {
  const [history, setHistory] = useState<ISquare[][]>([Array.from({ length: 9 }, () => null)]);
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const calculateWinner = (squares: ISquare[]): ISquare => 
    WINNING_CASES.reduce((acc: ISquare, cur) => {
      const [a, b, c] = cur;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      return acc;
    }, null);

  const current = history[history.length - 1];  
  const winner = calculateWinner(current);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`; 

  const handleClick = (index: number) => {
    if (winner || current[index]) return;

    const newSquares = current.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setHistory([...history, newSquares]);
    setIsXNext(prev => !prev);
  }; 

  const jumpTo = (step: number) => {
    if (!history[step]) return;

    setHistory(history.slice(0, step + 1));
    setIsXNext((step % 2) === 0);
  }

  return (
    <main className="game">
      <h1>Tic Tac Toe</h1>
      <Board 
        squares={current}
        onClick={(index) => { handleClick(index); }}
      />
      <section className="game__info">
        <h2 className="status">
          {status}
        </h2>
        <ol className="move-list">
          {Array.from({ length: history.length }, (_v, i) => i).map(step => 
            <li className="move-list__item" key={step}>
              <button className="move-list__button" onClick={() => { jumpTo(step); }}>
                {step
                  ? `Go to move #${step}`
                  : "Go to game start"}
              </button>
            </li> 
          )}
        </ol>
      </section>
    </main>
  );
}

export default App;
