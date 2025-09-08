import { FaEdit, FaTrash } from "react-icons/fa";
import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
  boardName: string;
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
}

export const CardList = ({
  cards,
  boardName,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: CardListProps) => {
  return (
    <div>
      <div className="flex justify-between bg-slate-500 p-4 items-center my-4">
        <h3 className="text-lg text-white font-bold">
          Tarefas do projeto {boardName}
        </h3>
        <button
          className="bg-slate-300 hover:bg-slate-300 font-bold text-black px-3 py-1"
          onClick={onAddCard}
        >
          Adicionar tarefa
        </button>
      </div>

      {cards.length === 0 ? (
        <p>Sem tarefas</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative border-2 h-[150px] border-slate-600 p-2 rounded flex flex-col justify-between"
            >
              <div>
                <p className="text-lg">{card.title}</p>
                <hr className="text-slate-600 mb-2" />
                <p>{card.description}</p>
              </div>
              <div className="absolute right-1 top-1 flex gap-2">
                <button
                  className="text-slate-500 hover:text-slate-700 px-2 py-1  text-sm "
                  onClick={() => onEditCard(card)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-slate-500 hover:text-slate-700 px-2 py-1  text-sm"
                  onClick={() => onDeleteCard(card.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
