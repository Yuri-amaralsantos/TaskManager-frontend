import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCardInList,
  updateCard,
  deleteCard,
  moveCard,
} from "../api/boardApi";
import type { List } from "../api/boardApi";

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

  const moveCardMutation = useMutation({
    mutationFn: (data: {
      cardId: number;
      fromListId: number;
      toListId: number;
      position: number;
    }) =>
      moveCard(data.cardId, {
        toListId: data.toListId,
        position: data.position,
      }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["lists", boardId] });

      const previousLists = queryClient.getQueryData<List[]>([
        "lists",
        boardId,
      ]);

      queryClient.setQueryData<List[]>(["lists", boardId], (old) => {
        if (!old) return old;
        return updateListsOptimistic(
          old,
          variables.cardId,
          variables.fromListId,
          variables.toListId,
          variables.position
        );
      });

      return { previousLists };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousLists) {
        queryClient.setQueryData(["lists", boardId], context.previousLists);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });

  return {
    createCardMutation,
    updateCardMutation,
    deleteCardMutation,
    moveCardMutation,
  };
}

function updateListsOptimistic(
  lists: List[],
  cardId: number,
  fromListId: number,
  toListId: number,
  position: number
): List[] {
  const newLists = lists.map((list) => ({ ...list, cards: [...list.cards] }));

  const fromList = newLists.find((l) => l.id === fromListId);
  const toList = newLists.find((l) => l.id === toListId);
  if (!fromList || !toList) return lists;

  const cardIndex = fromList.cards.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) return lists;

  const [movedCard] = fromList.cards.splice(cardIndex, 1);

  toList.cards.splice(position, 0, movedCard);

  return newLists;
}
