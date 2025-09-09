import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useBoards } from "../../hooks/useBoards";
import { type Board } from "../../api/boardApi";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
}

export const ProjectFormModal = ({
  isOpen,
  onClose,
  board,
}: ProjectFormModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { createBoardMutation, updateBoardMutation } = useBoards();

  useEffect(() => {
    setName(board ? board.name : "");
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
        await updateBoardMutation.mutateAsync({ id: board.id, name });
      } else {
        await createBoardMutation.mutateAsync(name);
      }
      handleClose();
    } catch (err) {
      setError("Erro ao salvar o projeto");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg text-black font-bold mb-4">
          {board ? "Editar projeto" : "Criar novo projeto"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded text-black px-2 py-1"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-slate-500 text-white rounded px-3 py-1 mt-2"
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
