import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ArticleMovies({ }) {
  const supabase = useSupabaseClient();
  const [listemovies, setListmovies] = useState([]);

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

    async function fetchMovie() {
      try {
        const { data: MoviesData, error } = await supabase
          .from('Movies')
          .select('id, title, description, image_path');

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
          setListmovies(moviesWithImages);
        }
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    }
    fetchMovie();
  }, [supabase]);

  return (
    <div className="form-widget grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {listemovies &&
        listemovies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 transition duration-300 hover:border-4 hover:border-gray-400">
            <Link href={`/Movies/${movie.id}`}>
              <div className="flex">
                <div className="flex-1">
                  <p className="font-bold">Title:</p>
                  <p>{movie.title}</p>
                  <p className="font-bold mt-2">Description:</p>
                  <p>{movie.description}</p>
                </div>
                <div className="flex-shrink-0">
                  {movie.imageUrl && (
                    <Image
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="max-h-100 rounded-lg"
                      style={{ maxHeight: '100px' }}
                    />
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}