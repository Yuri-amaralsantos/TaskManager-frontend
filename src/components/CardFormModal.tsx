import { useState } from "react";
import { createCardInBoard } from "../api/boardApi";

interface CardFormModalProps {
  isOpen: boolean;
  boardId: number | null;
  onClose: () => void;
  onCardCreated: () => void;
}

export const CardFormModal = ({
  isOpen,
  boardId,
  onClose,
  onCardCreated,
}: CardFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen || !boardId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    await createCardInBoard(boardId, title, description);
    setTitle("");
    setDescription("");
    onCardCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Card</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Card description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Add Card
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
