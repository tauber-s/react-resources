import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";

export const CreateUserForm = () => {
  const [name, setName] = useState("");
  const { createUser } = useCreateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User name"
      />
      <button type="submit">Add</button>
    </form>
  );
};