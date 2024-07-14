import React, { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Spinner, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signUp } from '../services/api';

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const router = useRouter();

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.firstName) formErrors.firstName = "First name is required";
    if (!formValues.lastName) formErrors.lastName = "Last name is required";
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
        const response = await signUp(formValues);
        console.log('Signup successful:', response);
        setLoading(false);
        router.push('/login');
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
      <Row className="w-100" style={{ maxWidth: '32rem' }}>
        <Col className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-primary mb-3">Create Your Admin Account</h2>
          <p className="text-center text-muted mb-4">Please fill the form to create an account</p>
          <Form onSubmit={handleSubmit}>
            {serverErrors.length > 0 && (
              <Alert variant="danger">
                <ul>
                  {serverErrors.map((error, index) => (
                    <li key={index}>{error.description}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
