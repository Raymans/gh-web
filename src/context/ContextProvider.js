import React, { useState } from 'react';

export const StoreContext = React.createContext({});

const StoreProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  return (
    <StoreContext.Provider value={{
      interviews,
      setInterviews,
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
