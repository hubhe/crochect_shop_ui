import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="container">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              <LoginForm />
              <p className="mt-3">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
      </div>
    </div>
  );
};

export default LoginPage;