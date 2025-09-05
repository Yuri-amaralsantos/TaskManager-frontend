import { useState } from "react";
import { createBoard } from "../api/boardApi";

interface BoardFormProps {
  onBoardCreated: () => void;
}

export const BoardForm = ({ onBoardCreated }: BoardFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await createBoard(name);
    setName("");
    onBoardCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Board</button>
    </form>
  );
};
