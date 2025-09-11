// boardApi.ts
import axios from "axios";

const API_URL = "http://localhost:3000";

export interface Card {
  id: number;
  title: string;
  description: string;
  listId: number;
}

export interface List {
  id: number;
  name: string;
  boardId: number;
  cards: Card[];
}

export interface Board {
  id: number;
  name: string;
  lists: List[];
}

// ---------- BOARDS ----------
export const getBoards = async (): Promise<Board[]> => {
  const res = await axios.get(`${API_URL}/boards`);
  return res.data;
};

export const createBoard = async (name: string): Promise<Board> => {
  const res = await axios.post(`${API_URL}/boards`, { name });
  return res.data;
};

export const updateBoard = async (id: number, name: string): Promise<Board> => {
  const res = await axios.put(`${API_URL}/boards/${id}`, { name });
  return res.data;
};

export const deleteBoard = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/boards/${id}`);
};

// ---------- LISTS ----------
export const getListsByBoard = async (boardId: number): Promise<List[]> => {
  const res = await axios.get(`${API_URL}/boards/${boardId}/lists`);
  return res.data;
};

export const createListInBoard = async (
  boardId: number,
  name: string
): Promise<List> => {
  const res = await axios.post(`${API_URL}/boards/${boardId}/lists`, { name });
  return res.data;
};

export const updateList = async (id: number, name: string): Promise<List> => {
  const res = await axios.put(`${API_URL}/lists/${id}`, { name });
  return res.data;
};

export const deleteList = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/lists/${id}`);
};

// ---------- CARDS ----------
export const createCardInList = async (
  listId: number,
  data: Omit<Card, "id" | "listId">
): Promise<Card> => {
  const res = await axios.post(`${API_URL}/lists/${listId}/cards`, data);
  return res.data;
};

export const updateCard = async (
  id: number,
  data: Partial<Omit<Card, "id">>
): Promise<Card> => {
  const res = await axios.put(`${API_URL}/cards/${id}`, data);
  return res.data;
};

export const deleteCard = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/cards/${id}`);
};
