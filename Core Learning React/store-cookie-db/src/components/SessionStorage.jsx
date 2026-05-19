import { useEffect, useState } from 'react';
import StorageCard from './StorageCard';

export default function SessionStorage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('session-storage-demo');

    if (saved) setValue(saved);
  }, []);

  const save = () => {
    sessionStorage.setItem('session-storage-demo', value);
  };

  const clear = () => {
    sessionStorage.removeItem('session-storage-demo');
    setValue('');
  };

  return (
    <StorageCard title="Session Storage">
      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={save}>Save</button>
      <button onClick={clear}>Clear</button>
      <div className='pre'>{value}</div>
    </StorageCard>
  );
};