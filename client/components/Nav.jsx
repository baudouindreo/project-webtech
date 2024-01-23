import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Gravatar from 'react-gravatar';
import Search from './Search';
import Image from 'next/image'; // Import next/image

const Nav = () => {
    const router = useRouter();
    const user = useUser()
    const navigateTo = (route) => {
        router.push(route);
    };
    if (!user) {
        return (
            <nav className="pt-8 text-inherit mb-8">
                <div className='flex items-center justify-between'>
                    <h1 className="text-center text-5xl p-2 flex-grow">Mondial critique</h1>
                    <div className="flex items-center pr-8 w-10 h-10 p-8  mr-8">
                        <Image
                            src={'/imagePP.jpg'}
                            alt=''
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
                <ul className="pt-4 flex justify-around w-90p mx-auto p-0">
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-black transition duration-300" onClick={() => navigateTo('/')}>
                        Accueil
                    </li>
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-black transition duration-300" onClick={() => navigateTo('/article')}>
                        Articles
                    </li>
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-black transition duration-300" onClick={() => navigateTo('/login')}>
                        Login
                    </li>
                    <li>
                        <Search />
                    </li>
                </ul>
                <div className='w-full flex justify-center mt-4'>
                    <div className='border-b-2 w-11/12'></div>
                </div>
            </nav>
        );
    }
    else {
        const userEmail = user.email;
        return (
            <nav className="pt-8 text-inherit mb-8">
                <div className='flex items-center justify-between '>
                    <h1 className="text-center text-5xl p-2 flex-grow ">Mondial critique</h1>
                    <div className="flex items-center pr-8">
                        <Gravatar email={userEmail} />
                    </div>
                </div>
                <ul className="pt-4 flex justify-around w-90p mx-auto p-0">
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:textblack transition duration-300" onClick={() => navigateTo('/')}>
                        Accueil
                    </li>
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:textblack transition duration-300" onClick={() => navigateTo('/article')}>
                        Articles
                    </li>
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:textblack transition duration-300" onClick={() => navigateTo('/login')}>
                        Login
                    </li>
                    <li className=" rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200 hover:textblack transition duration-300" onClick={() => navigateTo('/ManageMovies')}>
                        Manage films
                    </li>
                    <li>
                        <Search />
                    </li>
                </ul>
                <div className='w-full flex justify-center mt-4'>
                    <div className='border-b-2 w-11/12'></div>
                </div>
            </nav>
        )
    }
};
export default Nav;