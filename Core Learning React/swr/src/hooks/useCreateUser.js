import { api } from "../api/client";
import { mutate } from "swr";

export const useCreateUser = () => {
  const createUser = async (newUser) => {
    const optimisticUser = {
      ...newUser,
      id: Math.random(),
    };

    mutate(
      "/users",
      (users = []) => [...users, optimisticUser],
      false
    );

    try {
      const response = await api.post("/users", newUser);
      mutate("/users");

      return response.data;
    } catch (error) {
      mutate("/users");
      throw error;
    };
  };

  return { createUser };
};