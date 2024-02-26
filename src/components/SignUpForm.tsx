// SignUpForm.tsx

import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { validateEmail, validatePassword, validateFullName } from '../utils/validationUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      birthday: date,
    });
  };

  // Calculate the min date (10 years ago from today)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 10);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Signing up with:', { email, password, fullName, birthday, profilePicture });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Form.Group controlId="formBasicFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          isInvalid={!validateFullName(fullName) && fullName !== ''}
        />
        {!validateFullName(fullName) && fullName !== '' && (
          <Form.Text className="text-muted">Invalid full name format</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="birthday">
        <Form.Label>Birthday</Form.Label>
        <DatePicker
          selected={formData.birthday}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          minDate={minDate}
          maxDate={new Date()} // Set max date to today
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15} // Number of years to display in the dropdown
          className="form-control"
        />
      </Form.Group>

      <Form.Group controlId="formBasicProfilePicture">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg, image/png"
          onChange={(e) => setProfilePicture(e.target.files && e.target.files[0])}
          required
        />
      </Form.Group>

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

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            isInvalid={confirmPassword !== password && confirmPassword !== ''}
          />
          <InputGroup.Text onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </InputGroup.Text>
        </InputGroup>
        {confirmPassword !== password && confirmPassword !== '' && (
          <Form.Text className="text-muted">Passwords do not match</Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>

  );
};

export default SignUpForm;
