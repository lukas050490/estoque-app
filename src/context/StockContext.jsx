import { createContext, useEffect, useState } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("stockMovements");
  
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      setMovements(parsed);
    } catch (error) {
      console.error("Erro ao carregar movimentos do localStorage:", error);
      setMovements([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stockMovements", JSON.stringify(movements));
  }, [movements]);

  const addMovement = (movement) => {
    setMovements((prev) => [...prev, movement]);
  };

  return (
    <StockContext.Provider value={{ movements, addMovement}}>
      {children}
    </StockContext.Provider>
  );
};
