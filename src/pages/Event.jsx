import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/EventCard";
import StarsBackground from "../components/StarsBackground";
import Lottie from "lottie-react";

const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
`;


const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const SectionTitle = styled.div`
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  margin: 40px 0 20px 0;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 30px 0 15px 0;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`;

const LoaderText = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RocketLoader = styled.div`
  width: 200px;
  height: 200px;
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr; /* Single column on mobile */
  gap: 1rem; /* Reduced gap for better spacing */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); /* Two columns on small screens */
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* Three columns on medium screens */
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Keep 3 columns for better card sizing */
    gap: 2rem;
  }
`;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Event = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rocketAnimation, setRocketAnimation] = useState(null);

  useEffect(() => {
    // Load rocket animation
    fetch("/Rocket_Loader.json")
      .then(response => response.json())
      .then(data => setRocketAnimation(data))
      .catch(error => console.error("Error loading rocket animation:", error));

    // Load events data
    fetch(backendUrl + "/api/events/")
      .then((res) => res.json())
      .then((response) => {
        if (response && Array.isArray(response.events)) {
          setData(response.events);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);
  console.log(data);

  // Filter events by state and limit to 6 cards each
  const upcomingEvents = data.filter((event) => event.state === "upcoming").slice(0, 6);
  const ongoingEvents = data.filter((event) => event.state === "ongoing").slice(0, 6);
  const completedEvents = data.filter((event) => event.state === "completed").slice(0, 6);

  if (loading) {
    return (
      <StarsBackground>
        <Body>
          <Title>Events</Title>
          <LoaderContainer>
            <RocketLoader>
              {rocketAnimation && <Lottie animationData={rocketAnimation} loop={true} />}
            </RocketLoader>
            <LoaderText>Loading Events...</LoaderText>
          </LoaderContainer>
        </Body>
      </StarsBackground>
    );
  }

  return (
    <StarsBackground>
      <Body>
        <Title>Events</Title>
        
        {/* Upcoming Events Section - Only show if there are upcoming events */}
        {upcomingEvents.length > 0 && (
          <SectionContainer>
            <SectionTitle>Upcoming Events</SectionTitle>
            <GridContainer>
              {upcomingEvents.map((event) => (
                <li key={event.id}>
                  <EventCard data={event} />
                </li>
              ))}
            </GridContainer>
          </SectionContainer>
        )}

        {/* Ongoing Events Section - Only show if there are ongoing events */}
        {ongoingEvents.length > 0 && (
          <SectionContainer>
            <SectionTitle>Ongoing Events</SectionTitle>
            <GridContainer>
              {ongoingEvents.map((event) => (
                <li key={event.id}>
                  <EventCard data={event} />
                </li>
              ))}
            </GridContainer>
          </SectionContainer>
        )}

        {/* Completed Events Section - Only show if there are completed events */}
        {completedEvents.length > 0 && (
          <SectionContainer>
            <SectionTitle>Completed Events</SectionTitle>
            <GridContainer>
              {completedEvents.map((event) => (
                <li key={event.id}>
                  <EventCard data={event} />
                </li>
              ))}
            </GridContainer>
          </SectionContainer>
        )}
      </Body>
    </StarsBackground>
  );
};

export default Event;
