import { IoSettings } from "react-icons/io5";
import { type Board } from "../../api/boardApi";

interface SideBarProps {
  boards: Board[];
  onBoardClick: (boardId: number) => void;
  onAddBoard: () => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: number) => void;
}

export const SideBar = ({ boards, onBoardClick, onAddBoard }: SideBarProps) => {
  return (
    <div className="w-64 h-full bg-slate-700 text-white flex flex-col">
      <div className="flex items-center justify-between p-5 bg-slate-200">
        <div className="flex gap-2 items-center">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="Profile"
            className="w-8 h-8 rounded-full shadow"
          />
          <h2 className="font-bold text-black">Guest</h2>
        </div>

        <button>
          <IoSettings className="text-black" />
        </button>
      </div>
      <div className="flex justify-between items-center p-4 border-b border-slate-500">
        <h2 className="font-bold text-lg">Projetos</h2>
        <button
          className="bg-slate-300 hover:bg-slate-500 font-bold text-black px-2 py-1 text-xs rounded"
          onClick={onAddBoard}
        >
          Adicionar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {boards.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">Nenhum projeto</p>
        ) : (
          boards.map((board) => (
            <button
              key={board.id}
              className="w-full  text-left px-4 py-2 hover:bg-slate-600 cursor-pointer"
              onClick={() => onBoardClick(board.id)}
            >
              {board.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
