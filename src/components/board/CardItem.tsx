import { type Card } from "../../api/boardApi";

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

export const CardItem = ({ card, onClick }: CardItemProps) => {
  return (
    <div
      className="bg-slate-100 p-2 rounded cursor-pointer hover:bg-slate-200"
      onClick={onClick}
    >
      <p className="font-semibold">{card.title}</p>
    </div>
  );
};
