import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import MainLayout from "../components/layout/mainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />;
    </MainLayout>
  );
}

export default MyApp;
