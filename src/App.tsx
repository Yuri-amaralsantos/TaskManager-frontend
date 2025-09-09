import { useEffect, useState } from "react";
import {
  getBoards,
  getCardsByBoard,
  deleteBoard,
  deleteCard,
  type Board,
  type Card,
} from "./api/boardApi";

import { SideBar } from "./components/Sidebar";
import { BoardHeader } from "./components/BoardHeader";
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

  const handleDeleteBoard = async (id: number) => {
    await deleteBoard(id);
    fetchBoards();
  };

  const handleDeleteCard = async (id: number) => {
    await deleteCard(id);
    if (selectedBoardId) loadCards(selectedBoardId);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-600 flex">
      <SideBar
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

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {!selectedBoardId && (
          <p className="text-center text-bold text-white">
            Selecione um projeto no menu lateral.
          </p>
        )}

        {selectedBoardId && (
          <BoardHeader
            board={boards.find((b) => b.id === selectedBoardId)!}
            cardGroups={[
              {
                title: "A Fazer",
                cards: cards.filter((c) => c.status === "TODO"),
              },
              {
                title: "Em Progresso",
                cards: cards.filter((c) => c.status === "DOING"),
              },
              {
                title: "Urgente",
                cards: cards.filter((c) => c.status === "URGENT"),
              },
              {
                title: "Concluído",
                cards: cards.filter((c) => c.status === "DONE"),
              },
            ]}
            onAddCard={() => {
              setCardToEdit(null);
              setIsCardFormOpen(true);
            }}
            onEditCard={(card) => {
              setCardToEdit(card);
              setIsCardFormOpen(true);
            }}
            onDeleteCard={handleDeleteCard}
            onEditBoard={(board) => {
              setBoardToEdit(board);
              setIsBoardFormOpen(true);
            }}
            onDeleteBoard={handleDeleteBoard}
          />
        )}
      </div>

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
  );
}

export default App;
