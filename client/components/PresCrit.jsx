import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const PresCrit = () => {
    const supabase = useSupabaseClient();
    const [latestMovie, setLatestMovie] = useState(null);
    const [latestMovieImage, setLatestMovieImage] = useState(null);

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
        async function fetchLatestMovie() {
            try {
                const { data, error } = await supabase
                    .from('Movies')
                    .select('id, title, description, image_path')
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (error) {
                    throw error;
                }

                if (data && data.length > 0) {
                    setLatestMovie(data[0]);
                    if (data[0].image_path) {
                        const imageUrl = await downloadImage(data[0].image_path);
                        setLatestMovieImage(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching latest movie:', error.message);
            }
        }
        fetchLatestMovie();
    }, [supabase, downloadImage]);

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold my-8">Dernier article ajouté:</h1>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {latestMovie && (
                        <div className="border rounded-lg p-6 flex transition duration-300 hover:border-4 hover:border-gray-400">
                            <div className="flex-1">
                                <Link href={`/Movies/${latestMovie.id}`}>
                                    <div>
                                        <p className="font-bold">Title:</p>
                                        <p>{latestMovie.title}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="font-bold">Description:</p>
                                        <p>{latestMovie.description}</p>
                                    </div>
                                </Link>
                            </div>
                            {latestMovieImage && (
                                <div className="flex-shrink-0">
                                    <Link href={`/Movies/${latestMovie.id}`}>
                                        <Image
                                            src={latestMovieImage}
                                            alt={latestMovie.title}
                                            className="max-h-100 rounded-lg"
                                            style={{ maxHeight: '100px' }}
                                        />
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="my-8">
                    <h1 className="text-2xl font-bold mb-4">
                        Pourquoi nous sommes les leaders mondiaux :
                    </h1>
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, doloremque modi
                        culpa adipisci quod dolore dignissimos, quas praesentium blanditiis reiciendis
                        voluptatum enim neque atque possimus dolore reprehenderit odio tempore quisquam!
                    </p>
                </div>
            </div>

        </div>
    );
};

export default PresCrit;