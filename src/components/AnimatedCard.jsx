import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ChevronRight } from 'lucide-react';
import { Link as LinkR } from "react-router-dom";

const CardContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 50%,
    #000000 100%);
  padding: 2.5rem;
  border: 1px solid #666666;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  min-height: 500px;
  max-height: 600px;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    border: 1px solid #666666;
  }

  @media only screen and (max-width: 768px) {
    padding: 1.5rem;
    min-height: 450px;
    max-height: 550px;
    gap: 1.5rem;
  }
`;

const ImageStackContainer = styled.div`
  position: relative;
  height: 8rem;
  width: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    height: 6rem;
    width: 6rem;
  }
`;

const StackedImage = styled(motion.img)`
  position: absolute;
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  border: 8px solid white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 768px) {
    height: 6rem;
    width: 6rem;
    border: 6px solid white;
    border-radius: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: center;
  flex-grow: 1;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.875rem;
  color: #ffffff;
  line-height: 1.2;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #e5e5e5;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    -webkit-line-clamp: 2;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const MetaItem = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary || "#888"};
  font-weight: 500;
`;

const ReadMoreButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.primary || "#38a169"};
  color: white;
  border: none;
  width: 100%;
  height: 2.75rem;
  border-radius: 0.5rem;
  padding: 0 2rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: auto;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#2f855a"};
    transform: translateY(-2px);
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
    text-decoration: none;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedCard = ({ 
  data, 
  type = "event", // "event" or "blog"
  linkTo 
}) => {
  const [animate, setAnimate] = useState(false);
  const [frontImage, setFrontImage] = useState(null);

  // Get images from data
  const images = data?.images || [];
  
  // Create image objects with tilt effects
  const imageObjects = images.slice(0, 3).map((image, index) => ({
    title: data?.title || "Image",
    src: image.url,
    tilt: index === 0 ? 0 : index === 1 ? -20 : 10,
  }));

  // If no images, use a placeholder or create a gradient background
  const displayImages = imageObjects.length > 0 ? imageObjects : [
    { 
      title: "Placeholder", 
      src: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#38a169;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2f855a;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" fill="url(#grad)" rx="24"/>
          <text x="64" y="70" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">
            ${type === "event" ? "📅" : "📝"}
          </text>
        </svg>
      `)}`, 
      tilt: 0 
    }
  ];

  const imageAnimationVariant = {
    initial: (index) => ({
      scale: 0,
      x: index === 1 ? -50 : index === 2 ? 50 : 0,
      zIndex: 0,
      opacity: 0,
    }),
    animate: (index) => ({
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.9, 0.1, 0.25, 1],
      },
    }),
    front: {
      scale: 1.1,
      zIndex: 10,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleCardClick = () => {
    setAnimate(false);
    setFrontImage(null);
    setTimeout(() => setAnimate(true), 10);
  };

  const getMetaInfo = () => {
    if (type === "event") {
      return (
        <MetaInfo>
          <MetaItem>📅 {data?.date}</MetaItem>
          <MetaItem>📍 {data?.location}</MetaItem>
          <MetaItem>🕒 {data?.time}</MetaItem>
        </MetaInfo>
      );
    } else {
      return (
        <MetaInfo>
          <MetaItem>✍️ By {data?.author}</MetaItem>
          <MetaItem>📅 {new Date(data?.createdAt).toLocaleDateString()}</MetaItem>
        </MetaInfo>
      );
    }
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={handleCardClick}
    >
      <ImageStackContainer>
        {displayImages.map((image, index) => (
          <StackedImage
            key={index}
            src={image.src}
            alt={image.title}
            style={{
              rotate: image.tilt,
              right: index === 2 ? index * -10 : index * 10,
              top: index >= 1 ? 25 : index * 10,
            }}
            variants={imageAnimationVariant}
            initial="initial"
            animate={
              frontImage === index ? "front" : animate ? "animate" : "initial"
            }
            custom={index}
            onClick={(e) => {
              e.stopPropagation();
              setFrontImage(index);
            }}
          />
        ))}
      </ImageStackContainer>

      <ContentContainer>
        <div>
          <Title>{data?.title}</Title>
          <Description>
            {type === "event" ? data?.description : data?.content}
          </Description>
          {getMetaInfo()}
        </div>

        <ReadMoreButton
          as={LinkR}
          to={linkTo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Read {type === "event" ? "More" : "Story"}
          <IconContainer>
            <ChevronRight size={16} />
          </IconContainer>
        </ReadMoreButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default AnimatedCard;