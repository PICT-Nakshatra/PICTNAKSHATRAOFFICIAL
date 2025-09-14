// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { backendUrl } from "./Event";

// const Body = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   width: 100%;
//   min-height: 95vh;
//   padding: 16px;
//   overflow-x: hidden;
// `;

// const Container = styled.div`
//   padding: 32px;
//   max-width: 1200px;
//   margin: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 32px;
// `;

// const Title = styled.div`
//   font-size: 24px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.text_primary || "#333"};
//   margin-bottom: 8px;

//   @media only screen and (max-width: 768px) {
//     font-size: 20px;
//   }
// `;

// const BackButton = styled.button`
//   padding: 8px 16px;
//   font-size: 16px;
//   background-color: #38a169;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #2f855a;
//   }
// `;

// const EventDetails = styled.div`
//   background-color: ${({ theme }) => theme.cardBackground};
//   border-radius: 10px;
//   padding: 24px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const EventInfo = styled.div`
//   margin-top: 16px;
// `;

// const InfoItem = styled.div`
//   margin-bottom: 12px;
//   font-size: 18px;
//   color: ${({ theme }) => theme.text_secondary || "#666"};

//   strong {
//     color: ${({ theme }) => theme.text_primary || "#333"};
//   }
// `;

// const EventDescription = styled.p`
//   font-size: 16px;
//   line-height: 1.6;
//   color: ${({ theme }) => theme.text_primary || "#333"};
//   margin-top: 16px;
// `;

// const EventDetailsPage = () => {
//   const { id } = useParams();
//   console.log("Event ID:", id);
//   const [event, setEvent] = useState(null); // Correct initialization
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/events/${id}`);
//         setEvent(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching event details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventDetails();
//   }, [id]);

//   if (loading) {
//     return <Container>Loading event details...</Container>;
//   }

//   if (!event) {
//     return <Container>Event not found.</Container>;
//   }

//   return (
//     <Body>
//       <Container>
//         <Header>
//           <Title>{event._id}</Title>
//           <BackButton onClick={() => navigate(-1)}>Back</BackButton>
//         </Header>
//         <EventDetails>
//           <EventInfo>
//             <InfoItem>
//               <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
//             </InfoItem>
//             <InfoItem>
//               <strong>Location:</strong> {event.location}
//             </InfoItem>
//             <InfoItem>
//               <strong>Time:</strong> {event.time}
//             </InfoItem>
//             <InfoItem>
//               <strong>Status:</strong> {event.state}
//             </InfoItem>
//           </EventInfo>
//           <EventDescription>{event.description}</EventDescription>
//         </EventDetails>
//       </Container>
//     </Body>
//   );
// };

// export default EventDetailsPage;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./Event";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  min-height: 95vh;
  padding: 16px;
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2f855a;
  }
`;

const EventDetails = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EventInfo = styled.div`
  margin-top: 16px;
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary || "#666"};

  strong {
    color: ${({ theme }) => theme.text_primary || "#333"};
  }
`;

const EventDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-top: 16px;
`;

const ImageGallery = styled.div`
  margin-top: 24px;
`;

const GalleryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-bottom: 16px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MainImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

const MainImageDisplay = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventDetailsPage = () => {
  const { id } = useParams();
  console.log("Event ID:", id);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/events/${id}`);
        console.log("Fetched Event Data:", response.data);
        setEvent(response.data.event); // Accessing the event object directly
        
        // Set the first image as selected by default
        if (response.data.event?.images?.length > 0) {
          setSelectedImage(response.data.event.images[0]);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <Container>Loading event details...</Container>;
  }

  if (!event) {
    return <Container>Event not found.</Container>;
  }

  return (
    <Body>
      <Container>
        <Header>
          <Title>{event.title}</Title>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        </Header>
        
        {/* Main Image Display */}
        {selectedImage && (
          <MainImage>
            <MainImageDisplay src={selectedImage.url} alt={event.title} />
          </MainImage>
        )}
        
        <EventDetails>
          <EventInfo>
            <InfoItem>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </InfoItem>
            <InfoItem>
              <strong>Location:</strong> {event.location}
            </InfoItem>
            <InfoItem>
              <strong>Time:</strong> {event.time}
            </InfoItem>
            <InfoItem>
              <strong>Status:</strong> {event.state}
            </InfoItem>
          </EventInfo>
          <EventDescription>{event.longDescription}</EventDescription>
          
          {/* Image Gallery */}
          {event.images && event.images.length > 1 && (
            <ImageGallery>
              <GalleryTitle>Event Gallery</GalleryTitle>
              <ImageGrid>
                {event.images.map((image, index) => (
                  <GalleryImage
                    key={index}
                    src={image.url}
                    alt={`${event.title} - Image ${index + 1}`}
                    onClick={() => setSelectedImage(image)}
                    style={{
                      border: selectedImage?.url === image.url ? '3px solid #38a169' : 'none'
                    }}
                  />
                ))}
              </ImageGrid>
            </ImageGallery>
          )}
        </EventDetails>
      </Container>
    </Body>
  );
};

export default EventDetailsPage;