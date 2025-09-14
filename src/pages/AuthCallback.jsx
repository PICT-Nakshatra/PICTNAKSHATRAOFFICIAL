import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
`;

const Card = styled.div`
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 40px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.text_secondary + 30};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = styled.button`
  background: hsla(271, 100%, 50%, 1);
  color: ${({ theme }) => theme.text_primary};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: hsla(271, 100%, 60%, 1);
  }
`;

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const success = searchParams.get('success');
        const errorParam = searchParams.get('error');

        if (errorParam || success === 'false') {
          setError('Authentication failed. Please try again.');
          toast.error('Authentication failed. Please try again.');
          setLoading(false);
          return;
        }

        if (!token) {
          setError('No authentication token received.');
          toast.error('No authentication token received.');
          setLoading(false);
          return;
        }

        // Store the token
        localStorage.setItem('token', token);
        setToken(token);

        // Fetch user data using the token
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
        const response = await fetch(`${backendUrl}/api/users/token/${token}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        
        if (data.success && data.user) {
          setUser(data.user);
          toast.success('Login successful!');
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          throw new Error(data.message || 'Invalid user data received');
        }

      } catch (error) {
        console.error('OAuth callback error:', error);
        setError('Failed to complete authentication. Please try again.');
        toast.error('Failed to complete authentication. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, setUser, setToken]);

  if (loading) {
    return (
      <Container>
        <Card>
          <Title>Completing Authentication</Title>
          <Message>Please wait while we complete your login...</Message>
          <Spinner />
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <Title>Authentication Failed</Title>
          <Message>{error}</Message>
          <Button onClick={() => navigate('/login')}>
            Back to Login
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Authentication Successful</Title>
        <Message>Redirecting you to the home page...</Message>
        <Spinner />
      </Card>
    </Container>
  );
};

export default AuthCallback;
