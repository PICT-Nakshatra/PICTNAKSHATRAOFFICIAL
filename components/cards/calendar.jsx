import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled, { createGlobalStyle } from "styled-components";

const astronomyEvents = [
  {
    "date": "2025-01-20",
    "event": "Total Lunar Eclipse",
    "details": "The Moon will be completely covered by the Earth's shadow."
  },
  {
    "date": "2025-03-20",
    "event": "Spring Equinox",
    "details": "The Sun will be directly over the Equator, marking the start of spring in the Northern Hemisphere."
  },
  {
    "date": "2025-04-08",
    "event": "Total Solar Eclipse",
    "details": "A total solar eclipse will be visible from certain locations."
  },
  {
    "date": "2025-08-12",
    "event": "Perseid Meteor Shower",
    "details": "One of the best meteor showers of the year, peaking on this night."
  },
  {
    "date": "2025-12-14",
    "event": "Geminid Meteor Shower",
    "details": "The Geminid meteor shower will peak, offering a great display of meteors."
  }
];

// Define the styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; /* Allow height to adjust based on content */
  flex-direction: column;
  background-color: #121212; /* Dark background */
  color: white; /* White text */
  padding: 20px; /* Add padding for mobile */

  @media (min-width: 1200px) {
    min-height: 75vh;
  }
`;

const CalendarWrapper = styled.div`
  max-width: 90%; /* Use a percentage for better responsiveness */
  width: 100%;
  margin: 0 auto; /* Center the calendar */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem; /* Adjust gap for smaller screens */
  margin-bottom: 1.5rem; /* Adjust margin for smaller screens */
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem; /* Increase padding for touch targets */
  border-radius: 9999px;
  background-color: #333333; /* Darker button background */
  color: white; /* White text */
  cursor: pointer;
  font-size: 1rem; /* Adjust font size for better readability */

  &:hover {
    background-color: #555555; /* Lighter hover effect */
  }
`;

const TitleContainer = styled.div`
  position: relative;
  width: 100%; /* Make it responsive */
  text-align: center; /* Center text */
`;

const DayNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: bold;
  color: white; /* White text for day names */
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  position: relative;
  height: auto; /* Allow height to adjust based on content */
  padding-bottom: 20px; /* Add padding to bottom of the grid */
`;

const DayBox = styled.div`
  padding: 1rem; /* Increase padding for better touch targets */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column; /* Stack day and event details */
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #222222; /* Dark grey for day boxes */
  color: white; /* White text color */
  transition: background-color 0.1s ease, opacity 0.1s ease; /* Smooth hover transition */

  ${({ currentMonth, isToday }) =>
    currentMonth
      ? isToday
        ? `
        background-color: #1a1a1a; /* Dark grey for today */
        color: white;
        &:hover {
          background-color: #0f0f0f; /* Slightly darker grey for hover */
        }
      `
        : `
        background-color: #222222; /* Dark grey for current month days */
        &:hover {
          background-color: #1e1e1e; /* Slightly lighter dark grey for hover */
        }
      `
      : `
      background-color: #333333; /* Neutral black for next month */
      color: #9ca3af; /* Grey text for next month's days */
    `}

  ${({ isToday }) => isToday && "font-weight: bold;"}
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2rem; /* Adjust font size for better readability */
  color: white; /* Use a consistent color */
  line-height: 1.2; /* Adjust line height */
  text-align: center;
  margin-bottom: 20px; /* Adjust margin for smaller screens */
`;

const Title2 = styled.div`
  font-weight: 500;
  font-size: 1.2rem; /* Adjust font size for better readability */
  color: white; /* Use a consistent color */
  line-height: 1.2; /* Adjust line height */
  text-align: center;
  margin-bottom: 20px; /* Adjust margin for smaller screens */
`;

// Media Queries for Responsive Design
const mediaQueries = `
  @media (max-width: 768px) {
    ${Container} {
      padding: 10px; /* Reduce padding for smaller screens */
    }
    ${Button} {
      padding: 0.5rem; /* Adjust button padding */
      font-size: 0.9rem; /* Adjust font size */
    }
    ${Title} {
      font-size: 1.5rem; /* Adjust title font size */
    }
    ${Title2} {
      font-size: 1rem; /* Adjust subtitle font size */
    }
    ${DayBox} {
      padding: 0.75rem; /* Adjust day box padding */
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${mediaQueries}
`;

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState("next");
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event

  // Get the total days for the current, previous, and next months
  const daysInCurrentMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());

  // Get the first and last days of the current month
  const startDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const endDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInCurrentMonth).getDay();

  // Function to check if a date has an astronomy event
  const getEventForDay = (day) => {
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return astronomyEvents.find(event => event.date === formattedDate);
  };

  // Generate the calendar days including previous and next month days
  const generateCalendarDays = () => {
    let daysArray = [];

    // Get the total days in the previous month
    const daysInPreviousMonth = getDaysInMonth(currentDate.getMonth() - 1, currentDate.getFullYear());

    // Add days from the previous month if the month doesn't start on Sunday
    if (startDayOfMonth > 0) {
      for (let i = startDayOfMonth - 1; i >= 0; i--) {
        daysArray.unshift({
          day: daysInPreviousMonth - i,
          currentMonth: false,
        });
      }
    }

    // Add actual days of the current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      daysArray.push({
        day,
        currentMonth: true,
      });
    }

    // Add days from the next month to complete the week (if necessary)
    if (endDayOfMonth < 6) {
      for (let i = 1; i <= 6 - endDayOfMonth; i++) {
        daysArray.push({
          day: i,
          currentMonth: false,
        });
      }
    }

    return daysArray;
  };

  const nextMonth = () => {
    setDirection("next");
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setDirection("prev");
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const calendarDays = generateCalendarDays();

  // Function to handle day click
  const handleDayClick = (dayObj) => {
    const event = getEventForDay(dayObj.day);
    if (event) {
      setSelectedEvent(event); // Set the selected event
    } else {
      setSelectedEvent(null); // Clear the selected event if no event exists
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Include global styles */}
      <Title>Astronomy Calendar</Title>
      <Container>
        <CalendarWrapper>
          {/* Header with month and year */}
          <Header>
            <div>
              <Button onClick={prevMonth}>
                <ChevronLeft size={20} />
              </Button>
            </div>
            <TitleContainer>
              <Title2>
                {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
              </Title2>
            </TitleContainer>
            <div>
              <Button onClick={nextMonth}>
                <ChevronRight size={20} />
              </Button>
            </div>
          </Header>

          {/* Calendar days */}
          <DayNames>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </DayNames>

          <CalendarGrid>
            {calendarDays.map((dayObj, index) => {
              const event = getEventForDay(dayObj.day);
              return (
                <DayBox
                  key={index}
                  currentMonth={dayObj.currentMonth}
                  isToday={dayObj.day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()}
                  onClick={() => handleDayClick(dayObj)} // Handle day click
                >
                  {dayObj.day}
                  {event && (
                    <div style={{ fontSize: "0.7rem", marginTop: "4px" }}>
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {event.event}
                      </span>
                    </div>
                  )}
                </DayBox>
              );
            })}
          </CalendarGrid>

          {/* Event Details Modal */}
          {selectedEvent && (
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
              <h3>{selectedEvent.event}</h3>
              <p>{selectedEvent.details}</p>
              <button onClick={() => setSelectedEvent(null)} style={{ marginTop: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#555', color: 'white', border: 'none', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          )}
        </CalendarWrapper>
      </Container>
    </>
  );
};

export default Calendar;