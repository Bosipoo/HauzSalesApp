import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { login } from '../services/api';
import { Spinner, Button } from 'react-bootstrap';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const router = useRouter();

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.email) formErrors.email = "Email is required";
    if (!formValues.password) formErrors.password = "Password is required";
    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setServerErrors([]);
      try {
        const data = await login(formValues.email, formValues.password);
        Cookies.set('token', data.accessToken, { expires: 1 });
        setLoading(false);
        router.push('/');
      } catch (error) {
        setLoading(false);
        setServerErrors(error.errors || [{ description: error.message }]);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '32rem' }}>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-center text-primary fw-bold">Admin Login</h2>
          <p className="text-center text-muted mb-4">Please enter your login info to continue</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <label className="form-label text-start">Email Address</label>
              <input
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="test@example.com"
              />
              {errors.email && (
                <div className="position-absolute end-0 top-50 translate-middle-y pe-3">
                  <FaExclamationCircle className="text-danger" />
                </div>
              )}
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label text-start">Password</label>
              <input
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Create a password"
              />
              {errors.password && (
                <div className="position-absolute end-0 top-50 translate-middle-y pe-3">
                  <FaExclamationCircle className="text-danger" />
                </div>
              )}
            </div>
            {errors.general && <p className="text-danger">{errors.general}</p>}
            {serverErrors.length > 0 && (
              <div className="alert alert-danger">
                {serverErrors.map((error, index) => (
                  <p key={index}>{error.description}</p>
                ))}
              </div>
            )}
            <p>
              <a href="/signup" className='text-start text-primary pb-2'>Sign Up </a>
              <a href="#" className='text-end text-primary pb-2'> Forgot Password?</a>
            </p>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Login In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
