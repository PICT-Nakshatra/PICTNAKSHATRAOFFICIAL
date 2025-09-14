import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FiArrowRight, FiMail, FiMapPin, FiUsers, FiZap, FiTarget } from "react-icons/fi";
import { SiLinkedin, SiInstagram, SiYoutube } from "react-icons/si";
import { FaRocket, FaImages } from "react-icons/fa";

const BentoContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.text_primary};
  margin-top: 50px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 960px) {
    font-size: 32px;
    line-height: 48px;
  }
`;

const GridContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  grid-auto-rows: minmax(100px, auto);
`;

const Block = styled(motion.div)`
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.primary + 20};
  background-color: ${({ theme }) => theme.card};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const HeaderBlock = styled(Block)`
  grid-column: span 12;
  grid-row: span 2;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.primary}10);
  border: 2px solid ${({ theme }) => theme.primary};
  
  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

const SocialBlock = styled(Block)`
  grid-column: span 6;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    grid-column: span 3;
  }

  &:hover {
    transform: rotate(2.5deg) scale(1.05);
  }
`;

const AboutBlock = styled(Block)`
  grid-column: span 12;
  text-align: left;
  
  @media (min-width: 768px) {
    grid-column: span 9;
  }
`;

const LocationBlock = styled(Block)`
  grid-column: span 12;
  
  @media (min-width: 768px) {
    grid-column: span 3;
  }
`;

const ActivityBlock = styled(Block)`
  grid-column: span 12;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}15, transparent);
  
  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

const ContactBlock = styled(Block)`
  grid-column: span 12;
  
  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}80);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 24px;
  color: white;
`;

const SocialIcon = styled.div`
  font-size: 2rem;
  color: white;
`;

const ComingSoonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  z-index: 10;
  cursor: not-allowed;
`;

const SocialBlockContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary}cc;
    text-decoration: underline;
  }
`;

const EmailForm = styled.form`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.primary}40;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.primary}cc;
    transform: translateY(-1px);
  }
`;

export const BentoAbout = () => {
  return (
    <BentoContainer>
      <Title>About Nakshatra</Title>
      <GridContainer
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.1,
        }}
      >
        <HeaderBlock
          variants={{
            initial: {
              scale: 0.5,
              y: 50,
              opacity: 0,
            },
            animate: {
              scale: 1,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <Logo>
            <FaRocket />
          </Logo>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "1rem", textAlign: "center" }}>
            Welcome to PICT Nakshatra
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#888", textAlign: "center", maxWidth: "600px" }}>
            The Astronomy Club of PICT. We are a community of astronomy enthusiasts dedicated to exploring the wonders of the universe.
          </p>
          <ContactButton href="/contacts" style={{ marginTop: "1rem" }}>
            Join Our Community <FiArrowRight />
          </ContactButton>
        </HeaderBlock>

        <SocialBlock
          whileHover={{
            rotate: "2.5deg",
            scale: 1.1,
          }}
          style={{ backgroundColor: "#ff0000", cursor: "not-allowed" }}
        >
          <SocialBlockContainer>
            <SocialIcon>
              <SiYoutube />
            </SocialIcon>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "white" }}>YouTube</p>
            <ComingSoonOverlay>
              Coming Soon
            </ComingSoonOverlay>
          </SocialBlockContainer>
        </SocialBlock>

        <SocialBlock
          whileHover={{
            rotate: "-2.5deg",
            scale: 1.1,
          }}
          style={{ backgroundColor: "#8B5CF6" }}
        >
          <a href="/gallery" style={{ color: "white", textDecoration: "none" }}>
            <SocialIcon>
              <FaImages />
            </SocialIcon>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>Gallery</p>
          </a>
        </SocialBlock>

        <SocialBlock
          whileHover={{
            rotate: "-2.5deg",
            scale: 1.1,
          }}
          style={{ backgroundColor: "#E4405F" }}
        >
          <a href="https://www.instagram.com/pict.nakshatra/" style={{ color: "white", textDecoration: "none" }}>
            <SocialIcon>
              <SiInstagram />
            </SocialIcon>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>Instagram</p>
          </a>
        </SocialBlock>

        <SocialBlock
          whileHover={{
            rotate: "2.5deg",
            scale: 1.1,
          }}
          style={{ backgroundColor: "#0077B5" }}
        >
          <a href="https://www.linkedin.com/company/pict-nakshatra/" style={{ color: "white", textDecoration: "none" }}>
            <SocialIcon>
              <SiLinkedin />
            </SocialIcon>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>LinkedIn</p>
          </a>
        </SocialBlock>

        <AboutBlock
          variants={{
            initial: {
              scale: 0.5,
              y: 50,
              opacity: 0,
            },
            animate: {
              scale: 1,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <p style={{ fontSize: "1.5rem", lineHeight: "1.6", margin: 0 }}>
            Our passion is exploring the cosmos.{" "}
            <span style={{ color: "#888" }}>
              We organize stargazing sessions, astrophotography workshops, rocketry challenges, 
              and astronomy exhibitions. Join us as we discover the mysteries of space together 
              through hands-on learning and community collaboration.
            </span>
          </p>
        </AboutBlock>

        <LocationBlock
          variants={{
            initial: {
              scale: 0.5,
              y: 50,
              opacity: 0,
            },
            animate: {
              scale: 1,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <FiMapPin style={{ fontSize: "2rem", marginBottom: "1rem" }} />
          <p style={{ fontSize: "1.1rem", color: "#888", margin: 0 }}>Pune Institute of Computer Technology</p>
        </LocationBlock>

        <ActivityBlock
          variants={{
            initial: {
              scale: 0.5,
              y: 50,
              opacity: 0,
            },
            animate: {
              scale: 1,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
            <FiTarget style={{ fontSize: "2rem", color: "#8B5CF6" }} />
            <FiZap style={{ fontSize: "2rem", color: "#8B5CF6" }} />
            <FiUsers style={{ fontSize: "2rem", color: "#8B5CF6" }} />
          </div>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Our Activities</h3>
          <p style={{ color: "#888", margin: 0 }}>
            Stargazing • Astrophotography • Rocketry • Workshops • Competitions
          </p>
        </ActivityBlock>

        <ContactBlock
          variants={{
            initial: {
              scale: 0.5,
              y: 50,
              opacity: 0,
            },
            animate: {
              scale: 1,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Join our astronomy community</p>
          <EmailForm onSubmit={(e) => e.preventDefault()}>
            <EmailInput
              type="email"
              placeholder="Enter your email"
            />
            <SubmitButton type="submit">
              <FiMail /> Join Us
            </SubmitButton>
          </EmailForm>
        </ContactBlock>
      </GridContainer>
    </BentoContainer>
  );
};

export default BentoAbout;
