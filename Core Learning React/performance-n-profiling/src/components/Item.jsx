import { useRenderTracker } from "../hooks/useRenderTracker";

export default function Item({ item, onClick }) {
  useRenderTracker(`Default Item ${item.id}`);

  return (
    <li onClick={() => onClick(item.id)}>
      {item.label}
    </li>
  );
};