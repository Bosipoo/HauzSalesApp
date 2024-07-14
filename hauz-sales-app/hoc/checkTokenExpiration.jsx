import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

const checkTokenExpiration = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkExpiration = () => {
        const token = Cookies.get('token');
        if (token) {
          try {
            const decoded = decodeToken(token);
            if (decoded.exp * 1000 < Date.now()) {
              Cookies.remove('token');
              alert('Your session has expired. Please log in again.');
              router.push('/login');
            }
          } catch (error) {
            console.error('Failed to decode token', error);
            Cookies.remove('token');
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      };

      checkExpiration();
      const interval = setInterval(checkExpiration, 60000); // Check every 1 minute

      return () => clearInterval(interval);
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default checkTokenExpiration;
