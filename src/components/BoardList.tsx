import { type Board } from "../api/boardApi";

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
          className="bg-yellow-300 hover:bg-yellow-500 font-bold text-black px-3 py-1 rounded cursor-pointer"
          onClick={onAddBoard}
        >
          Adicionar projeto
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-lime-600 text-white p-3 rounded-lg flex flex-col justify-between"
          >
            <button
              className="text-left font-bold"
              onClick={() => onBoardClick(board.id)}
            >
              {board.name}
            </button>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded text-sm"
                onClick={() => onEditBoard(board)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded text-sm"
                onClick={() => onDeleteBoard(board.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
