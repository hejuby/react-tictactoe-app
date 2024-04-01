import Square from "./Square";
import "./Board.css";

interface IBoardProps {
  squares: ISquare[],
  onClick: (index: number) => void
}

const Board = ({ squares, onClick }: IBoardProps) => {
  return (
    <section className="game__board">
      {Array.from({ length: 9 }, (_v, i) => i).map(squareIndex => <Square 
        value={squares[squareIndex]}
        onClick={() => { onClick(squareIndex); }}
        key={squareIndex}
      />)}
    </section>
  );
}

export default Board;