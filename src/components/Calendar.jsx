import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";
import axios from "axios";
import { backendUrl } from "../pages/Event";

// Debug: Log the backend URL
console.log("Backend URL:", backendUrl);

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    align-items: stretch;
  }
`;

const CalendarWrapper = styled.div`
  max-width: 48rem;
  width: 100%;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  border: 1px solid #666666;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding: 0.75rem;
    border-radius: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavButton = styled(motion.button)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #333333;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444444;
  }
`;

const MonthYearContainer = styled.div`
  position: relative;
  width: 10rem;
  height: 2.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    width: 8rem;
    height: 2rem;
  }
`;

const MonthYear = styled(motion.h2)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: bold;
`;

const DayHeader = styled.div`
  background-color: #333333;
  color: #888888;
  font-size: 0.875rem;
  padding: 0.5rem 0.25rem;
  border-radius: 0.5rem;
`;

const CalendarGrid = styled.div`
  position: relative;
  height: 28.75rem;
  
  @media (max-width: 768px) {
    height: 20rem;
  }
`;

const CalendarDays = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  text-align: center;
  position: absolute;
  inset: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const DayCell = styled(motion.div)`
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  min-height: 2.5rem;
  color: ${props => {
    if (props.isCurrentDay) return "#ffffff";
    if (props.isCurrentMonth) return "#ffffff";
    return "#666666";
  }};
  background-color: ${props => {
    if (props.isCurrentDay) return "#38a169";
    if (props.isCurrentMonth) return "#333333";
    return "#1a1a1a";
  }};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => {
      if (props.isCurrentDay) return "#2f855a";
      if (props.isCurrentMonth) return "#444444";
      return "#2a2a2a";
    }};
  }
  
  @media (max-width: 768px) {
    padding: 0.25rem;
    min-height: 2rem;
    font-size: 0.875rem;
  }
`;

const EventIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: ${props => props.index * 8 + 2}px;
  width: 6px;
  height: 6px;
  background-color: ${props => props.color || "#38a169"};
  border-radius: 50%;
`;

// EventTooltip removed - events now display below calendar

const EventsSection = styled.div`
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const EventsTitle = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const EventItem = styled.div`
  background-color: #333333;
  border: 1px solid #555555;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const EventTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #cccccc;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const EventTime = styled.span`
  color: #38a169;
  font-weight: 500;
`;

const EventLocation = styled.span`
  color: #888888;
  font-style: italic;
