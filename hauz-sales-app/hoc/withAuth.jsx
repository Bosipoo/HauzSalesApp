//hoc -> higher-order component

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import checkTokenExpiration from './checkTokenExpiration';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
      }

      let timer;
      const handleActivity = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          Cookies.remove('token');
          alert('You have been inactive for too long. Please log in again.');
          router.push('/login');
        }, 15 * 60 * 1000); // 15 minutes
      };

      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);

      handleActivity();

      return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keydown', handleActivity);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
