import { openDB } from 'idb';

const dbPromise = openDB('storage-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('notes')) {
      db.createObjectStore('notes', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
  },
});

export const addNote = async (content) => {
  const db = await dbPromise;

  return db.add('notes', {
    content,
    createdAt: new Date().toISOString(),
  });
};

export const getAllNotes = async () => {
  const db = await dbPromise;
  return db.getAll('notes');
};

export const deleteNote = async (id) => {
  const db = await dbPromise;
  return db.delete('notes', id);
};