export default function Sidebar() {
  const components = [
    "Bug",
    "Feature",
    "Task",
  ];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData(
      "sidebar-item",
      JSON.stringify({
        type,
      })
    );
  };

  return (
    <div className="sidebar">
      <h2>Components</h2>

      {components.map((item) => (
        <div
          key={item}
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            handleDragStart(e, item)
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
};