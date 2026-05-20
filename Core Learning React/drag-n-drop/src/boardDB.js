import { openDB } from "idb";

const DB_NAME = "drag-drop-db";
const STORE_NAME = "board-store";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveBoard(board) {
  const db = await initDB();

  await db.put(
    STORE_NAME,
    board,
    "board-data"
  );
}

export async function getBoard() {
  const db = await initDB();

  return db.get(
    STORE_NAME,
    "board-data"
  );
}