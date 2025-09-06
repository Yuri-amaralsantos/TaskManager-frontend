import { type Card } from "../api/boardApi";

interface CardListProps {
  cards: Card[];
  onAddCard: () => void;
  boardName: string;
}

export const CardList = ({ cards, onAddCard, boardName }: CardListProps) => {
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
            <button
              key={card.id}
              className="border-2 text-left flex flex-col justify-start hover:bg-gray-200 border-lime-600 p-2 rounded"
            >
              <strong>{card.title}</strong>
              <hr className="text-lime-600 mb-2" />
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
