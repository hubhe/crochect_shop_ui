// LoginForm.tsx

import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { validateEmail, validatePassword } from '../utils/validationUtils';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { email, password });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          isInvalid={!validateEmail(email) && email !== ''}
        />
        {!validateEmail(email) && email !== '' && (
          <Form.Text className="text-muted">Invalid email format</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isInvalid={!validatePassword(password) && password !== ''}
          />
          <InputGroup.Text onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </InputGroup.Text>
        </InputGroup>
        {!validatePassword(password) && password !== '' && (
          <Form.Text className="text-muted">Password must be at least 8 characters long and contain at least one letter and one number</Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
