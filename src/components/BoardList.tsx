import { type Board } from "../api/boardApi";
import { FaEdit, FaTrash } from "react-icons/fa";

interface BoardListProps {
  boards: Board[];
  onBoardClick: (boardId: number) => void;
  onAddBoard: () => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: number) => void;
}

export const BoardList = ({
  boards,
  onBoardClick,
  onAddBoard,
  onEditBoard,
  onDeleteBoard,
}: BoardListProps) => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Projetos</h2>
        <button
          className="bg-slate-300 hover:bg-slate-500 font-bold text-black px-3 py-1  cursor-pointer"
          onClick={onAddBoard}
        >
          Adicionar projeto
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {boards.map((board) => (
          <button
            onClick={() => onBoardClick(board.id)}
            key={board.id}
            className="relative bg-slate-600 text-white px-3 py-4  flex flex-col justify-between"
          >
            <p className="text-left font-bold">{board.name}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                className="text-white  px-2 py-1 rounded text-sm"
                onClick={() => onEditBoard(board)}
              >
                <FaEdit />
              </button>
              <button
                className="text-white  px-2 py-1 rounded text-sm"
                onClick={() => onDeleteBoard(board.id)}
              >
                <FaTrash />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
