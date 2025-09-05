import { useEffect, useState } from "react";
import { getBoards, type Board } from "./api/boardApi";

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
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="p-2">
        <h1 className="text-green-600 mb-2 text-center">Boards App</h1>
        <BoardList boards={boards} />
      </div>
    </div>
  );
}

export default App;
