import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const LoggedOut = () => {
  const { login } = useContext(UserContext);

  const onClickLogin = async () => {
    const response = await fetch('/api/profile');
    const user = await response.json();
    login(user);
    
  };

  return (
    <div>
      <button onClick={onClickLogin}>Connexion</button>
    </div>
  );
};

export default LoggedOut;
