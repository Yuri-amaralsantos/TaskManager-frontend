import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
  boardName: string;
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
}

export const CardList = ({
  cards,
  boardName,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: CardListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-lg font-bold">Tarefas do projeto: {boardName}</h3>
        <button
          className="bg-yellow-300 font-bold text-black px-3 py-1 rounded"
          onClick={onAddCard}
        >
          Adicionar tarefa
        </button>
      </div>

      {cards.length === 0 ? (
        <p>Sem tarefas</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border-2 border-lime-600 p-2 rounded flex flex-col justify-between"
            >
              <div>
                <strong>{card.title}</strong>
                <hr className="text-lime-600 mb-2" />
                <p>{card.description}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded text-sm text-white"
                  onClick={() => onEditCard(card)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded text-sm text-white"
                  onClick={() => onDeleteCard(card.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
