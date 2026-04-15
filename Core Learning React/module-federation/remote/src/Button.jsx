import React from "react";

export default function Button() {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("increment", { detail: 1 })
    );
  };
  return (
    <button onClick={handleClick}>
      Increment
    </button>
  );
};