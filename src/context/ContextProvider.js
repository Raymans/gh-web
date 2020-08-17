import React, { useState } from 'react';

export const StoreContext = React.createContext({});

const StoreProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [searchedInterviewCriteria, setSearchedInterviewCriteria] = useState({
    specialization: '', keyword: '', pageSize: 10, owner: false,
  });

  return (
    <StoreContext.Provider value={{
      interviews,
      specializations,
      searchedInterviewCriteria,
      setSearchedInterviewCriteria,
      setInterviews,
      setSpecializations,
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
