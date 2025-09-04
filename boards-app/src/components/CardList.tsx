import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
}

export const CardList = ({ cards }: CardListProps) => {
  if (!cards.length) return <p>No cards yet.</p>;

  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <strong>{card.title}</strong>: {card.description}
        </li>
      ))}
    </ul>
  );
};
