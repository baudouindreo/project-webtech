import '@/styles/globals.css'
import Nav from "../components/Nav"
import Footer from '@/components/Footer';
import PresCrit from '../components/PresCrit';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import React from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  const router = useRouter();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className='flex flex-col min-h-screen bg-slate-900 text-white'>
        <div className='flex-grow'>
          <Nav />
          {router.pathname === '/' && <PresCrit />}
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </SessionContextProvider>
  );
}
