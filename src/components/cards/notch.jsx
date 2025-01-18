import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NotchWrapper = styled(motion.div)`
  background-color: #007bff;
  border-radius: ${(props) => (props.isOpen ? "12px" : "50px")};
  height: ${(props) => (props.isOpen ? "240px" : "64px")};
  width: ${(props) => (props.isOpen ? "500px" : "300px")};
  padding: 16px;
  cursor: pointer;
  transition: 0.2s;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-top: ${(props) => (props.isOpen ? "20px" : "0")};
`;

const Title = styled.p`
  font-size: 20px;
  color: #fff;
`;

const ImageWrapper = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: ${(props) => (props.isOpen ? "200px" : "40px")};
  width: ${(props) => (props.isOpen ? "200px" : "40px")};
  transform: translateY(${(props) => (props.isOpen ? "75px" : "0")});
  transition: 0.2s;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${(props) => (props.isOpen ? "none" : "grayscale(100%")};
  transition: all 0.15s;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: opacity 0.15s;
`;

const List = styled(motion.ul)`
  color: #fff;
  margin-top: 24px;
  list-style: none;
`;

const ListItem = styled(motion.li)`
  margin-bottom: 12px;
  font-size: 18px;
`;

const Notch = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const presence = {
    enter: {
      opacity: 0,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleToggle = () => {
    if (isOpen) {
      setShowContent(false);
    } else {
      setIsOpen(true);
      setTimeout(() => setShowContent(true), 50);
    }
  };

  return (
    <Container>
      <NotchWrapper
        whileHover={{
          scale: isOpen ? 1 : 0.95,
        }}
        isOpen={isOpen}
        onClick={handleToggle}
      >
        <Header isOpen={isOpen}>
          <Title>{data.name}</Title>
          <ImageWrapper isOpen={isOpen}>
            <StyledImage
              src={data.image}
              alt={data.profession}
              isOpen={isOpen}
            />
            <Overlay isOpen={isOpen}>Book a call</Overlay>
          </ImageWrapper>
        </Header>
        <AnimatePresence onExitComplete={() => setIsOpen(false)}>
          {showContent && (
            <List
              initial="enter"
              animate="center"
              exit="exit"
              variants={presence}
            >
              {data.links.map((item, index) => (
                <ListItem key={item + index} variants={itemVariants}>
                  {item}
                </ListItem>
              ))}
            </List>
          )}
        </AnimatePresence>
      </NotchWrapper>
    </Container>
  );
};

export default Notch;