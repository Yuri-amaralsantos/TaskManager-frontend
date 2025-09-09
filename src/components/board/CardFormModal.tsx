import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCards } from "../../hooks/useCards";
import { type Card } from "../../api/boardApi";

interface CardFormModalProps {
  isOpen: boolean;
  boardId: number | null;
  onClose: () => void;
  card: Card | null;
}

export const CardFormModal = ({
  isOpen,
  boardId,
  onClose,
  card,
}: CardFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [error, setError] = useState("");

  const { createCardMutation, updateCardMutation } = useCards(boardId);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setStatus(card.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("TODO");
    }
  }, [card]);

  if (!isOpen || !boardId) return null;

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStatus("TODO");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (card) {
        await updateCardMutation.mutateAsync({
          id: card.id,
          title,
          description,
          status,
        });
      } else {
        await createCardMutation.mutateAsync({
          boardId,
          title,
          description,
          status,
        });
      }
      handleClose();
    } catch (err) {
      setError("Erro ao salvar a tarefa");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {card ? "Editar tarefa" : "Adicionar nova tarefa"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded h-[200px] resize-none"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="TODO">A Fazer</option>
            <option value="DOING">Em Progresso</option>
            <option value="DONE">Concluído</option>
            <option value="URGENT">Urgente</option>
          </select>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-slate-500 text-white rounded px-3 py-1 mt-2"
          >
            {card ? "Salvar alterações" : "Adicionar"}
          </button>
        </form>
        <button
          className="absolute top-1 right-1 text-lg text-red-500"
          onClick={handleClose}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};
