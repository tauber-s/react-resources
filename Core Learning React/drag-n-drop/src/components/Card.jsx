export default function Card({ card, column }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        cardId: card.id,
        fromColumn: column,
      })
    );

    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
    >
      {card.title}
    </div>
  );
};