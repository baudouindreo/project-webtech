import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function Movies() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [listemovies, setListmovies] = useState([]);
    const [listecomment, setListecomment] = useState([]);
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [movieImages, setMovieImages] = useState([]);

    const lastSegment = router.asPath.split('/').pop();

    const downloadImage = useCallback(async (imagePath) => {
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
    }, [supabase]);

    useEffect(() => {
        async function fetchMovieAndComments() {
            try {
                const { data: MoviesData, error: moviesError } = await supabase
                    .from('Movies')
                    .select('title, description, image_path')
                    .eq('id', lastSegment);

                if (moviesError) {
                    throw moviesError;
                }

                if (MoviesData) {
                    setListmovies(MoviesData);

                    const imagePromises = MoviesData.map(async (movie) => {
                        if (movie.image_path) {
                            const imageUrl = await downloadImage(movie.image_path);
                            return imageUrl;
                        }
                        return null;
                    });

                    const images = await Promise.all(imagePromises);
                    setMovieImages(images);
                }

                const { data: CommentData, error: commentsError } = await supabase
                    .from('comment')
                    .select('comment')
                    .eq('title', lastSegment);

                if (commentsError) {
                    throw commentsError;
                }

                if (CommentData) {
                    setListecomment(CommentData);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchMovieAndComments();
    }, [supabase, lastSegment, downloadImage]);

    const insertComment = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('comment')
                .insert({
                    title: lastSegment,
                    comment,
                });
            if (error) {
                throw error;
            }
            setTitle('');
            setComment('');
            setMessage('Data saved successfully!');
            setTimeout(() => {
                setMessage('');
            }, 1500);
        } catch (error) {
            console.error('Error inserting comment:', error.message);
        }
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    return (
        <div className="form-widget">
            <div className='w-full flex justify-center flex-wrap'>
                {/* Affichage des films et images */}
                {listemovies &&
                    listemovies.map((movie, index) => (
                        <div key={movie.id} className="border rounded-lg shadow-md p-4 mb-4 w-full md:w-1/2">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-lg font-bold mb-2">Titre: {movie.title}</p>
                                    <p>Description: {movie.description}</p>
                                </div>
                                {movieImages[index] && (
                                    <div className="flex-shrink-0 ml-4">
                                        <Image
                                            src={movieImages[index]}
                                            alt={movie.title}
                                            className="max-h-100 rounded-lg"
                                            style={{ maxHeight: '100px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
            {/* Section pour soumettre des commentaires */}
            <div className='w-full flex justify-center flex-wrap'>
                <div className="border rounded-lg shadow-md p-4 mt-4 md:w-1/2 ">
                    <form onSubmit={insertComment} className="space-y-4">
                        <div>
                            <label htmlFor="comment" className="block text-black font-bold text-white">Votre commentaire:</label>
                            <input
                                id="comment"
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 text-black'
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2">Envoyer</button>
                    </form>
                    {message && <p className="text-white mt-2">{message}</p>}
                </div>
            </div>
            {/* Section pour afficher les commentaires */}
            <div className='w-full flex justify-center flex-wrap'>
                <div className="border rounded-lg shadow-md p-4 mt-4 md:w-1/2">
                    <p className="text-lg font-bold mb-6 text-center">Commentaires:</p>
                    {listecomment &&
                        listecomment.map((comments, index) => (
                            <div key={index}>
                                <p> - {comments.comment}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}