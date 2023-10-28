"use client";
import React, { createContext, useEffect, useState } from "react";
import { Store } from "./Store";

export const StoreContext = createContext<Store | null>(null);

export function StoreProvider(props: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newStore = new Store();
      setStore(newStore);
    }
  }, []);

  if (!store) {
    return null; 
  }

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}
