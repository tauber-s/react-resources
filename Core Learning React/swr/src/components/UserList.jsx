import { useUsers } from "../hooks/useUsers";
import { UserItem } from "./UserItem";

export const UserList = () => {
  const { users, isLoading, isError } = useUsers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};