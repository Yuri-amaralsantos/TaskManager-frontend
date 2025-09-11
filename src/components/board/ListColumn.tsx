import { useState } from "react";
import { type List, type Card } from "../../api/boardApi";
import { useLists } from "../../hooks/useLists";
import { useCards } from "../../hooks/useCards";
import { CardItem } from "./CardItem";
import { CardDetailsModal } from "./modals/CardDetailsModal";

interface ListColumnProps {
  list: List;
  onEditList: (list: List) => void;
  onAddCard: (listId: number) => void;
  onEditCard: (listId: number, card: Card) => void;
  boardId: number;
}

export const ListColumn = ({
  list,
  onEditList,
  onAddCard,
  onEditCard,
  boardId,
}: ListColumnProps) => {
  const { deleteListMutation } = useLists(list.boardId);
  const { deleteCardMutation } = useCards(boardId, list.id);

  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [cardToShow, setCardToShow] = useState<Card | null>(null);

  const handleOpenDetails = (card: Card) => {
    setCardToShow(card);
    setIsCardDetailsOpen(true);
  };

  return (
    <div className="bg-white w-[20vw] h-full p-4 rounded-lg shadow flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{list.name}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onEditList(list)}
            className="text-blue-500 text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => deleteListMutation.mutate(list.id)}
            className="text-red-500 text-sm"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {list.cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onClick={() => handleOpenDetails(card)}
          />
        ))}
      </div>

      <button
        className="bg-slate-200 hover:bg-slate-300 mt-2 px-2 py-1 rounded text-sm"
        onClick={() => onAddCard(list.id)}
      >
        + Adicionar card
      </button>

      <CardDetailsModal
        isOpen={isCardDetailsOpen}
        card={cardToShow}
        onClose={() => setIsCardDetailsOpen(false)}
        onEdit={(card) => {
          onEditCard(list.id, card);
          setIsCardDetailsOpen(false);
        }}
        onDelete={(id) => deleteCardMutation.mutate(id)}
      />
    </div>
  );
};
