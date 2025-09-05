import { useState } from "react";
import { createBoard } from "../api/boardApi";

interface BoardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardCreated: () => void;
}

export const BoardFormModal = ({
  isOpen,
  onClose,
  onBoardCreated,
}: BoardFormModalProps) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await createBoard(name);
    setName("");
    onBoardCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Board</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Add Board
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
