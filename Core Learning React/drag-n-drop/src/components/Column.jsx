import Card from "./Card";
import { useBoard } from "../BoardContext";

export default function Column({
  title,
  columnKey,
}) {
  const {
    board,
    moveCard,
    addCard,
  } = useBoard();

  const handleDrop = (e) => {
    e.preventDefault();

    const cardData =
      e.dataTransfer.getData(
        "application/json"
      );

    const sidebarData =
      e.dataTransfer.getData(
        "sidebar-item"
      );

    if (cardData) {
      const data = JSON.parse(cardData);

      moveCard(
        data.fromColumn,
        columnKey,
        data.cardId
      );

      return;
    }

    if (sidebarData) {
      const data =
        JSON.parse(sidebarData);

      addCard(columnKey, data.type);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>{title}</h2>

      {board[columnKey].map(
        (card) => (
          <Card
            key={card.id}
            card={card}
            column={columnKey}
          />
        )
      )}
    </div>
  );
};