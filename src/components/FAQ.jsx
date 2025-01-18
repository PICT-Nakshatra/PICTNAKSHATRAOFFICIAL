'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding-bottom: 2.5rem;
  padding-top: 0.5rem;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 2.25rem; /* Equivalent to text-4xl */
  font-weight: bold;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  color: white;
`;

const FAQContainer = styled.div`
  height: fit-content;
  border: 1px solid;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: black;
  color:grey;
`;

const FAQItem = styled(motion.div)`
  overflow: hidden;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid')};
`;

const FAQButton = styled.button`
  padding: 0.75rem 0.5rem;
  width: 100%;
  cursor: pointer;
  font-size: 0.875rem; /* Equivalent to text-xs */
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  background-color: transparent;
  color: white;

  &:hover {
    background-color:transparent;
  }
`;

const PlusIcon = styled(Plus)`
  transition: transform 0.3s ease-in-out;
  width: 1.25rem; /* Equivalent to w-5 */
  height: 1.25rem; /* Equivalent to h-5 */
  color: white;
  transform: ${({ active }) => (active ? 'rotate(45deg)' : 'rotate(0)')};
`;

const Description = styled(motion.p)`
  padding: 0.75rem;
  font-size: 0.875rem; /* Equivalent to text-xs */
  color: grey;
`;

function Index({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = async (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <Title>FAQ</Title>
      <FAQContainer>
        {tabs.map((tab, index) => (
          <FAQItem key={index} isLast={index === tabs.length - 1}>
            <FAQButton onClick={() => handleClick(index)}>
              <PlusIcon active={activeIndex === index} />
              {tab.title}
            </FAQButton>
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
                  <Description>{tab.description}</Description>
                </motion.div>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </FAQContainer>
    </Container>
  );
}

export default Index;