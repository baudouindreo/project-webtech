import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const LoggedIn = () => {
  const { user, logout } = useContext(UserContext);

  const onClickLogout = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>{user.username}</p>
          <button onClick={onClickLogout}>Déconnexion</button>
        </div>
      ) : (
        <p>Utilisateur non connecté</p>
      )}
    </div>
  );
};

export default LoggedIn;
