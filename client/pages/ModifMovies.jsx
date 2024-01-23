import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import React from 'react'

export default function AccountForm({ }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [full_name, setFull_name] = useState('');
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');



  if (!user) {
    return(
      console.log(message)
    )
  }
  else {
    const updateProfile = async (e) => {
      e.preventDefault(); 
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            username,
            full_name,
            website,
          })
          .eq('id', user.id);
    
        if (error) {
          throw error;
        }
        setFull_name('');
        setUsername('');
        setWebsite('');
        setMessage('Data saved successfully!');
        setTimeout(() => {
          setMessage('');
        }, 3000);

      } catch (error) {
        console.error('Error updating profile:', error.message);
      }
    };
    
    return (
      <div className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user.email} disabled />
        </div>
        <form onSubmit={updateProfile}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              className='text-black'
            />
          </div> 
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='text-black'
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className='text-black'
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {message && <p className='text-white'>{message}</p>}
      </div>
    )
  }
}