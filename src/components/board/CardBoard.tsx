import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { type Board, type Card, type List } from "../../api/boardApi";
import { CardFormModal } from "./modals/CardFormModal";
import { ListFormModal } from "./modals/ListFormModal";
import { useLists } from "../../hooks/useLists";
import { useCards } from "../../hooks/useCards";
import { useState } from "react";
import { ListColumn } from "./ListColumn";

interface CardBoardProps {
  board?: Board | null;
}

export const CardBoard = ({ board }: CardBoardProps) => {
  const { listsQuery } = useLists(board?.id ?? null);

  const [isListFormOpen, setIsListFormOpen] = useState(false);
  const [listToEdit, setListToEdit] = useState<List | null>(null);
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);
  const [listIdForCard, setListIdForCard] = useState<number | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);

  const { moveCardMutation } = useCards(board?.id ?? null, null);

  if (!board)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-black mt-10">
          ← Projeto não encontrado. Selecione um no menu lateral.
        </p>
      </div>
    );

  if (listsQuery.isLoading)
    return <p className="text-center mt-10">Carregando listas...</p>;
  if (listsQuery.isError)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-black mt-10">Erro ao carregar listas.</p>
      </div>
    );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    moveCardMutation.mutate({
      cardId: parseInt(result.draggableId, 10),
      fromListId: parseInt(source.droppableId, 10),
      toListId: parseInt(destination.droppableId, 10),
      position: destination.index,
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-300">
      <div className="bg-slate-500 p-5 flex justify-between items-center z-50 sticky top-0">
        <h3 className="text-lg text-white font-bold">
          Listas do projeto - {board.name}
        </h3>
        <button
          className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded"
          onClick={() => {
            setListToEdit(null);
            setIsListFormOpen(true);
          }}
        >
          Adicionar lista
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-auto px-4 py-6">
          <div className="flex gap-6 min-w-max">
            {listsQuery.data?.map((list) => (
              <Droppable key={list.id} droppableId={list.id.toString()}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 h-full"
                  >
                    <ListColumn
                      boardId={board.id}
                      list={list}
                      onEditList={(l) => {
                        setListToEdit(l);
                        setIsListFormOpen(true);
                      }}
                      onAddCard={(listId) => {
                        setCardToEdit(null);
                        setListIdForCard(listId);
                        setIsCardFormOpen(true);
                      }}
                      onEditCard={(listId, card) => {
                        setCardToEdit(card);
                        setListIdForCard(listId);
                        setIsCardFormOpen(true);
                      }}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      <CardFormModal
        isOpen={isCardFormOpen}
        onClose={() => setIsCardFormOpen(false)}
        listId={listIdForCard}
        card={cardToEdit}
        boardId={board.id}
      />

      <ListFormModal
        isOpen={isListFormOpen}
        onClose={() => setIsListFormOpen(false)}
        boardId={board.id}
        list={listToEdit}
      />
    </div>
  );
};
