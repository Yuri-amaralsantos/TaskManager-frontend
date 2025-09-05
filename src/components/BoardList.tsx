import { useState } from "react";
import { type Board, type Card, getCardsByBoard } from "../api/boardApi";
import { CardList } from "./CardList";
import { BoardFormModal } from "./BoardFormModal";
import { CardFormModal } from "./CardFormModal";

interface BoardListProps {
  boards: Board[];
}

export const BoardList = ({ boards }: BoardListProps) => {
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);

  const loadCards = async (boardId: number) => {
    const cardsData = await getCardsByBoard(boardId);
    setCards(cardsData);
  };

  const handleBoardClick = async (boardId: number) => {
    if (selectedBoardId === boardId) {
      setSelectedBoardId(null);
      setCards([]);
      return;
    }
    setSelectedBoardId(boardId);
    await loadCards(boardId);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Boards</h2>
        <button
          className="bg-green-400 text-white px-3 py-1 rounded"
          onClick={() => setIsBoardFormOpen(true)}
        >
          + Add Board
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="relative">
            <button
              className="bg-blue-200 px-10 py-2 rounded-lg w-full text-left"
              onClick={() => handleBoardClick(board.id)}
            >
              {board.name}
            </button>
          </div>
        ))}
      </div>

      {selectedBoardId && (
        <div className="mt-4">
          <CardList cards={cards} onAddCard={() => setIsCardFormOpen(true)} />
        </div>
      )}

      <BoardFormModal
        isOpen={isBoardFormOpen}
        onClose={() => setIsBoardFormOpen(false)}
        onBoardCreated={() => {}}
      />

      <CardFormModal
        isOpen={isCardFormOpen}
        boardId={selectedBoardId}
        onClose={() => setIsCardFormOpen(false)}
        onCardCreated={() => {
          if (selectedBoardId) loadCards(selectedBoardId);
        }}
      />
    </div>
  );
};
