import Head from 'next/head';
import { useEffect, useState } from 'react';
import NavBarBottom from './NavBarBottom';
import NavBarTop from './NavBarTop';

const MainLayout = ({children}) => {
    // states
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        
        const prevTheme = !darkMode ? "dark" : "light";
        const newTheme = darkMode ? "dark" : "light";
    
        const root = window.document.documentElement;
        root.classList.remove(prevTheme);
        root.classList.add(newTheme);
    }, [darkMode]);

    return (
        <div className="dark:bg-black">
            <Head>
                {/* tailwind material resources */}
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
                {/* font awesome */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
                    integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
                    crossOrigin="anonymous"
                />
            </Head>
            <NavBarTop
                changeDarkModeHandler={() => setDarkMode(!darkMode)}
                darkMode={darkMode}
            />
            <main className="pt-16 pb-14 px-4 dark:text-white min-h-screen">{children}</main>
            <NavBarBottom />

        </div>
    );
};

export default MainLayout;
