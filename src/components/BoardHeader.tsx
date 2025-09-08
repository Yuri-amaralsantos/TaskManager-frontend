import { FaEdit, FaTrash } from "react-icons/fa";
import { type Board, type Card } from "../api/boardApi";
import { CardList } from "./CardList";

interface BoardHeaderProps {
  board: Board;
  cardGroups: { title: string; cards: Card[] }[];
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: number) => void;
}

export const BoardHeader = ({
  board,
  cardGroups,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onEditBoard,
  onDeleteBoard,
}: BoardHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 left-64 right-0 bg-slate-500 p-4 flex justify-between items-center z-50">
        <h3 className="text-lg text-white font-bold">
          Tarefas do projeto - {board.name}
        </h3>

        <div className="flex gap-6">
          <button
            className="bg-slate-300 hover:bg-slate-400 font-bold text-black px-3 py-1 rounded"
            onClick={onAddCard}
          >
            Adicionar tarefa
          </button>
          <button className="text-white" onClick={() => onEditBoard(board)}>
            <FaEdit />
          </button>
          <button
            className="text-white"
            onClick={() => onDeleteBoard(board.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex gap-6 px-4 py-6 overflow-x-auto">
        {cardGroups.map((group) => (
          <div
            key={group.title}
            className="backdrop-blur-lg  bg-white/20 border border-white/10 w-[20vw] p-4 rounded"
          >
            <h4 className="font-bold mb-2">{group.title}</h4>
            <CardList
              cards={group.cards}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
