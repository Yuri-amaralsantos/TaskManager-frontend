import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { type List, type Card } from "../../api/boardApi";
import { useLists } from "../../hooks/useLists";
import { useCards } from "../../hooks/useCards";
import { CardItem } from "./CardItem";
import { CardDetailsModal } from "./modals/CardDetailsModal";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useUIStore } from "../../store/uiStore";

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
  const openMenuId = useUIStore((s) => s.openMenuId);
  const setOpenMenuId = useUIStore((s) => s.setOpenMenuId);

  const isMenuOpen = openMenuId === list.id;

  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [cardToShow, setCardToShow] = useState<Card | null>(null);

  const handleOpenDetails = (card: Card) => {
    setCardToShow(card);
    setIsCardDetailsOpen(true);
  };

  return (
    <div className="bg-slate-300 w-[20vw] h-full shadow-md p-4 rounded-lg shadow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-slate-700">{list.name}</h4>
        <div className="flex gap-3 justify-between items-center relative">
          <button
            className="text-black text-sm"
            onClick={() => onAddCard(list.id)}
          >
            <FaPlus />
          </button>
          <button onClick={() => setOpenMenuId(isMenuOpen ? null : list.id)}>
            <BsThreeDots className="text-lg" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-3 right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      onEditList(list);
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <FaEdit /> Edit List
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      deleteListMutation.mutate(list.id);
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <FaTrash /> Delete List
                  </button>
                </li>
              </ul>
            </div>
          )}
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
