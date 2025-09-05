import { useState } from "react";
import { createCardInBoard } from "../api/boardApi";

interface CardFormProps {
  boardId: number;
  onCardCreated: () => void; // callback to refresh cards
}

export const CardForm = ({ boardId, onCardCreated }: CardFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    await createCardInBoard(boardId, title, description);
    setTitle("");
    setDescription("");
    onCardCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Card description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Card</button>
    </form>
  );
};
