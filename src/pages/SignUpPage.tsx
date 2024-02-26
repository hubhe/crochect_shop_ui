// SignUpPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import '../styles/styles.css';

const SignUpPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Sign Up</h2>
              <SignUpForm />
              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
