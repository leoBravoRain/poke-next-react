import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import MainLayout from "../components/layout/mainLayout";
import "../styles/globals.css";
import {PokemonContextProvider} from "../hooks/context-provider";

function MyApp({ Component, pageProps }) {
  return (
    <PokemonContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
    </PokemonContextProvider>
  );
}

export default MyApp;
