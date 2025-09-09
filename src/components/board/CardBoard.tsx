import { FaEdit, FaTrash } from "react-icons/fa";
import { type Board, type Card } from "../../api/boardApi";
import { CardList } from "./CardList";

interface CardBoardProps {
  board: Board;
  cardGroups: { title: string; cards: Card[] }[];
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: number) => void;
}

const colors = ["bg-gray-300", "bg-yellow-300", "bg-red-300", "bg-green-300"];

export const CardBoard = ({
  board,
  cardGroups,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onEditBoard,
  onDeleteBoard,
}: CardBoardProps) => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 left-64 right-0 bg-slate-500 p-5 flex justify-between items-center z-50">
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

      <div className="flex gap-6 px-4 py-6  overflow-x-auto">
        {cardGroups.map((group, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={group.title}
              className={`${color} w-[20vw] h-full p-4 rounded-lg `}
            >
              <h4 className="font-bold mb-2">{group.title}</h4>
              <CardList
                cards={group.cards}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
