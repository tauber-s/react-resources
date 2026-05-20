import "./index.css";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import { BoardProvider } from "./BoardContext";

export default function App() {
  return (
    <BoardProvider>
      <div className="layout">
        <Sidebar />
        <Canvas />
      </div>
    </BoardProvider>
  );
};