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
    const [profiles, setProfiles] = useState();

    useEffect(() => {
        if (!user) {
            return;
        }
        else {
            async function fetchprofile() {
                try {
                    const { data: profiledata, error } = await supabase
                        .from('profiles')
                        .select('username, full_name, website')
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
    }, [supabase, user]);

    if (!user) {
        return (
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
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        };
        return (
            <div className="form-widget p-4 max-w-md mx-auto">
                <div className="space-y-4">
                    {profiles && profiles.map((prof) => (
                        <div key={prof.id} className="border rounded-lg p-3">
                            <p className="font-bold">Full Name:</p>
                            <p>{prof.full_name}</p>
                            <p className="font-bold">Username:</p>
                            <p>{prof.username}</p>
                            <p className="font-bold">Website:</p>
                            <p>{prof.website}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-black font-bold text-white ">Email:</label>
                    <input id="email" type="text" value={user.email} disabled className=" text-black border
border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed" />
                </div>
                <form onSubmit={updateProfile} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-black font-bold text-white ">Full
                            Name:</label>
                        <input
                            id="fullName"
                            type="text"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            className=' text-black border border-gray-300 rounded-md px-3 py-2 w-full
focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-black font-bold text-white
">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className=' text-black border border-gray-300 rounded-md px-3 py-2 w-full
focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-black font-bold text-white
">Website:</label>
                        <input
                            id="website"
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className=' text-black border border-gray-300 rounded-md px-3 py-2 w-full
focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py2 px-4 rounded-md">Update</button>
                </form>
                {message && <p className="text-black mt-4 text-white ">{message}</p>}
            </div>
        );
    }
}