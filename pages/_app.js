import '../styles/globals.css'
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '../components';
import { ContextProvider } from '../Context/ValContext';
const MyApp = ({ Component, pageProps }) => (
  <ContextProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />

        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer/>
      </div>
      <Script src="https://kit.fontawesome.com/6415f1e928.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </ContextProvider>
);
export default MyApp;