import React from "react";
import { useRenderTracker } from "../hooks/useRenderTracker";

const ItemOptimized = ({ item, onClick }) => {
  useRenderTracker(`Optimized Item ${item.id}`);

  return (
    <li onClick={() => onClick(item.id)}>
      {item.label}
    </li>
  );
};

export default React.memo(ItemOptimized);