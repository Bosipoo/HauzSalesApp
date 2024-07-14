import '../styles/globals.css';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const noLayoutPages = ['/login', '/signup'];
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (!noLayoutPages.includes(router.pathname)) {
        router.push('/login');
      }
    }
  }, [router.pathname]);

  // Render layout or not based on the current page
  return noLayoutPages.includes(router.pathname) ? (
    <Component {...pageProps} />
  ) : (
    isAuthenticated && (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  );
}

export default MyApp;
