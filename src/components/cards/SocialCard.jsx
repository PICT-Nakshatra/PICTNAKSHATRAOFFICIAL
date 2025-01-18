import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FaLinkedin } from "react-icons/fa";

// Styled Components
const CardContainer = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid #333;
  background: #121212;
  overflow: hidden;
  padding: 20px;
  transition: transform 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 250px;  /* Fixed width for all cards */
  height: 350px; /* Set a fixed height to make the cards uniform */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-10px);
  }
`;

const SpotlightEffect = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  ${({ x, y, opacity, spotlightColor }) =>
    css`
      opacity: ${opacity};
      background: radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%);
    `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #444;
`;

const Name = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

const Title = styled.p`
  font-size: 0.9rem;
  color: #aaa;
`;

const Profession = styled.p`
  font-size: 1rem;
  color: #777;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const LinkedInIcon = styled.a`
  margin-top: 10px;
  color: #0077b5;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #0a66c2;
  }
`;

// SpotlightCard Component
const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <CardContainer
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <SpotlightEffect
        x={position.x}
        y={position.y}
        opacity={opacity}
        spotlightColor={spotlightColor}
      />
      {children}
    </CardContainer>
  );
};

// TeamCards Component
const TeamCards = ({ data }) => {
  return (
    <TeamContainer>
      {data.map((member, index) => (
        <SpotlightCard key={index} spotlightColor="rgba(0, 128, 255, 0.25)">
          <Content>
            <Image src={member.image} alt={member.name} />
            <Name>{member.name}</Name>
            <Title>{member.title}</Title>
            <Profession>{member.desc}</Profession>
            <LinkedInIcon href={member.link} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </LinkedInIcon>
          </Content>
        </SpotlightCard>
      ))}
    </TeamContainer>
  );
};

export default TeamCards;