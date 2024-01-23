import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ManageMovies = () => {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [movies, setMovies] = useState([]);
    const user = useUser();

    useEffect(() => {
        const downloadImage = async (imagePath) => {
            try {
                const { data, error } = await supabase.storage.from('imageMovie').download(imagePath);
                if (error) {
                    throw error;
                }
                return URL.createObjectURL(data);
            } catch (error) {
                console.error('Error downloading image:', error.message);
                return null;
            }
        };

        async function fetchMovies() {
            try {
                if (user && user.id) {
                    const { data: MoviesData, error } = await supabase
                        .from('Movies')
                        .select('*')
                        .eq('author', user.id);
                    if (error) {
                        throw error;
                    }
                    if (MoviesData) {
                        const moviesWithImages = await Promise.all(
                            MoviesData.map(async (movie) => {
                                if (movie.image_path) {
                                    const imageUrl = await downloadImage(movie.image_path);
                                    return { ...movie, imageUrl };
                                }
                                return movie;
                            })
                        );
                        setMovies(moviesWithImages);
                    }
                }
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        }

        fetchMovies();
    }, [supabase, user]);

    const navigateTo = (route) => {
        router.push(route);
    };

    return (
        <div className="flex flex-col items-center">
            <button className="border-2 border-white rounded-md py-2 px-4 mb-4 hover:bg-gray-200 hover:text-black transition duration-300" onClick={() => navigateTo('/AddMovies')}>
                Ajouter un film
            </button>
            {movies &&
                movies.map((movie) => (
                    <div key={movie.id} className="w-1/2">
                        <Link href={`/ModifMovies/${movie.id}`} className="w-full">
                            <div className="border rounded-lg shadow-md p-4 mb-4 hover:border-4 transition duration-300 flex items-center">
                                <div className="flex-1">
                                    <div className="mb-2">
                                        <p className="font-bold">Title:</p>
                                        <p className='text-white'>{movie.title}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Description:</p>
                                        <p className='text-white'>{movie.description}</p>
                                    </div>
                                </div>
                                {movie.imageUrl && (
                                    <div className="flex-shrink-0 ml-4">
                                        <Image
                                            src={movie.imageUrl}
                                            alt={movie.title}
                                            className="max-h-100 rounded-lg"
                                            style={{ maxHeight: '100px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default ManageMovies;