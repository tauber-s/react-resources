import React, { useContext } from "react";
import { GlobalContext } from "./GlobalState";

export default function CounterDisplay() {
  const { count } = useContext(GlobalContext);
  return <p>Host count: {count}</p>;
};