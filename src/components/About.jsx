import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/use-media-query';
import styled from 'styled-components';

const tabs = [
  {
    title: 'Explore and Discover the Cosmos',
    id: 'improve',
    description:
      'Dive into the wonders of the universe through stargazing sessions, astrophotography, and visits to renowned astronomy-related destinations. From observing celestial alignments to capturing the beauty of distant galaxies, experience the cosmos like never before',
    imageUrl:
      '/wallpaperflare.com_wallpaper (1).jpg',
  },
  {
    title: 'Engage in Hands-On Learning.',
    id: 'important',
    description:
      'Participate in interactive workshops, rocketry design challenges, tech-focused sessions, and exciting astronomy exhibitions. Expand your horizons with guest lectures and discussions led by experts in astronomy and space science.',
    imageUrl:
      'download (1).jpg',
  },
  {
    title: 'Compete, Collaborate, and Connect',
    id: 'same',
    description:
      'Join thrilling competitions like hackathons and rocketry challenges while building a vibrant community of astronomy enthusiasts. Foster friendships, share knowledge, and collaborate with like-minded individuals as we explore the mysteries of space together.',
    imageUrl:
      '/2c9d31c2f013a2af59f9ddbeaf54cc36.jpg',
  },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 0.5rem;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

const TabContainer = styled.div`
  border-radius: 0.25rem;
  grid-column: span 5;

  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const Tab = styled(motion.div)`
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid transparent;

  &.active {
    border: 2px solid ${({ theme }) => theme.primary};
  }

  &.inactive {
    &:hover {
      border-color: #656fe2;
    }
  }
`;

const TabTitle = styled.h3`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  color: white; /* Changed to grey */
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.active {
    background-color: transparent; 
  }

  &.inactive {
    background-color: transparent; 
  }
`;

const TabDescription = styled.p`
  background-color: transparent;
  color: grey;
  padding: 0.75rem;
`;

const TabImage = styled.img`
  margin-bottom: 0.5rem;
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none; /* Hide image on mobile view */
  }
`;

// const ImageContainer = styled(motion.div)`
//   padding: 1rem;
//   height: 400px;
//   overflow: hidden;
//   grid-column: span 7;
//   object-fit: scale-down;
// `;

const ImageContainer = styled(motion.div)`
  grid-column: span 7;
  height: 100%; /* Full height */
  width: 100%; /* Full width */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1rem;
  max-height: 410px;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image fills the container */
  border-radius: 0.5rem; /* Optional: keep the image rounded */
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

function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? index : index);
  };
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
    
        <Title>
            About Nakshatra
        </Title>
    <Container>
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={activeIndex === index ? 'active' : 'inactive'}
            onClick={() => handleClick(index)}
          >
            <TabTitle className={activeIndex === index ? 'active' : 'inactive'}>
              {tab.title}
            </TabTitle>
            <AnimatePresence mode="sync">
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    delay: 0.14,
                  }}
                >
                  <TabDescription>{tab.description}</TabDescription>
                 
                </motion.div>
              )}
            </AnimatePresence>
          </Tab>
        ))}
      </TabContainer>
      <>
        {isDesktop &&
          tabs.map((tab, index) => (
            <AnimatePresence mode="popLayout" key={index}>
              {activeIndex === index && (
                <ImageContainer className="p-4">
                  <motion.img
                    src={tab.imageUrl}
                    alt={tab.title}
                    width={800}
                    height={800}
                    initial={{ opacity: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, overflow: 'hidden' }}
                    exit={{ opacity: 0, overflow: 'hidden' }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                    }}
                  />
                </ImageContainer>
                
              )}
            </AnimatePresence>
          ))}
      </>
    </Container>
    </>
  );
}

export default Index;