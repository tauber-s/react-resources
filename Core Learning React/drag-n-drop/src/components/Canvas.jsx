import Column from "./Column";

export default function Canvas() {
  return (
    <div className="board">
      <Column title="Backlog" columnKey="backlog" />
      <Column title="Doing" columnKey="doing" />
      <Column title="Done" columnKey="done" />
    </div>
  );
}