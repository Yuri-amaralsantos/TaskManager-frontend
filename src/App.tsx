import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "./components/sidebar/Sidebar";
import { CardBoard } from "./components/board/CardBoard";
import { useBoards } from "./hooks/useBoards";
import { useUIStore } from "./store/uiStore";

const queryClient = new QueryClient();

function Dashboard() {
  const { boardsQuery } = useBoards();
  const { selectedBoardId, setSelectedBoardId } = useUIStore();

  const selectedBoard = boardsQuery.data?.find((b) => b.id === selectedBoardId);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-600 flex">
      <SideBar
        boards={boardsQuery.data || []}
        onBoardClick={setSelectedBoardId}
      />

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <CardBoard board={selectedBoard} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
