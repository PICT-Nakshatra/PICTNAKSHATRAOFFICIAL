import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  max-width: 112rem;
  padding: 1.5rem;
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const CallToActionWrapper = styled.div`
  position: relative;
  isolate: isolate;
  overflow: hidden;
  padding: 6rem 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 1.5rem; /* Tailwind's rounded-2xl */
  @media (min-width: 640px) {
    padding: 6rem;
    border-radius: 1.875rem; /* Tailwind's rounded-3xl */
  }
  @media (min-width: 1280px) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
`;

const Title = styled.h2`
  max-width: 64rem;
  margin: 0 auto;
  text-align: center;
  font-size: 1.875rem; /* Tailwind's text-3xl */
  font-weight: 700; /* Tailwind's font-bold */
  letter-spacing: -0.025em; /* Tailwind's tracking-tight */
  color: #ffffff;
  @media (min-width: 640px) {
    font-size: 2.25rem; /* Tailwind's text-4xl */
  }
`;

const Description = styled.p`
  max-width: 48rem;
  margin: 0.5rem auto 0;
  text-align: center;
  font-size: 1.125rem; /* Tailwind's text-lg */
  line-height: 2rem; /* Tailwind's leading-8 */
  color: #d1d5db; /* Tailwind's text-gray-300 */
`;

const Form = styled.form`
  max-width: 32rem;
  margin: 2.5rem auto 0;
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border-radius: 0.375rem; /* Tailwind's rounded-md */
  border: none;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.625rem 1rem; /* Tailwind's px-3.5 py-2 */
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  font-size: 0.875rem; /* Tailwind's text-sm */
  line-height: 1.5rem; /* Tailwind's leading-6 */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff inset;
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  border-radius: 0.375rem; /* Tailwind's rounded-md */
  background-color: #ffffff;
  padding: 0.625rem 1rem; /* Tailwind's px-3.5 py-2.5 */
  font-size: 0.875rem; /* Tailwind's text-sm */
  font-weight: 600; /* Tailwind's font-semibold */
  color: #1a202c; /* Tailwind's text-gray-900 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7fafc; /* Tailwind's bg-gray-100 */
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

const BackgroundSvg = styled.svg`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -10;
  height: 64rem;
  width: 64rem;
  transform: translate(-50%, -50%);
`;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const NewsLetter = () => {

  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!email) {
            toast.error("Please enter a valid email.");
            return;
        }

        try {
            const response = await axios.post(backendUrl + '/api/newsletter', { email });

            if (response.data.success) {
                toast.success('Subscribed successfully! 🎉');
                setEmail(''); 
            } else {
                toast.error(response.data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };
  return (
    <Container>
      <ToastContainer />
      <CallToActionWrapper>
        <Title>Stellar Updates</Title>
        <Description>
         It is a newsletter that brings you the latest discoveries, news, and insights from the world of research and astronomy.
        </Description>
        <Form onSubmit={onSubmitHandler}>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Notify me</Button>
        </Form>
        <BackgroundSvg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
            </radialGradient>
          </defs>
        </BackgroundSvg>
      </CallToActionWrapper>
    </Container>
  );
};

export default NewsLetter;
