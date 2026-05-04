// app/GameContext.js
"use client";

import { createContext, useEffect, useState } from "react";
// Import funkcji z SDK Firebase
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../../firebase";

const GamesContext = createContext();
export default GamesContext;

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pobieranie danych z bazy przy pierwszym renderowaniu
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "board_games"));
        const gamesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          // Mapowanie ID dokumentu
          id: doc.id 
        }));
        
        setGames(gamesData);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
        alert("Błąd: Nie udało się pobrać listy gier z Firebase");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Dodawanie elementu
  const addGame = async (gameData) => {
    const newId = crypto.randomUUID();
    const newGame = {
      ...gameData,
      id: newId, 
    };

    try {
      await setDoc(doc(db, "board_games", newId), newGame);
      setGames(games.concat([newGame]));
    } catch (error) {
      console.error("Błąd dodawania gry:", error);
      alert("Nie udało się dodać gry!");
    }
  };

  // Edycja elementu
  const editGame = async (id, updatedData) => {
    try {
      const gameDocRef = doc(db, "board_games", id.toString());
      await updateDoc(gameDocRef, updatedData);

      const newGames = games.map((game) =>
        game.id.toString() === id.toString() ? { ...game, ...updatedData } : game
      );
      setGames(newGames);
    } catch (error) {
      console.error("Błąd edycji gry:", error);
      alert("Nie udało się zaktualizować gry!");
    }
  };

  // Usuwanie elementu
  const deleteGame = async (id) => {
    try {
      await deleteDoc(doc(db, "board_games", id.toString()));

      const newGames = games.filter((game) => game.id.toString() !== id.toString());
      setGames(newGames);
    } catch (error) {
      console.error("Błąd usuwania gry:", error);
      alert("Nie udało się usunąć gry!");
    }
  };

  // Przełączanie stanu wyszarzenia
  const toggleWyszarzenie = async (id, obecnyStan) => {
    try {
      const nowyStan = !obecnyStan;
      const gameDocRef = doc(db, "board_games", id.toString());
      
      await updateDoc(gameDocRef, { czyWyszarzone: nowyStan });

      const newGames = games.map((game) =>
        game.id.toString() === id.toString() ? { ...game, czyWyszarzone: nowyStan } : game
      );
      setGames(newGames);
    } catch (error) {
      console.error("Błąd zmiany stanu wyszarzenia:", error);
      alert("Nie udało się zmienić statusu gry!");
    }
  };

  return (
    <GamesContext.Provider value={{ 
      games, 
      isLoading, 
      addGame, 
      editGame, 
      deleteGame, 
      toggleWyszarzenie 
    }}>
      {children}
    </GamesContext.Provider>
  );
};