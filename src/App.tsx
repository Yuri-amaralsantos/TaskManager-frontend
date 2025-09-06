import { useEffect, useState } from "react";
import {
  getBoards,
  type Board,
  type Card,
  getCardsByBoard,
} from "./api/boardApi";

import { BoardList } from "./components/BoardList";
import { CardList } from "./components/CardList";
import { BoardFormModal } from "./components/BoardFormModal";
import { CardFormModal } from "./components/CardFormModal";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);

  const fetchBoards = async () => {
    const data = await getBoards();
    setBoards(data);
  };

  const loadCards = async (boardId: number) => {
    const cardsData = await getCardsByBoard(boardId);
    setCards(cardsData);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardClick = async (boardId: number) => {
    setSelectedBoardId(boardId);
    await loadCards(boardId);
  };

  const handleBackToBoards = () => {
    setSelectedBoardId(null);
    setCards([]);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-600 flex pt-10 justify-center">
      <div className="p-4 w-full h-full max-w-3xl bg-white rounded-lg">
        <h1 className="text-lime-800 mb-4 font-bold text-center text-2xl">
          Agenciador de tarefas
        </h1>

        {!selectedBoardId && (
          <BoardList
            boards={boards}
            onBoardClick={handleBoardClick}
            onAddBoard={() => setIsBoardFormOpen(true)}
          />
        )}

        {selectedBoardId && (
          <div>
            <div className="flex justify-between mb-2">
              <button
                className="bg-yellow-300 text-black font-bold px-3 py-1 rounded-lg cursor-pointer"
                onClick={handleBackToBoards}
              >
                ← Voltar para projetos
              </button>
            </div>

            <CardList
              cards={cards}
              onAddCard={() => setIsCardFormOpen(true)}
              boardName={
                boards.find((b) => b.id === selectedBoardId)?.name || ""
              }
            />
          </div>
        )}

        <BoardFormModal
          isOpen={isBoardFormOpen}
          onClose={() => setIsBoardFormOpen(false)}
          onBoardCreated={() => fetchBoards()}
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
    </div>
  );
}

export default App;
