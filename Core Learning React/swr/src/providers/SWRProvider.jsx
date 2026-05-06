import { SWRConfig } from "swr";
import { api } from "../api/client";

export const SWRProvider = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => api.get(url).then(res => res.data),
        dedupingInterval: 2000,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 2000,
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};