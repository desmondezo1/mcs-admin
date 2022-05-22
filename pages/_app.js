import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return( 
  
  <>
    <ToastContainer />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
