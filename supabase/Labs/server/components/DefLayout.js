import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from './Header';


function DefLayout({ children }) {

  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const [session, setSession] = useState(null);

  useEffect(() => {
      const fetchSession = async () => {
          const userSession = supabase.auth.session();
          setSession(userSession);
      };
  }, []);


  return (
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
        {children}
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
  );
}

export default DefLayout;
