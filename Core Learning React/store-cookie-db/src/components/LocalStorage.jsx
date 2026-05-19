import { useEffect, useState } from 'react';
import StorageCard from './StorageCard';

export default function LocalStorage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('local-storage-demo');

    if (saved) setValue(saved);
  }, []);

  const save = () => {
    localStorage.setItem('local-storage-demo', value);
  };

  const clear = () => {
    localStorage.removeItem('local-storage-demo');
    setValue('');
  };

  return (
    <StorageCard title="Local Storage">
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