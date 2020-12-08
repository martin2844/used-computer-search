import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import {Helmet} from "react-helmet";

function MyApp({ Component, pageProps }) {
  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Used Computer Search</title>
                <link rel="canonical" href="https://think.martinchammah.dev" />
            </Helmet>
    <Navbar />
     <Component {...pageProps} />
     <Footer />
    </>
 
  )
}

export default MyApp
