import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListsByBoard,
  createListInBoard,
  updateList,
  deleteList,
} from "../api/boardApi";

export function useLists(boardId: number | null) {
  const queryClient = useQueryClient();

  const listsQuery = useQuery({
    queryKey: ["lists", boardId],
    queryFn: () => getListsByBoard(boardId!),
    enabled: !!boardId,
  });

  const createListMutation = useMutation({
    mutationFn: (name: string) => createListInBoard(boardId!, name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] }),
  });

  const updateListMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateList(id, name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] }),
  });

  const deleteListMutation = useMutation({
    mutationFn: (id: number) => deleteList(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] }),
  });

  return {
    listsQuery,
    createListMutation,
    updateListMutation,
    deleteListMutation,
  };
}
