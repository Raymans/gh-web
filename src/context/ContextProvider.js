import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../hooks/useApi';
import { changeLocale } from 'gatsby-plugin-intl';
import { navigate } from 'gatsby-link';

export const StoreContext = React.createContext({});

const StoreProvider = ({ children }) => {
  const {
    user,
    isLoading: auth0Loading
  } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      if(data.metadata.locale[0] === 'zh-TW'){
        navigate(location.pathname.replace('/en/', '/') + location.search);
      }else{
        changeLocale(data.metadata.locale[0]);
      }
      return data.organization ? getMyOrganization() : null;
    })
    .then((data) => {
      setOrganization(data);
      setIsLoading(false);
    })
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
    if (auth0Loading) {
      return;
    }
    if (user) {
      refreshUserProfile();
      refreshDepartments();
    } else {
      setIsLoading(false);
    }
  }, [auth0Loading]);

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
      refreshDepartments,
      isLoading,
      userId: user?.sub
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
