import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <div>
          <LoggedIn />
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};

export default Header;
