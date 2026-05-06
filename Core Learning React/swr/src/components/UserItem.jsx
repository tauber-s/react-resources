import React from "react";

export const UserItem = React.memo(({ user }) => {
  console.log("render:", user.id);

  return <div>{user.name}</div>;
});