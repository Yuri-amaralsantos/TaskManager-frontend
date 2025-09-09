import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "./components/sidebar/Sidebar";
import { CardBoard } from "./components/board/CardBoard";
import { ProjectFormModal } from "./components/sidebar/ProjectFormModal";
import { CardFormModal } from "./components/board/CardFormModal";
import { useBoards } from "./hooks/useBoards";
import { useCards } from "./hooks/useCards";
import { useUIStore } from "./store/uiStore";

const queryClient = new QueryClient();

function Dashboard() {
  const { boardsQuery, deleteBoardMutation } = useBoards();
  const {
    selectedBoardId,
    setSelectedBoardId,
    openBoardForm,
    openCardForm,
    boardToEdit,
    cardToEdit,
    isBoardFormOpen,
    isCardFormOpen,
    closeBoardForm,
    closeCardForm,
  } = useUIStore();

  const { cardsQuery, deleteCardMutation } = useCards(selectedBoardId);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-600 flex">
      <SideBar
        boards={boardsQuery.data || []}
        onBoardClick={setSelectedBoardId}
        onAddBoard={() => openBoardForm(null)}
        onEditBoard={(board) => openBoardForm(board)}
        onDeleteBoard={(id) => deleteBoardMutation.mutate(id)}
      />

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {!selectedBoardId && (
          <p className="text-center text-bold text-white">
            Selecione um projeto no menu lateral.
          </p>
        )}

        {selectedBoardId &&
          cardsQuery.data &&
          (() => {
            const selectedBoard = boardsQuery.data?.find(
              (b) => b.id === selectedBoardId
            );

            if (!selectedBoard) {
              return (
                <p className="text-center text-red-500">
                  Board não encontrado.
                </p>
              );
            }

            return (
              <CardBoard
                board={selectedBoard}
                cardGroups={[
                  {
                    title: "A Fazer",
                    cards: cardsQuery.data.filter((c) => c.status === "TODO"),
                  },
                  {
                    title: "Em Progresso",
                    cards: cardsQuery.data.filter((c) => c.status === "DOING"),
                  },
                  {
                    title: "Urgente",
                    cards: cardsQuery.data.filter((c) => c.status === "URGENT"),
                  },
                  {
                    title: "Concluído",
                    cards: cardsQuery.data.filter((c) => c.status === "DONE"),
                  },
                ]}
                onAddCard={() => openCardForm(null)}
                onEditCard={(card) => openCardForm(card)}
                onDeleteCard={(id) => deleteCardMutation.mutate(id)}
                onEditBoard={(board) => openBoardForm(board)}
                onDeleteBoard={(id) => deleteBoardMutation.mutate(id)}
              />
            );
          })()}
      </div>

      <ProjectFormModal
        isOpen={isBoardFormOpen}
        onClose={closeBoardForm}
        board={boardToEdit}
      />

      <CardFormModal
        isOpen={isCardFormOpen}
        boardId={selectedBoardId}
        onClose={closeCardForm}
        card={cardToEdit}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
