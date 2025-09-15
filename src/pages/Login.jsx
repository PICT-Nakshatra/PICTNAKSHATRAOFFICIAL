import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as THREE from "three";
import RINGS from "vanta/dist/vanta.rings.min";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  overflow: hidden;
  position: relative;
`;

const VantaBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 36px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  gap: 20px;
  box-sizing: border-box;
  z-index: 2;
  margin: 150px 0 0 150px;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 24px;
    margin: 20px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: hsla(271, 100%, 60%, 1);
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 14px;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  text-align: center;
  background: #ffffff;
  color: #333;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 14px;
  }
`;

const TextRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: -8px;
  cursor: pointer;

  p {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.text_secondary + 30};
  }

  span {
    padding: 0 15px;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;
  }
`;

// Verification Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: rgba(17, 25, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  text-align: center;
  position: relative;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ModalDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const CodeInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 2px;
  transition: border-color 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ModalButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primary + 'dd'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResendButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.text_secondary + 20};
    color: ${({ theme }) => theme.text_primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Email verification states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let result;
      if (currentState === "Sign Up") {
        // For signup, send verification email instead of direct signup
        result = await sendVerificationEmail(name, email, password);
        if (result.success) {
          setUserEmail(email);
          setShowVerificationModal(true);
          toast.success("Verification code sent to your email!");
        }
      } else {
        console.log('Attempting login with:', { email, password: '***' });
        result = await login(email, password);
        console.log('Login result:', result);
        if (result.success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  // Send verification email
  const sendVerificationEmail = async (name, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        return { success: true };
      } else {
        toast.error(data.message || 'Failed to send verification email');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Send verification error:', error);
      toast.error('Failed to send verification email');
      return { success: false, error: error.message };
    }
  };

  // Verify email code
  const verifyEmailCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setVerifying(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: userEmail, 
          code: verificationCode 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Email verified successfully!');
        setShowVerificationModal(false);
        setVerificationCode('');
        // Now complete the signup process
        const signupResult = await signup(name, userEmail, password);
        if (signupResult.success) {
          navigate("/");
        }
      } else {
        toast.error(data.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  // Resend verification code
  const resendVerificationCode = async () => {
    setResendLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification code resent to your email!');
      } else {
        toast.error(data.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to resend verification code');
    } finally {
      setResendLoading(false);
    }
  };

  // Close verification modal
  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setVerificationCode('');
    setUserEmail('');
  };

  useEffect(() => {
    const vantaEffect = RINGS({
      el: "#vanta-background",
      THREE: THREE,
      color: 0xff6347,
      backgroundColor: 0x1a1a1a,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      size: 2.0,
      lightColor: 0xffffff,
      baseColor: 0x000000,
      backgroundAlpha: 0.8,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <Body>
      <ToastContainer />
      <VantaBackground id="vanta-background" />
      <Wrapper>
        <Title>{currentState}</Title>
        <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
          {currentState === "Sign Up" && (
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
            />
          )}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <TextRow>
            <p>Forgot your password?</p>
            {currentState === "Login" ? (
              <p onClick={() => setCurrentState("Sign Up")}>Create Account</p>
            ) : (
              <p onClick={() => setCurrentState("Login")}>Login Here</p>
            )}
          </TextRow>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : (currentState === "Login" ? "Sign In" : "Sign Up")}
          </Button>
        </form>

        <Divider>
          <span>OR</span>
        </Divider>

        <GoogleButton type="button" onClick={handleGoogleLogin} disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "Loading..." : "Continue with Google"}
        </GoogleButton>
      </Wrapper>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeVerificationModal}>×</CloseButton>
            <ModalTitle>Verify Your Email</ModalTitle>
            <ModalDescription>
              We've sent a 6-digit verification code to <strong>{userEmail}</strong>. 
              Please check your email and enter the code below.
            </ModalDescription>
            
            <CodeInput
              type="text"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              disabled={verifying}
            />
            
            <ModalButton 
              onClick={verifyEmailCode} 
              disabled={verifying || verificationCode.length !== 6}
            >
              {verifying ? 'Verifying...' : 'Verify Email'}
            </ModalButton>
            
            <ResendButton 
              onClick={resendVerificationCode} 
              disabled={resendLoading}
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </ResendButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Body>
  );
};

export default Login;