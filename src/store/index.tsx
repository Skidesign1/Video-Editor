"use client";
import React, { createContext, useEffect, useState } from "react";
import { Store } from "./Store";

export const StoreContext = createContext<Store | null>(null);

export function StoreProvider(props: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store | null>(() => new Store());

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}
