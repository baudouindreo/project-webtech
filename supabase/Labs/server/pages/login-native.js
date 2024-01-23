import { useRef, useState } from 'react';
import DefLayout from '/components/DefLayout';

export default function LoginNativePage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', usernameRef.current.value);
    formData.append('password', passwordRef.current.value);

    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <DefLayout>
      <div className="h-full bg-orange-200">
        <h1 className='border-2-black'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={usernameRef} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <button type="submit">Login</button>
        </form>

        <div>
          <p>Username: {username}</p>
          <p>Password: {password}</p>
        </div>
      </div>
    </DefLayout>
  );
}
