import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { type Card } from "../../../api/boardApi";
import { useCards } from "../../../hooks/useCards";
import axios from "axios";

interface CardFormModalProps {
  isOpen: boolean;
  boardId: number | null;
  listId: number | null;
  onClose: () => void;
  card?: Card | null;
}

export const CardFormModal = ({
  isOpen,
  boardId,
  listId,
  onClose,
  card,
}: CardFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { createCardMutation, updateCardMutation } = useCards(boardId, listId);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [card]);

  if (!isOpen || !listId || !boardId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      if (card) {
        await updateCardMutation.mutateAsync({
          id: card.id,
          title,
          description,
        });
      } else {
        await createCardMutation.mutateAsync({ title, description });
      }
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(err.response.data?.message || "Erro de validação");
        return;
      }
      setError("Erro ao salvar card");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-black">
          {card ? "Editar tarefa" : "Criar nova tarefa"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded text-black px-2 py-1"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded text-black px-2 py-1"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-slate-500 text-white rounded px-3 py-1 mt-2"
          >
            {card ? "Salvar alterações" : "Adicionar tarefa"}
          </button>
        </form>

        <button
          className="absolute top-1 right-1 text-lg text-red-500"
          onClick={onClose}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};
