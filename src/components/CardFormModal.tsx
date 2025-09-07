import { useEffect, useState } from "react";
import { createCardInBoard, updateCard, type Card } from "../api/boardApi";
import type { AxiosError } from "axios";

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

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [card]);

  if (!isOpen || !boardId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (card) {
        await updateCard(card.id, title, description);
      } else {
        await createCardInBoard(boardId, title, description);
      }

      setTitle("");
      setDescription("");
      onCardCreated();
      onClose();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Nome já existe");
        return;
      }
      console.error(axiosError);
      alert("Erro ao salvar o projeto");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
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
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            {card ? "Salvar alterações" : "Adicionar"}
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};
