import { type Card } from "../../api/boardApi";

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

export const CardItem = ({ card, onClick }: CardItemProps) => {
  return (
    <div
      className="bg-white px-2 h-24 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-200"
      onClick={onClick}
    >
      <p className="text-lg">{card.title}</p>
    </div>
  );
};
