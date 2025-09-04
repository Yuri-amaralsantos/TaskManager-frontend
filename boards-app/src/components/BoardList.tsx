import { useState } from "react";
import { type Board, type Card, getCardsByBoard } from "../api/boardApi";
import { CardList } from "./CardList";
import { CardForm } from "./CardForm";

interface BoardListProps {
  boards: Board[];
}

export const BoardList = ({ boards }: BoardListProps) => {
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

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
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <button onClick={() => handleBoardClick(board.id)}>
              {board.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedBoardId && (
        <div>
          <CardForm
            boardId={selectedBoardId}
            onCardCreated={() => loadCards(selectedBoardId)}
          />
          <CardList cards={cards} />
        </div>
      )}
    </div>
  );
};
