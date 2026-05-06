import { CreateUserForm } from "./components/CreateUserForm";
import { UserList } from "./components/UserList";

export const Home = () => {
  return (
    <div>
      <h1>Users</h1>
      <CreateUserForm />
      <UserList />
    </div>
  );
};