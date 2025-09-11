import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useLists } from "../../../hooks/useLists";
import axios from "axios";

interface ListFormModalProps {
  isOpen: boolean;
  boardId: number | null;
  list: { id: number; name: string } | null;
  onClose: () => void;
}

export const ListFormModal = ({
  isOpen,
  boardId,
  list,
  onClose,
}: ListFormModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { createListMutation, updateListMutation } = useLists(boardId);

  useEffect(() => {
    setName(list ? list.name : "");
  }, [list]);

  if (!isOpen || !boardId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      if (list) {
        await updateListMutation.mutateAsync({ id: list.id, name });
      } else {
        await createListMutation.mutateAsync(name);
      }
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(err.response.data?.message || "Nome já existe");
        return;
      }
      setError("Erro ao salvar lista");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-black">
          {list ? "Editar lista" : "Criar nova lista"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome da lista"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded text-black px-2 py-1"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-slate-500 text-white rounded px-3 py-1 mt-2"
          >
            {list ? "Salvar alterações" : "Adicionar lista"}
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
