import React, { Suspense } from "react";

const RemoteButton = React.lazy(() => import("remote/Button"));

export default function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
}