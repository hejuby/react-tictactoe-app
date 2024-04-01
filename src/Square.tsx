import "./Square.css";

interface ISquareProps {
  value: ISquare,
  onClick: () => void
}

const Square = ({ value, onClick }: ISquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;