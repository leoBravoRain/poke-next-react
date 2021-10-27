import Head from 'next/head';

const MainLayout = ({children}) => {
  return (
      <>
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
          <div>Nav bar</div>
          <main>{children}</main>
          <div>footer</div>
      </>
  );
};

export default MainLayout;