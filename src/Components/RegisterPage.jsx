import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "./FormContainer";
import { auth, db } from "../main";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      db.collection("users")
        .add(formData)
        .then(() => {
          auth.createUserWithEmailAndPassword(formData.email, formData.password);
          alert("Registration successful!");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error registering user: ", error);
        });
    }
    setValidated(true);
  };

  const passwordMatch = formData.password === formData.confirmPassword;

  return (
      <FormContainer>
        <Form
          className="mt-5 mb-5"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h1>Sign Up</h1>

          <Row className="mt-5">
            <Form.Group as={Col} sm="4" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                pattern="[A-Za-z]+"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm="4" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                pattern="[A-Za-z]+"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm="4" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                value={formData.username}
                pattern="[A-Za-z]+"
                onChange={handleChange}
                minLength={3}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid username with only letters, numbers, and
                underscores.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={validated && !/^\S+@\S+\.\S+$/.test(formData.email)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mt-3">
            <Form.Group as={Col} sm controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password with at least 8 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!passwordMatch}
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-3">
            <Form.Group as={Col} sm controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                value={formData.phone}
                pattern="[0-9]{10}"
                placeholder="123-456-7890"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone number in the format 123-456-7890.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select required aria-label="Default select example">
                <option></option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select your gender.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mt-4">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button className="mt-5" type="submit">
            Sign Up
          </Button>
          <Link className="text-align-center" to="/login">
          Already have an account?
        </Link>
        </Form>
      </FormContainer>
  );
};

export default RegisterPage;
