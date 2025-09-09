import { type Board } from "../../api/boardApi";
import { CardList } from "./CardList";
import { CardFormModal } from "./CardFormModal";
import { useUIStore } from "../../store/uiStore";
import { useCards } from "../../hooks/useCards";

const colors = ["bg-blue-400", "bg-yellow-400", "bg-red-400", "bg-green-400"];

interface CardBoardProps {
  board?: Board | null;
}

export const CardBoard = ({ board }: CardBoardProps) => {
  const { openCardForm, closeCardForm, isCardFormOpen, cardToEdit } =
    useUIStore();

  const { cardsQuery, deleteCardMutation } = useCards(board?.id ?? 0);

  if (!board) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-black mt-10">
          ← Projeto não encontrado. Selecione um projeto no menu lateral.
        </p>
      </div>
    );
  }

  if (cardsQuery.isLoading) {
    return <p className="text-center mt-10">Carregando tarefas...</p>;
  }

  if (cardsQuery.isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-black mt-10">
          Erro ao carregar tarefas.
        </p>
      </div>
    );
  }

  const cardGroups = [
    {
      title: "A Fazer",
      cards: cardsQuery.data?.filter((c) => c.status === "TODO") ?? [],
    },
    {
      title: "Em Progresso",
      cards: cardsQuery.data?.filter((c) => c.status === "DOING") ?? [],
    },
    {
      title: "Urgente",
      cards: cardsQuery.data?.filter((c) => c.status === "URGENT") ?? [],
    },
    {
      title: "Concluído",
      cards: cardsQuery.data?.filter((c) => c.status === "DONE") ?? [],
    },
  ];

  return (
    <div className="flex flex-col bg-slate-300 h-full">
      <div className="sticky top-0 left-64 right-0 bg-slate-500 p-5 flex justify-between items-center z-50">
        <h3 className="text-lg text-white font-bold">
          Tarefas do projeto - {board.name}
        </h3>

        <div className="flex gap-6">
          <button
            className="bg-slate-300 hover:bg-slate-400 font-bold text-black px-3 py-1 rounded"
            onClick={() => openCardForm(null)}
          >
            Adicionar tarefa
          </button>
        </div>
      </div>

      <div className="flex gap-6 px-4 py-6 overflow-x-auto ">
        {cardGroups.map((group, index) => (
          <div
            key={group.title}
            className={`${
              colors[index % colors.length]
            } w-[20vw] h-full p-4 rounded-lg`}
          >
            <h4 className="font-bold mb-2">{group.title}</h4>
            <CardList
              cards={group.cards}
              onEditCard={(card) => openCardForm(card)}
              onDeleteCard={(id) => deleteCardMutation.mutate(id)}
            />
          </div>
        ))}
      </div>

      <CardFormModal
        isOpen={isCardFormOpen}
        boardId={board.id}
        onClose={closeCardForm}
        card={cardToEdit}
      />
    </div>
  );
};
