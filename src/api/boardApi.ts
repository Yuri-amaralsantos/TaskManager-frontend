import axios from "axios";

const API_URL = "http://localhost:3000";

export interface Card {
  id: number;
  title: string;
  description: string;
  boardId: number;
}

export interface Board {
  id: number;
  name: string;
  cards: Card[];
}

export const getBoards = async (): Promise<Board[]> => {
  const res = await axios.get(`${API_URL}/boards`);
  return res.data;
};

export const getBoardById = async (id: number): Promise<Board> => {
  const res = await axios.get(`${API_URL}/boards/${id}`);
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

export const deleteBoard = async (
  id: number
): Promise<{ deleted: boolean }> => {
  const res = await axios.delete(`${API_URL}/boards/${id}`);
  return res.data;
};

export const getCardsByBoard = async (boardId: number): Promise<Card[]> => {
  const res = await axios.get(`${API_URL}/boards/${boardId}`);
  return res.data.cards;
};

export const createCardInBoard = async (
  boardId: number,
  title: string,
  description: string
): Promise<Card> => {
  const res = await axios.post(`${API_URL}/boards/${boardId}/cards`, {
    title,
    description,
  });
  return res.data;
};

export const updateCard = async (
  id: number,
  title: string,
  description: string
): Promise<Card> => {
  const res = await axios.put(`${API_URL}/cards/${id}`, { title, description });
  return res.data;
};

export const deleteCard = async (id: number): Promise<{ deleted: boolean }> => {
  const res = await axios.delete(`${API_URL}/cards/${id}`);
  return res.data;
};
