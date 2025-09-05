import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
  onAddCard: () => void;
}

export const CardList = ({ cards, onAddCard }: CardListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Cards</h3>
        <button className="bg-yellow-300 px-3 py-1 rounded" onClick={onAddCard}>
          + Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        <ul className="space-y-2">
          {cards.map((card) => (
            <li key={card.id} className="border p-2 rounded">
              <strong>{card.title}</strong>: {card.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
