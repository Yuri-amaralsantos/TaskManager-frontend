import { type Board } from "../api/boardApi";

interface BoardListProps {
  boards: Board[];
  onBoardClick: (boardId: number) => void;
  onAddBoard: () => void;
}

export const BoardList = ({
  boards,
  onBoardClick,
  onAddBoard,
}: BoardListProps) => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Projetos</h2>
        <button
          className="bg-yellow-300 hover:bg-yellow-500 font-bold text-black px-3 py-1 rounded cursor-pointer"
          onClick={onAddBoard}
        >
          Adicionar projeto
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <button
            key={board.id}
            className="bg-lime-600 hover:bg-lime-800 hover:text-white px-10 py-3 rounded-lg  text-left cursor-pointer"
            onClick={() => onBoardClick(board.id)}
          >
            {board.name}
          </button>
        ))}
      </div>
    </div>
  );
};
