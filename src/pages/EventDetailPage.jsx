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

const EventDetailsPage = () => {
  const { id } = useParams();
  console.log("Event ID:", id);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/events/${id}`);
        console.log("Fetched Event Data:", response.data);
        setEvent(response.data.event); // Accessing the event object directly
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
          <Title>{event.title}</Title> {/* Displaying the title of the event */}
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        </Header>
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
        </EventDetails>
      </Container>
    </Body>
  );
};

export default EventDetailsPage;