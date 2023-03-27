import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../main";
import { FormContainer } from "./FormContainer";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.email) {
      formIsValid = false;
      errors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      formIsValid = false;
      errors.password = 'Please enter your password.';
    }

    setFormErrors(errors);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    auth.signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        alert('Login successful!');
        navigate('/completed');
        setFormData({
          email: '',
          password: '',
        });
        setFormErrors({});
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/user-not-found') {
          setFormErrors({ email: 'User not found.' });
        } else if (error.code === 'auth/wrong-password') {
          setFormErrors({ password: 'Incorrect password.' });
        }
      });
  };

  return (
    <FormContainer>
      <Form
        className="mt-5 mb-5"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <Form.Group className="mt-4" as={Col} md controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <div className="text-danger">{formErrors.email}</div>}

        </Form.Group>
        <Form.Group className="mt-3" as={Col} md controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
          
        </Form.Group>

        <Button className="button mt-4" type="submit">
          Login
        </Button>

        <Link className="text-align-center" to="/registration">
          Don't have an account?
        </Link>
      </Form>
    </FormContainer>
  );
};
