import Head from 'next/head';
import NavBarBottom from './NavBarBottom';
import NavBarTop from './NavBarTop';

const MainLayout = ({children}) => {
  return (
      <div className="bg-red-200">
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
          <NavBarTop/>
          <main className="mt-10 mb-10 bg-gray-200">{children}</main>
          <NavBarBottom/>
      </div>
  );
};

export default MainLayout;
