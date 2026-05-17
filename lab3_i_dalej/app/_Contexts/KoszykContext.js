// app/_Contexts/KoszykContext.js
"use client";
import { createContext, useContext, useReducer } from "react";

const KoszykContext = createContext();

const koszykReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.some((game) => game.id === action.game.id)) {
        return state; 
      }
      return [...state, action.game];

    case "REMOVE":
      return state.filter((game) => game.id !== action.game.id);

    case "CLEAR":
      return [];

    default:
      throw new Error(`Nieznana akcja = ${action.type}`);
  }
};

export const KoszykProvider = ({ children }) => {
  const [koszyk, dispatch] = useReducer(koszykReducer, []);

  // Metody pomocnicze wywołujące akcje w reducerze
  const addToKoszyk = (game) => dispatch({ type: "ADD", game });
  const removeFromKoszyk = (game) => dispatch({ type: "REMOVE", game });
  const clearKoszyk = () => dispatch({ type: "CLEAR" });
  const isInKoszyk = (game) => koszyk.some((g) => g.id === game.id);

  const totalValue = koszyk.reduce((total, game) => total + (game.price_pln || 0), 0);

  return (
    <KoszykContext.Provider
      value={{
        koszyk,
        addToKoszyk,
        removeFromKoszyk,
        clearKoszyk,
        isInKoszyk,
        totalValue,
      }}
    >
      {children}
    </KoszykContext.Provider>
  );
};


export function useKoszyk() {
  return useContext(KoszykContext);
}