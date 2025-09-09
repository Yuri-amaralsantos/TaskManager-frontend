import { useEffect, useState } from "react";
import { createBoard, updateBoard, type Board } from "../../api/boardApi";
import { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardCreated: () => void;
  board: Board | null;
}

export const ProjectFormModal = ({
  isOpen,
  onClose,
  onBoardCreated,
  board,
}: ProjectFormModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (board) {
      setName(board.name);
    } else {
      setName("");
    }
  }, [board]);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      if (board) {
        await updateBoard(board.id, name);
      } else {
        await createBoard(name);
      }

      setName("");
      onBoardCreated();
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
          {board ? "Editar projeto" : "Criar novo projeto"}
        </h2>
        <form onSubmit={handleSubmit} className="flex rounded flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1 "
          />

          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-slate-500 rounded text-white px-3 py-1 mt-2"
          >
            {board ? "Salvar alterações" : "Adicionar projeto"}
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
