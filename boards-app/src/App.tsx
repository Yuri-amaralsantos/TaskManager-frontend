import { useEffect, useState } from "react";
import { getBoards, type Board } from "./api/boardApi";
import { BoardForm } from "./components/BoardForm";
import { BoardList } from "./components/BoardList";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = async () => {
    const data = await getBoards();
    setBoards(data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div>
      <h1>Boards App</h1>
      <BoardForm onBoardCreated={fetchBoards} />
      <BoardList boards={boards} />
    </div>
  );
}

export default App;
