import { useState } from "react";
import { type Board, type Card, getCardsByBoard } from "../api/boardApi";
import { CardList } from "./CardList";

interface BoardListProps {
  boards: Board[];
}

export const BoardList = ({ boards }: BoardListProps) => {
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]); // <-- explicitly type here

  const handleBoardClick = async (boardId: number) => {
    if (selectedBoardId === boardId) {
      setSelectedBoardId(null);
      setCards([]);
      return;
    }
    const cardsData = await getCardsByBoard(boardId);
    setCards(cardsData);
    setSelectedBoardId(boardId);
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
      {selectedBoardId && <CardList cards={cards} />}
    </div>
  );
};
