import { useEffect, useState } from "react";
import { createCardInBoard, updateCard, type Card } from "../api/boardApi";
import type { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";

interface CardFormModalProps {
  isOpen: boolean;
  boardId: number | null;
  onClose: () => void;
  onCardCreated: () => void;
  card: Card | null;
}

export const CardFormModal = ({
  isOpen,
  boardId,
  onClose,
  onCardCreated,
  card,
}: CardFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("a fazer");
  const [error, setError] = useState("");

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setStatus(card.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("a fazer");
    }
  }, [card]);

  if (!isOpen || !boardId) return null;

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setError("");
    setStatus("a fazer");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (card) {
        await updateCard(card.id, title, description, status);
      } else {
        await createCardInBoard(boardId, title, description, status);
      }

      setTitle("");
      setDescription("");
      setStatus("a fazer");
      onCardCreated();
      onClose();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setError("Nome já existe");
        return;
      }
      console.error(axiosError);
      setError("Erro ao salvar o projeto");
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
            className="border px-2 py-1 rounded h-[200px] text-start resize-none"
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

          <p className="text-red-500">{error}</p>

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
