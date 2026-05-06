export default function List({ items, ItemComponent, onClick }) {
  return (
    <ul>
      {items.map((item) => (
        <ItemComponent
          key={item.id}
          item={item}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};