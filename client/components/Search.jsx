import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Search() {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [res, setRes] = useState(null);
    const [showNotFound, setShowNotFound] = useState(false);

    const SearchSupab = async (e) => {
        e.preventDefault();
        try {
            const { data: movies, error } = await supabase
                .from('Movies')
                .select('*')
                .eq('title', search);
            if (error) {
                throw error;
            }
            if (movies && movies.length > 0) {
                const movieId = movies[0].id;
                router.push(`/Movies/${movieId}`);
            } else {
                setShowNotFound(true);
                setTimeout(() => {
                    setShowNotFound(false); // Hide the not found message after 2 seconds
                }, 2000);
            }
        } catch (error) {
            console.error("Error: No movie with this title", error.message);
        }
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setShowNotFound(false);
    };

    return (
        <div>
            <form onSubmit={SearchSupab} className=''>
                <div className="flex items-center ">
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={handleInputChange}
                        placeholder="Search..."
                        className="border border-gray-300 px-3 py-2 mr-2 rounded-l text-black"
                    />
                    <button type="submit" className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-r">
                        <Image
                            src={'/imageLoupe.jpg'}
                            alt=''
                            width={40}
                            height={40}
                        />
                    </button>
                </div>
            </form>
            {showNotFound && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded">
                    No movie found!
                </div>
            )}
        </div>
    )
}