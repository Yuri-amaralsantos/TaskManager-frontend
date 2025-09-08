import { FaEdit, FaTrash } from "react-icons/fa";
import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
  onEditCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
}

export const CardList = ({
  cards,
  onEditCard,
  onDeleteCard,
}: CardListProps) => {
  if (cards.length === 0) {
    return <p>Sem tarefas</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative border-2 bg-white border-slate-600 p-2 rounded flex flex-col justify-between"
        >
          <div>
            <p className="text-lg">{card.title}</p>
            <hr className="text-slate-600 mb-2" />
            <p>{card.description}</p>
          </div>
          <div className="absolute right-1 top-1 flex gap-2">
            <button
              className="text-slate-500 hover:text-slate-700 px-2 py-1 text-sm"
              onClick={() => onEditCard(card)}
            >
              <FaEdit />
            </button>
            <button
              className="text-slate-500 hover:text-slate-700 px-2 py-1 text-sm"
              onClick={() => onDeleteCard(card.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
