import { useEffect, useState } from 'react';
import StorageCard from './StorageCard'
import {
  addNote,
  deleteNote,
  getAllNotes,
} from '../indexedDbService'

export default function IndexedDB() {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const allNotes = await getAllNotes();
    setNotes(allNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const save = async () => {
    if (!value.trim()) return;

    await addNote(value);
    setValue('');
    loadNotes();
  }

  const remove = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <StorageCard title="IndexedDB">
      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={save}>Save</button>
      <div>
        {notes.map((note) => (
          <div className='pre'>
            <strong>ID:</strong> {note.id}
            <br />
            <strong>Note:</strong> {note.content}
            <br />
            <button onClick={() => remove(note.id)}>Remove</button>
          </div>
        ))}
      </div>
    </StorageCard>
  );
};