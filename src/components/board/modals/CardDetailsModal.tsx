import { IoClose, IoPencil, IoTrash } from "react-icons/io5";
import { type Card } from "../../../api/boardApi";

interface CardDetailsModalProps {
  isOpen: boolean;
  card: Card | null;
  onClose: () => void;
  onEdit?: (card: Card) => void;
  onDelete?: (id: number) => void;
}

export const CardDetailsModal = ({
  isOpen,
  card,
  onClose,
  onEdit,
  onDelete,
}: CardDetailsModalProps) => {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white p-6 rounded-lg w-[80vw] h-[80vh]">
        <h2 className="text-xl font-bold mb-2 pb-2 border-b border-slate-500">
          Titulo: {card.title}
        </h2>
        <p className="text-gray-700 mb-4">Descrição: {card.description}</p>

        <div className="absolute bottom-2 right-2 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(card)}
              className="flex-1 bg-slate-500 text-white rounded px-3 py-1 flex items-center justify-center gap-1"
            >
              <IoPencil /> Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete(card.id);
                onClose();
              }}
              className="flex-1 bg-slate-500 text-white rounded px-3 py-1 flex items-center justify-center gap-1"
            >
              <IoTrash /> Deletar
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-2xl text-red-500"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};
