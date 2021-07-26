import { createContext, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';
import history from '../history';

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const { addToast } = useToasts();
  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const isLoggedIn = !!profile;

  const getProfile = useCallback(async () => {
    setLoadingProfile(true);
    let data = null;
    try {
      data = await API.get('/currentUser').then((res) => res.data);
      setProfile(data);
    } catch (err) {
      window.console.error(err);
    } finally {
      setLoadingProfile(false);
    }
    return data;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      await API.post('/auth/login', { email, password });
      addToast('Connexion réussie !', {
        appearance: 'success',
      });
      getProfile();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        addToast('Email ou mot de passe incorrect !', {
          appearance: 'error',
        });
      } else window.console.error(err);
    }
  });

  useEffect(() => {
    getProfile();
  }, []);

  const logout = useCallback(async () => {
    try {
      await API.get('/auth/logout');
      addToast('Vous vous êtes déconnecté !', {
        appearance: 'success',
      });
      setProfile(undefined);
      history.push('/');
    } catch (err) {
      addToast('Impossible de se déconnecter !', {
        appearance: 'error',
      });
    }
  }, []);

  const kickAdmin = useCallback(async () => {
    try {
      await API.get('/auth/logout');
      setProfile(undefined);
      history.push('/');
    } catch (err) {
      window.console.error(err);
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        profile,
        loadingProfile,
        getProfile,
        isLoggedIn,
        logout,
        login,
        kickAdmin,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
