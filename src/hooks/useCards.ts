import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCardsByBoard,
  deleteCard,
  createCardInBoard,
  updateCard,
} from "../api/boardApi";

export function useCards(boardId: number | null) {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["cards", boardId],
    queryFn: () => getCardsByBoard(boardId!),
    enabled: !!boardId,
  });

  const deleteCardMutation = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] }),
  });

  const createCardMutation = useMutation({
    mutationFn: (data: {
      boardId: number;
      title: string;
      description: string;
      status: string;
    }) =>
      createCardInBoard(
        data.boardId,
        data.title,
        data.description,
        data.status
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] }),
  });

  const updateCardMutation = useMutation({
    mutationFn: (data: {
      id: number;
      title: string;
      description: string;
      status: string;
    }) => updateCard(data.id, data.title, data.description, data.status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] }),
  });

  return {
    cardsQuery,
    deleteCardMutation,
    createCardMutation,
    updateCardMutation,
  };
}
