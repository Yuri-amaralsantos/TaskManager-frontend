import { create } from "zustand";
import { type Board, type Card } from "../api/boardApi";

interface UIState {
  selectedBoardId: number | null;
  setSelectedBoardId: (id: number | null) => void;

  isBoardFormOpen: boolean;
  openBoardForm: (board?: Board | null) => void;
  closeBoardForm: () => void;
  boardToEdit: Board | null;

  isCardFormOpen: boolean;
  openCardForm: (card?: Card | null) => void;
  closeCardForm: () => void;
  cardToEdit: Card | null;

  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedBoardId: null,
  setSelectedBoardId: (id) => set({ selectedBoardId: id }),

  isBoardFormOpen: false,
  boardToEdit: null,
  openBoardForm: (board = null) =>
    set({ isBoardFormOpen: true, boardToEdit: board }),
  closeBoardForm: () => set({ isBoardFormOpen: false, boardToEdit: null }),

  isCardFormOpen: false,
  cardToEdit: null,
  openCardForm: (card = null) =>
    set({ isCardFormOpen: true, cardToEdit: card }),
  closeCardForm: () => set({ isCardFormOpen: false, cardToEdit: null }),

  openMenuId: null,
  setOpenMenuId: (id) => set({ openMenuId: id }),
}));
