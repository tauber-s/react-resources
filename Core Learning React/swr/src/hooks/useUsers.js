import useSWR from "swr";

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/users");

  return {
    users: data ?? [],
    isLoading,
    isError: !!error,
    mutateUsers: mutate,
  };
};