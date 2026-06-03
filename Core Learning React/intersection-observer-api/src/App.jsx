import {useIntersectionObserver} from './useIntersectionObserver.js'
import './App.css';
import moe from "./moe.jpg"

const App = () => {
  const [containerRef, isVisible] = useIntersectionObserver({
  root: null,
  rootMargin: "0px",
  threshold: 0,
});

  return (
    <div className="app">
      <div className="isVisible">{isVisible ? "IN VIEWPORT" : "NOT IN VIEWPORT"}</div>
      <div className="section"></div>
     <div className="box" ref={containerRef}><img src={moe} alt="moe"/></div>
    </div>
  );
}

export default App;