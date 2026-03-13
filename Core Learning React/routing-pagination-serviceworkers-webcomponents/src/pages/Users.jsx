import { useState } from "react";
import Pagination from "../components/Pagination";

const USERS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User name${i + 1}`
}));

export default function Users() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(USERS.length / pageSize);
  const start = (page - 1) * pageSize;
  const users = USERS.slice(start, start + pageSize);

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (<div key={user.id}>{user.name}</div>))}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
    </div>
  );
};