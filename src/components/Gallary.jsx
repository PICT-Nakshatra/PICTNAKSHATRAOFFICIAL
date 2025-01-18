'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components
const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 50px;
`;

const CarouselWrapper = styled(motion.div)`
  display: flex;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const CarouselItem = styled(motion.div)`
  min-width: 20rem;
  min-height: 25rem;
  padding: 0.5rem; /* Equivalent to p-2 in Tailwind */
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem; /* Equivalent to rounded-md in Tailwind */
  pointer-events: none;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
    text-align: center;
    margin-bottom: 40px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

function Carousel({ items }) {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
    <Title>
        Gallary
    </Title>
    <CarouselContainer>
      <CarouselWrapper
        ref={carouselRef}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
      >
        {items.slice(0, 8).map((item, index) => (
          <CarouselItem key={index}>
            <CarouselImage
              src={item.url}
              alt={`Carousel Item ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselWrapper>
    </CarouselContainer>
    </>
  );
}

export default Carousel;