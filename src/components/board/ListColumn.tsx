import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { type List, type Card } from "../../api/boardApi";
import { useLists } from "../../hooks/useLists";
import { useCards } from "../../hooks/useCards";
import { CardItem } from "./CardItem";
import { CardDetailsModal } from "./modals/CardDetailsModal";
import { FaEdit, FaTrash } from "react-icons/fa";

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
        <div className="flex gap-2 justify-between items-center">
          <button
            className="text-black bg-slate-200 px-2 rounded  text-sm"
            onClick={() => onAddCard(list.id)}
          >
            nova tarefa
          </button>
          <button
            onClick={() => onEditList(list)}
            className="text-black text-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteListMutation.mutate(list.id)}
            className="text-black text-sm"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {list.cards.map((card, index) => (
          <Draggable
            key={card.id}
            draggableId={card.id.toString()}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <CardItem card={card} onClick={() => handleOpenDetails(card)} />
              </div>
            )}
          </Draggable>
        ))}
      </div>

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
