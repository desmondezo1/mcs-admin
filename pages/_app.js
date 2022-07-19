import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
  return( 
  
  <>
    <ToastContainer />
    <NextNProgress />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
