import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import StorageCard from './StorageCard';

export default function Cookiess() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const saved = Cookies.get('cookie-demo');

    if (saved) setValue(saved);
  }, []);

  const save = () => {
    Cookies.set('cookie-demo', value, {
      expires: 7,
    });
  };

  const clear = () => {
    Cookies.remove('cookie-demo');
    setValue('');
  };

  return (
    <StorageCard title="Cookies">
      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={save}>Save</button>
      <button onClick={clear}>Clear</button>

      <div  className='pre'>{value}</div>
    </StorageCard>
  );
};