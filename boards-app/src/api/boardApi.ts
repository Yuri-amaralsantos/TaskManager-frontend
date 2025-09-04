import axios from "axios";

const API_URL = "http://localhost:3000";

export interface Board {
  id: number;
  name: string;
  cards: Card[];
}

export interface Card {
  id: number;
  title: string;
  description: string;
  boardId: number;
}

export const getBoards = async (): Promise<Board[]> => {
  const res = await axios.get(`${API_URL}/boards`);
  return res.data;
};

export const createBoard = async (name: string): Promise<Board> => {
  const res = await axios.post(`${API_URL}/boards`, { name });
  return res.data;
};

export const getCardsByBoard = async (boardId: number): Promise<Card[]> => {
  const res = await axios.get(`${API_URL}/boards/${boardId}`);
  return res.data.cards;
};
