import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../hooks/useApi';

export const StoreContext = React.createContext({});

const StoreProvider = ({ children }) => {
  const { user } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [searchedInterviewCriteria, setSearchedInterviewCriteria] = useState({
    specialization: '',
    keyword: '',
    pageSize: 10,
    tab: null
  });
  const [departments, setDepartments] = useState([]);
  const {
    getMyProfile,
    getMyOrganization,
    getDepartments
  } = useApi();

  const refreshUserProfile = () => getMyProfile(user.sub)
    .then((data) => {
      setUserProfile({
        ...data,
        isSocialMedia: data?.id.indexOf('auth0|') === -1
      });
      return data.organization ? getMyOrganization() : null;
    })
    .then((data) => setOrganization(data))
    .catch(() => setTimeout(refreshUserProfile, 10000));

  const refreshUserOrg = () => {
    getMyOrganization()
      .then((data) => setOrganization(data));
  };

  const refreshDepartments = () => getDepartments()
    .then((data) => {
      setDepartments(data.results);
    });

  useEffect(() => {
    if (user) {
      refreshUserProfile();
    }
  }, [user]);

  useEffect(() => {
    refreshDepartments();
  }, []);

  return (
    <StoreContext.Provider value={{
      interviews,
      specializations,
      searchedInterviewCriteria,
      setSearchedInterviewCriteria,
      setInterviews,
      setSpecializations,
      userProfile,
      refreshUserProfile,
      organization,
      setOrganization,
      refreshUserOrg,
      departments,
      refreshDepartments
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
