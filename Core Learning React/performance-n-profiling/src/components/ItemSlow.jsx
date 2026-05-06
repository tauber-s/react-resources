import { slowFunction } from "../utils/slowFunction";
import { useRenderTracker } from "../hooks/useRenderTracker";

export default function ItemSlow({ item, onClick }) {
  useRenderTracker(`Slow Item ${item.id}`);
  slowFunction(3);

  return (
    <li onClick={() => onClick(item.id)}>
      {item.label}
    </li>
  );
};