import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCardInList, updateCard, deleteCard } from "../api/boardApi";

export function useCards(boardId: number | null, listId: number | null) {
  const queryClient = useQueryClient();

  const createCardMutation = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      createCardInList(listId!, {
        title: data.title,
        description: data.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: (data: { id: number; title: string; description: string }) =>
      updateCard(data.id, {
        title: data.title,
        description: data.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });

  return {
    createCardMutation,
    updateCardMutation,
    deleteCardMutation,
  };
}
