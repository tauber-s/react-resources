import React, { Suspense } from "react";
import { useGlobalState } from "./GlobalState";

const RemoteButton = React.lazy(() => import("remote/Button"));

export default function App() {
  const { count } = useGlobalState();
  return (
    <div>
      <h1>Host App</h1>
      <p>Count: {count}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
};