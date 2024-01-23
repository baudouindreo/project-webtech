import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


function AddMovies() {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageName, setImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageUpload = async () => {
        if (selectedImage && imageName.trim() !== '') {
            const path = `${imageName}`;

            const { data, error } = await supabaseClient.storage
                .from('imageMovie')
                .upload(path, selectedImage);

            if (error) {
                console.error('Erreur lors de l\'upload :', error);
                return;
            }

            console.log('Image téléchargée avec succès :', data);
            return path;
        } else {
            console.error('Veuillez sélectionner une image et spécifier un nom.');
            return null;
        }
    };

    const insertMovie = async (e) => {
        e.preventDefault();
        try {
            const imagePath = await handleImageUpload();
            if (!imagePath) return;

            const { data: movieData, error: movieError } = await supabaseClient
                .from('Movies')
                .insert({
                    author: user.id,
                    title,
                    description,
                    image_path: imagePath,
                });

            if (movieError) {
                throw movieError;
            }
            setTitle('');
            setDescription('');
            setSelectedImage('');
            setImageName('');
            setMessage('Data saved successfully!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        setImageName(name);
    };

    return (
        <div className="form-widget p-4 max-w-md mx-auto">
            <form onSubmit={insertMovie} className="space-y-4">
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-white text-black'
                />
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 text-black'
                />
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <input
                    type="text"
                    placeholder="Nom de l'image"
                    value={imageName}
                    onChange={handleNameChange}
                    className='text-black'
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py2 px-4 rounded-md">Update</button>
            </form>
            {message && <p className="text-white">{message}</p>}
        </div>
    );
}

export default AddMovies;