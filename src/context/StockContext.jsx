import { createContext, useEffect, useState } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("stockMovements");


    const parsed = stored ? JSON.parse(stored) : [];
    setMovements(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem("stockMovements", JSON.stringify(movements));
  }, [movements]);

  const addMovement = (movement) => {
    setMovements((prev) => [...prev, movement]);
  };

  return (
    <StockContext.Provider value={{ movements, addMovement }}>
      {children}
    </StockContext.Provider>
  );
};
