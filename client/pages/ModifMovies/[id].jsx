import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Movies() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [movieData, setMovieData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [movieImage, setMovieImage] = useState('');

    const lastSegment = router.asPath.split('/').pop();

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

        if (!lastSegment) return;

        async function fetchMovie() {
            try {
                const { data: movieData, error } = await supabase
                    .from('Movies')
                    .select('title, description, image_path')
                    .eq('id', lastSegment);
                if (error) {
                    throw error;
                }

                if (movieData && movieData.length > 0) {
                    const movie = movieData[0];
                    setMovieData(movie);

                    if (movie.image_path) {
                        const imageUrl = await downloadImage(movie.image_path);
                        setMovieImage(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching movie:', error.message);
            }
        }

        fetchMovie();
    }, [supabase, lastSegment]);

    const updateMovie = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('Movies')
                .update({
                    title,
                    description,
                })
                .eq('id', lastSegment);
            if (error) {
                throw error;
            }
            setTitle('');
            setDescription('');
            setMessage('Data saved successfully!');
            setTimeout(() => {
                setMessage('');
            }, 1500);
        } catch (error) {
            console.error('Error updating movie:', error.message);
        }
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const deleted = async () => {
        try {
            const { error } = await supabase
                .from('Movies')
                .delete('*')
                .eq('id', lastSegment);
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
        router.push('/ManageMovies');
    };

    return (
        <div className="p-4 space-y-8">
            <div className="space-y-4 border rounded-lg shadow-md items-center">
                <div className='w-1/2 flex p-4'>
                    <div className="flex-1">
                        {movieData && (
                            <div className="p-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold mr-2">Titre : </p>
                                    <p>{movieData.title}</p>
                                </div>
                                <p>Description : {movieData.description}</p>
                            </div>
                        )}
                    </div>
                    {movieImage && (
                        <div className="flex-shrink-0 ml-4">
                            <Image
                                src={movieImage}
                                alt={movieData?.title || ''}
                                className="max-h-100 rounded-lg"
                                style={{ maxHeight: '100px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <form onSubmit={updateMovie} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block font-bold">Titre :</label>
                        <input
                            id="fullName"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='text-black border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block font-bold">Description :</label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='text-black border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                        Mettre à jour
                    </button>
                </form>
                {message && <p className='text-white'>{message}</p>}
            </div>
            <div className="flex justify-end">
                <button onClick={deleted} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">
                    Supprimer
                </button>
            </div>
        </div>
    );
}