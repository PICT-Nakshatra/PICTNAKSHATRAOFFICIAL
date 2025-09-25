import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin-top: 50px;
  padding: 0 1rem;
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  * {
    font-family: 'Poppins', sans-serif;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 0 auto;
  color: ${({ theme }) => theme.text_primary};
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  margin: 0.5rem auto 0;
  max-width: 32rem;
`;

const GalleryGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 400px;
  width: 100%;
  max-width: 64rem;
  margin: 2.5rem auto 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 1rem;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all 0.5s ease;
  width: 14rem;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 400px;
  cursor: pointer;
  
  &:hover {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    
    &:hover {
      width: 100%;
    }
  }
`;

const GalleryImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  
  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const ImageTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const ImageDescription = styled.p`
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
`;

function ExpandingGallery({ items }) {
  // Use the first 6 items from the gallery data
  const galleryItems = items.slice(0, 6).map((item, index) => ({
    ...item,
    title: [
      "Stargazing Session",
      "Technical Workshop", 
      "Volunteering",
      "Rocketry Assembly",
      "Inter-College Collaboration",
      "Astronomy Exhibition"
    ][index] || `Gallery Item ${index + 1}`,
    description: [
      "Exploring the night sky with our community",
      "Hands-on learning of AI tools and techniques",
      "Collaborating as volunteers to build and launch model rockets",
      "Hands-on assembly and teamwork to build model rockets",
      "Collaborating across colleges to explore astronomy projects and ideas",
      "Showcasing astronomical discoveries"
    ][index] || "A glimpse into our astronomy activities"
  }));

  return (
    <GalleryContainer>
      <Title>Our Latest Creations</Title>
      <Subtitle>
        A visual collection of our most recent works - each piece crafted with intention, emotion, and style.
      </Subtitle>
      <GalleryGrid>
        {galleryItems.map((item, index) => (
          <GalleryItem key={index}>
            <GalleryImage
              src={item.url}
              alt={item.title}
            />
            <Overlay>
              <ImageTitle>{item.title}</ImageTitle>
              <ImageDescription>{item.description}</ImageDescription>
            </Overlay>
          </GalleryItem>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
}

export default ExpandingGallery;
