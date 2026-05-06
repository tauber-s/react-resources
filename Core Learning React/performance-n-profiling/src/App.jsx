import { useState, useMemo, useCallback, Profiler, useTransition } from "react";
import List from "./components/List";
import Item from "./components/Item";
import ItemOptimized from "./components/ItemOptimized";
import ItemSlow from "./components/ItemSlow";

export default function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("normal");
  const [isPending, startTransition] = useTransition();

  const items = useMemo(() => {
    return Array.from({ length: 2000 }, (_, i) => ({
      id: i,
      label: `Item ${i}`,
    }));
  }, []);

  const handleClick = useCallback((id) => {
    console.log("clicked", id);
  }, []);

  const onRender = (id, phase, actualDuration) => {
    console.log(`[Profiler] ${id} (${phase}) took ${actualDuration}ms`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // ⚡ simula concurrent rendering
    startTransition(() => {
      setText(value);
    });
  };

  let ComponentToRender;

  switch (mode) {
    case "optimized":
      ComponentToRender = ItemOptimized;
      break;
    case "slow":
      ComponentToRender = ItemSlow;
      break;
    default:
      ComponentToRender = Item;
  };

  return (
    <Profiler id="App" onRender={onRender}>
      <div style={{ padding: 20 }}>
        <h1>Performance and Profiling</h1>

        <input
          value={text}
          onChange={handleInputChange}
          placeholder="Type here..."
        />

        {isPending && <p>Rendering...</p>}

        <div style={{ margin: "10px 0" }}>
          <button onClick={() => setMode("default")}>Default</button>
          <button onClick={() => setMode("optimized")}>Optimized</button>
          <button onClick={() => setMode("slow")}>Slow</button>
        </div>

        <List
          items={items}
          ItemComponent={ComponentToRender}
          onClick={handleClick}
        />
      </div>
    </Profiler>
  );
};