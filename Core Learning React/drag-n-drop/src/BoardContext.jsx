import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialData } from "./initialData";

import {
  getBoard,
  saveBoard,
} from "./boardDB";

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [board, setBoard] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadBoard() {
      try {
        const savedBoard =
          await getBoard();

        setBoard(
          savedBoard || initialData
        );
      } catch (error) {
        console.error(
          "Error loading IndexedDB",
          error
        );

        setBoard(initialData);
      } finally {
        setLoading(false);
      }
    }

    loadBoard();
  }, []);

  useEffect(() => {
    if (!board) return;

    saveBoard(board);
  }, [board]);

  const moveCard = (
    fromColumn,
    toColumn,
    cardId
  ) => {
    if (fromColumn === toColumn) return;

    const card = board[fromColumn].find(
      (c) => c.id === cardId
    );

    setBoard((prev) => ({
      ...prev,
      [fromColumn]:
        prev[fromColumn].filter(
          (c) => c.id !== cardId
        ),

      [toColumn]: [
        ...prev[toColumn],
        card,
      ],
    }));
  };

  const addCard = (column, type) => {
    const newCard = {
      id: crypto.randomUUID(),
      title: type,
    };

    setBoard((prev) => ({
      ...prev,
      [column]: [...prev[column], newCard],
    }));
  };

  if (loading) {
    return (
      <div className="loading">
        Loading board...
      </div>
    );
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        moveCard,
        addCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);