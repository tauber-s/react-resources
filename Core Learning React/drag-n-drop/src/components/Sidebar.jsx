import { useState } from "react";

export default function Sidebar() {
  const [components, setComponents] =
    useState([
      {
        id: crypto.randomUUID(),
        name: "Task",
      },
    ]);

  const handleDragStart = (
    e,
    component
  ) => {
    e.dataTransfer.setData(
      "sidebar-item",
      JSON.stringify({
        type: component.name,
      })
    );
  };

  const updateComponent = (
    id,
    value
  ) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id
          ? {
            ...component,
            name: value,
          }
          : component
      )
    );
  };

  const addComponent = () => {
    setComponents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "New Component",
      },
    ]);
  };

  const removeComponent = (id) => {
    setComponents((prev) =>
      prev.filter(
        (component) =>
          component.id !== id
      )
    );
  };

  return (
    <div className="sidebar">
      <h2>Components</h2>

      {components.map((component) => (
        <div
          key={component.id}
          className="sidebar-item"
        >
          <span
            className="drag-handle"
            draggable
            onDragStart={(e) =>
              handleDragStart(e, component)
            }
          >
            ☰
          </span>
          <input
            value={component.name}
            onChange={(e) =>
              updateComponent(
                component.id,
                e.target.value
              )
            }
            onClick={(e) =>
              e.stopPropagation()
            }
          />

          <button
            className="delete-btn"
            onClick={() =>
              removeComponent(component.id)
            }
          >
            ✕
          </button>
        </div>
      ))}

      <button
        className="add-button"
        onClick={addComponent}
      >
        Add Component
      </button>
    </div>
  );
};