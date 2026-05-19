import LocalStorage from './components/LocalStorage';
import SessionStorage from './components/SessionStorage';
import Cookiess from './components/Cookiess';
import IndexedDB from './components/IndexedDB';

export default function App() {
  return (
    <div className="app">
      <h1>Local Storage | Session Storage | Cookies | IndexedDB</h1>

      <div className="grid">
        <LocalStorage />
        <SessionStorage />
        <Cookiess />
        <IndexedDB />
      </div>
    </div>
  );
};