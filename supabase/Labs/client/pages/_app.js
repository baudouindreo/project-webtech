import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import { UserProvider } from '../components/UserContext';
import '../styles/global.css';


function MyApp({ Component, pageProps, children }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserProvider>
      <div className="flex flex-col h-screen ">

<header className="h-20 bg-cyan-600 text-2xl flex">

  <div className="flex flex-1 items-center justify-center">
    <Link href="/article">Accueil</Link>
  </div>

  <div className="flex flex-1 items-center justify-center">
    <Link href="/login">login</Link>
  </div>
    
  <div className="flex flex-1 items-center justify-center">
    <Link href="/contacts">Contact</Link>
  </div>

  <div className="flex flex-1 items-center justify-center">
    <Link href="/admin/contacts">admin</Link>
  </div>

  <div className="flex flex-1 items-center justify-center">
  <Header/>

  </div>

</header>

<main className="flex-1">
  
</main>

<footer className="h-20 bg-black text-white">

  <div className="flex items-center justify-center">
    <p>Ceci est le pied de page de l application.</p>
  </div>

  <div className="flex items-center justify-center">
    <p>Tous droits réservés © 2023</p>
  </div>

</footer>

</div>
      </UserProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
