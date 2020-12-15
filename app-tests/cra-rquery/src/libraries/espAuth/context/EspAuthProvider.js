import React, { useState } from 'react';
import axios from 'axios';

import AuthContext from './espAuthContext';
import { useEspressiveEntity } from '../../espEntity';
import { useLocalStorage } from '../hooks';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    event.preventDefault();

    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    event.preventDefault();

    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type={'text'}
        name='username'
        onChange={handleUsernameChange}
        value={username}
      />
      <input
        type={'password'}
        name='password'
        onChange={handlePasswordChange}
        value={password}
      />
      <button type={'submit'}>login</button>
    </form>
  );
};

export const EspAuthProvider = ({ baseURL, children }) => {
  const [userProfile, setUserProfile] = useLocalStorage('profile', 'object');
  const [token, setToken] = useLocalStorage('token');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));
  const sessionEntity = useEspressiveEntity('session', 'create', { baseURL });
  const profileEntity = useEspressiveEntity('profile', 'whoAmI', { baseURL });

  async function login(username, password) {
    try {
      const data = new FormData();

      data.append('username', username);
      data.append('password', password);

      const { key: token } = await sessionEntity.apiCall({
        data,
      });

      axios.defaults.headers = {
        ...axios.defaults.headers,
        Authorization: `Token ${token}`,
      };

      const { profile } = await profileEntity.apiCall();

      setUserProfile(profile);
      setToken(token);
      setIsAuthenticated(true);
    } catch (err) {
      console.warn(err);
    }
  }

  function logout() {
    setToken();
    setIsAuthenticated(false);
  }

  const content = isAuthenticated ? children : <LoginForm onSubmit={login} />;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userProfile,
      }}
    >
      {content}
    </AuthContext.Provider>
  );
};