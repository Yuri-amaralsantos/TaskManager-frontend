import { useEffect, useState } from "react";
import {
  getBoards,
  getCardsByBoard,
  deleteBoard,
  deleteCard,
  type Board,
  type Card,
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
  const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);

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

  const handleDeleteBoard = async (id: number) => {
    await deleteBoard(id);
    fetchBoards();
  };

  const handleDeleteCard = async (id: number) => {
    await deleteCard(id);
    if (selectedBoardId) loadCards(selectedBoardId);
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
            onAddBoard={() => {
              setBoardToEdit(null);
              setIsBoardFormOpen(true);
            }}
            onEditBoard={(board) => {
              setBoardToEdit(board);
              setIsBoardFormOpen(true);
            }}
            onDeleteBoard={handleDeleteBoard}
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
              boardName={
                boards.find((b) => b.id === selectedBoardId)?.name || ""
              }
              onAddCard={() => {
                setCardToEdit(null);
                setIsCardFormOpen(true);
              }}
              onEditCard={(card) => {
                setCardToEdit(card);
                setIsCardFormOpen(true);
              }}
              onDeleteCard={handleDeleteCard}
            />
          </div>
        )}

        <BoardFormModal
          isOpen={isBoardFormOpen}
          onClose={() => setIsBoardFormOpen(false)}
          onBoardCreated={() => fetchBoards()}
          board={boardToEdit}
        />

        <CardFormModal
          isOpen={isCardFormOpen}
          boardId={selectedBoardId}
          onClose={() => setIsCardFormOpen(false)}
          onCardCreated={() => {
            if (selectedBoardId) loadCards(selectedBoardId);
          }}
          card={cardToEdit}
        />
      </div>
    </div>
  );
}

export default App;
