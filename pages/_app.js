import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import MainLayout from "../components/layout/mainLayout";
import "../styles/globals.css";
import {PokemonContextProvider} from "../hooks/context-provider";

function MyApp({ Component, pageProps }) {
  return (
    <PokemonContextProvider>
      {/* <div className="dark:bg-black h-full"> */}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      {/* </div> */}
    </PokemonContextProvider>
  );
}

export default MyApp;
