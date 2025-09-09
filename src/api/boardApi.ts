import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Card {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "DOING" | "DONE" | "URGENT";
  boardId: number;
}

export interface Board {
  id: number;
  name: string;
  cards: Card[];
}

export const getBoards = async (): Promise<Board[]> => {
  const res = await api.get("/boards");
  return res.data;
};

export const getBoardById = async (id: number): Promise<Board> => {
  const res = await api.get(`/boards/${id}`);
  return res.data;
};

export const createBoard = async (name: string): Promise<Board> => {
  const res = await api.post(`/boards`, { name });
  return res.data;
};

export const updateBoard = async (id: number, name: string): Promise<Board> => {
  const res = await api.put(`/boards/${id}`, { name });
  return res.data;
};

export const deleteBoard = async (
  id: number
): Promise<{ deleted: boolean }> => {
  const res = await api.delete(`/boards/${id}`);
  return res.data;
};

export const getCardsByBoard = async (boardId: number): Promise<Card[]> => {
  const res = await api.get(`/boards/${boardId}`);
  return res.data.cards;
};

export const createCardInBoard = async (
  boardId: number,
  title: string,
  description: string,
  status: string
): Promise<Card> => {
  const res = await api.post(`/boards/${boardId}/cards`, {
    title,
    description,
    status,
  });
  console.log(res);
  return res.data;
};

export const updateCard = async (
  id: number,
  title: string,
  description: string,
  status: string
): Promise<Card> => {
  const res = await api.put(`/cards/${id}`, {
    title,
    description,
    status,
  });
  return res.data;
};

export const deleteCard = async (id: number): Promise<{ deleted: boolean }> => {
  const res = await api.delete(`/cards/${id}`);
  return res.data;
};
