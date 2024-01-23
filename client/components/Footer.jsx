import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-700 py-6 flex ">
            <div className=' mx-auto'>
                <p>Author: </p>
                <ul>
                    <li>Baudouin Dréo</li>
                    <li>Thomas Ramade</li>
                    <li>Philéas Barome</li>
                </ul>
            </div>
            <div className=' mx-auto'> 
                <p>Source</p>
                <ul>
                    <li>https://supabase.com/docs</li>
                    <li>https://stackoverflow.com/</li>
                    <li>https://tailwindcss.com/docs/installation</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
