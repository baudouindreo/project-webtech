import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [full_name, setFull_name] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [profiles, setProfiles] = useState();


  const handleSignUp = async () => {
    try {
      const { user, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
      } else {
        const { error: profileError } = await supabaseClient
          .from('profiles')
          .insert([{ UserID: user.id }]);

        if (profileError) {
        } else {
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    else {
      async function fetchprofile() {
        try {
          const { data: profiledata, error } = await supabaseClient
            .from('profiles')
            .select('username, full_name')
            .eq('id', user.id);
          if (error) {
            throw error;
          }
          if (profiledata) {
            setProfiles(profiledata)
          }
        } catch (error) {
          console.error('Error updating profile:', error.message);
        }
      }
      fetchprofile();
    }
  }, [supabaseClient, user]);
  
  if (!user)
    return (
      <div className="flex flex-col items-center">
        <div className="w-1/2">
          <Auth
            appearance={{ ThemeSupa }}
            supabaseClient={supabaseClient}
            providers={['github']}
            socialLayout="horizontal"
            onSignUp={handleSignUp}
          />
        </div>
      </div>
    )
  else {


    const updateProfile = async (e) => {
      e.preventDefault();
      try {
        const { error } = await supabaseClient
          .from('profiles')
          .update({
            username,
            full_name,
          })
          .eq('id', user.id);
        if (error) {
          throw error;
        }
        setFull_name('');
        setUsername('');
        setMessage('Data saved successfully!');
        setTimeout(() => {
          setMessage('');
        }, 1500);
      } catch (error) {
        console.error('Error updating profile:', error.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    };

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full max-w-md">
          <div className="form-widget p-4 flex flex-col justify-center">
            <div className="space-y-4">
              {profiles && profiles.map((prof) => (
                <div key={prof.id} className="border rounded-lg p-3">
                  <p className="font-bold">Name:</p>
                  <p>{prof.full_name}</p>
                  <p className="font-bold">Username:</p>
                  <p>{prof.username}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-black font-bold text-white ">Email:</label>
              <input id="email" type="text" value={user.email} disabled className=" text-black border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed" />
            </div>
            <form onSubmit={updateProfile} className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-black font-bold text-white ">Name:</label>
                <input
                  id="fullName"
                  type="text"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  className=' text-black border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-black font-bold text-white ">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=' text-black border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py2 px-4 rounded-md">Update</button>
            </form>
            {message && <p className="text-black mt-4 text-white">{message}</p>}
          </div>
          <div className="flex items-center">
            <button className="border-2 border-white py-2 px-4 mb-4 hover:bg-gray-200 hover:text-black transition duration-300 focus:outline-none  rounded-md" onClick={() => supabaseClient.auth.signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );

  }
}

export default LoginPage
