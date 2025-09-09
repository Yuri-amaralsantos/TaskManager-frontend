import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBoards,
  deleteBoard,
  createBoard,
  updateBoard,
} from "../api/boardApi";

export function useBoards() {
  const queryClient = useQueryClient();

  const boardsQuery = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (id: number) => deleteBoard(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
  });

  const createBoardMutation = useMutation({
    mutationFn: (name: string) => createBoard(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
  });

  const updateBoardMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateBoard(id, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
  });

  return {
    boardsQuery,
    deleteBoardMutation,
    createBoardMutation,
    updateBoardMutation,
  };
}