`;

const NoEventsMessage = styled.div`
  text-align: center;
  color: #888888;
  font-style: italic;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Debug: Log the current date
  console.log("Calendar current date:", currentDate);
  console.log("Calendar current month:", currentDate.getMonth()); // 8 = September (0-indexed)
  console.log("Calendar current year:", currentDate.getFullYear());
  const [direction, setDirection] = useState("next");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Fetch calendar events
  useEffect(() => {
    fetchCalendarEvents();
  }, []); // Fetch events only once when component mounts

  // Get the total days for the current, previous, and next months
  const daysInCurrentMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  const daysInPreviousMonth = getDaysInMonth(
    currentDate.getMonth() - 1,
    currentDate.getFullYear()
  );

  // Get the first and last days of the current month
  const startDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const endDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    daysInCurrentMonth
  ).getDay();

  // Generate the calendar days including previous and next month days
  const generateCalendarDays = () => {
    let daysArray = [];

    // Add days from the previous month if the month doesn't start on Sunday
    if (startDayOfMonth > 0) {
      for (let i = startDayOfMonth - 1; i >= 0; i--) {
        daysArray.push({
          day: daysInPreviousMonth - i,
          currentMonth: false,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPreviousMonth - i)
        });
      }
    }

    // Add actual days of the current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      daysArray.push({
        day,
        currentMonth: true,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      });
    }

    // Add days from the next month to complete the week (if necessary)
    if (endDayOfMonth < 6) {
      for (let i = 1; i <= 6 - endDayOfMonth; i++) {
        daysArray.push({
          day: i,
          currentMonth: false,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
        });
      }
    }

    return daysArray;
  };

  const fetchCalendarEvents = async () => {
    try {
      const apiUrl = backendUrl || "http://localhost:4000";
      console.log("Fetching calendar events from:", `${apiUrl}/api/calendar-events`);
      const response = await axios.get(`${apiUrl}/api/calendar-events`);
      console.log("Calendar events response:", response.data);
      setCalendarEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    setDirection("next");
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    // Refresh events when month changes
    fetchCalendarEvents();
  };

  const prevMonth = () => {
    setDirection("prev");
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    // Refresh events when month changes
    fetchCalendarEvents();
  };

  const getEventsForDate = (date) => {
    const events = calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      // Compare dates by year, month, and day only (ignore time)
      const matches = eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
      
      // Debug logging for September 14th
      if (date.getDate() === 14 && date.getMonth() === 8) { // September is month 8 (0-indexed)
        console.log("Checking September 14th:");
        console.log("Event date:", eventDate);
        console.log("Calendar date:", date);
        console.log("Event date string:", eventDate.toDateString());
        console.log("Calendar date string:", date.toDateString());
        console.log("Matches:", matches);
      }
      
      return matches;
    });
    
    // Debug logging for September 14th
    if (date.getDate() === 14 && date.getMonth() === 8) {
      console.log("Events for September 14th:", events);
    }
    
    return events;
  };

  const isCurrentDay = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDayClick = (date) => {
    const events = getEventsForDate(date);
    setSelectedDate(date);
    setSelectedDateEvents(events);
  };

  const calendarDays = generateCalendarDays();

  if (loading) {
    return (
      <CalendarContainer>
        <CalendarWrapper>
          <div style={{ textAlign: 'center', color: '#ffffff', padding: '2rem' }}>
            Loading calendar...
          </div>
        </CalendarWrapper>
      </CalendarContainer>
    );
  }

  return (
    <CalendarContainer>
      <CalendarWrapper>
        {/* Header with month and year */}
        <Header>
          <NavigationButtons>
            <NavButton
              whileTap={{ scale: 0.9 }}
              onClick={prevMonth}
            >
              <ChevronLeft size={20} />
            </NavButton>
            <NavButton
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth}
            >
              <ChevronRight size={20} />
            </NavButton>
          </NavigationButtons>
          <MonthYearContainer>
            <AnimatePresence mode="wait">
              <MonthYear
                key={currentDate.toISOString()}
                initial={{ y: direction === "next" ? -10 : 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direction === "next" ? 10 : -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </MonthYear>
            </AnimatePresence>
          </MonthYearContainer>
        </Header>

        {/* Days of the week */}
        <DaysOfWeek>
          {daysOfWeek.map((day) => (
            <DayHeader key={day}>
              {day}
            </DayHeader>
          ))}
        </DaysOfWeek>

        {/* Calendar days with animations */}
        <CalendarGrid>
          <AnimatePresence mode="wait">
            <CalendarDays
              key={currentDate.toISOString()}
              initial={{ x: direction === "next" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "next" ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {calendarDays.map((date, index) => {
                const dayEvents = getEventsForDate(date.date);
                const isToday = isCurrentDay(date.date);
                
                
                return (
                  <DayCell
                    key={index}
                    isCurrentMonth={date.currentMonth}
                    isCurrentDay={isToday}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => handleDayClick(date.date)}
                  >
                    {date.day}
                    {dayEvents.map((event, idx) => (
                      <EventIndicator 
                        key={idx} 
                        color={event.color} 
                        index={idx}
                      />
                    ))}
                  </DayCell>
                );
              })}
            </CalendarDays>
          </AnimatePresence>
        </CalendarGrid>

        {/* Events Display Section */}
        {selectedDate && (
          <EventsSection>
            <EventsTitle>
              Events for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </EventsTitle>
            {selectedDateEvents.length > 0 ? (
              <EventsList>
                {selectedDateEvents.map((event, idx) => (
                  <EventItem key={idx}>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDetails>
                      <EventTime>Time: {event.time}</EventTime>
                      {event.location && (
                        <EventLocation>Location: {event.location}</EventLocation>
                      )}
                    </EventDetails>
                  </EventItem>
                ))}
              </EventsList>
            ) : (
              <NoEventsMessage>
                No events scheduled for this day.
              </NoEventsMessage>
            )}
          </EventsSection>
        )}
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
