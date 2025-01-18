import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/EventCard";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg || "#f5f5f5"};
  width: 100%;
  min-height: 95vh;
  padding: 16px;
  overflow-x: hidden;
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

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.cardBackground || "#333"};
    color: ${({ theme }) => theme.text_primary || "#333"};
    border: 1px solid ${({ theme }) => theme.borderColor || "#ddd"};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.activeBg || "black"};
      color: ${({ theme }) => theme.activeText || "#fff"};
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }

  gap: 0.5rem 1rem; /* gap-y-6 corresponds to 1.5rem (24px) in Tailwind, gap-2 corresponds to 0.5rem (8px) */
`;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Event = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    fetch(backendUrl + "/api/events/")
      .then((res) => res.json())
      .then((response) => {
        if (response && Array.isArray(response.events)) {
          setData(response.events);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(data);

  // Filter cards based on the selected filter
  const filteredData = data.filter((event) => event.state === filter);

  return (
    <Body>
       <Title>Events</Title>
      {/* Tabs for filtering events */}
      <Tabs>
        {["upcoming", "ongoing", "completed"].map((state) => (
          <button
            key={state}
            className={filter === state ? "active" : ""}
            onClick={() => setFilter(state)}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)} Events
          </button>
        ))}
      </Tabs>

      {/* Render cards in grid */}
      <GridContainer>
        {filteredData.map((event) => (
          <li key={event.id}>
            <EventCard data={event} />
          </li>
        ))}
      </GridContainer>
    </Body>
  );
};

export default Event;
