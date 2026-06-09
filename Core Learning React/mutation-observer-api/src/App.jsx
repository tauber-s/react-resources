import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const observedRef = useRef(null);

  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(1);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prev) => [
      {
        id: crypto.randomUUID(),
        message,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        switch (mutation.type) {
          case "childList":
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1)
                addLog(`Element added: ${node.tagName}`);
            });

            mutation.removedNodes.forEach((node) => {
              if (node.nodeType === 1)
                addLog(`Element removed: ${node.tagName}`);
            });
            break;

          case "attributes":
            addLog(`Attribute changed: ${mutation.attributeName}`);
            break;
        }
      });
    });

    observer.observe(observedRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  const addCard = () => {
    setItems((prev) => [
      ...prev,
      {
        id: counter,
        color:
          "#" +
          Math.floor(Math.random() * 16777215).toString(16),
      },
    ]);

    setCounter((c) => c + 1);
  };

  const removeCard = () => {
    setItems((prev) => prev.slice(0, -1));
  };

  const randomizeColors = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        color:
          "#" +
          Math.floor(Math.random() * 16777215).toString(16),
      }))
    );
  };

  return (
    <div className="container">
      <h1>Mutation Observer API</h1>
      <div className="actions">
        <button onClick={addCard}>
          Add Card
        </button>

        <button onClick={removeCard}>
          Remove Card
        </button>

        <button onClick={randomizeColors}>
          Change Attributes
        </button>
      </div>

      <div className="cards-container" ref={observedRef}>
        {items.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{ backgroundColor: item.color }}
            data-id={item.id}
          >
            Card {item.id}
          </div>
        ))}
      </div>

      <div className="logs">
        <h2>Mutation Logs</h2>
        {logs.map((log) => (
          <div className="log-item" key={log.id}>
            <span>{log.time}</span>
            <p>{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};