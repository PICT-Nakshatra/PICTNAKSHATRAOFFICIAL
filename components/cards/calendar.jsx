// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import styled from "styled-components";

// // Define the styled components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 40vh;
//   flex-direction: column;
//   background-color: #121212; /* Dark background */
//   color: white; /* White text */
// `;

// const CalendarWrapper = styled.div`
//   max-width: 32rem;
//   width: 100%;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 2.5rem;
//   margin-bottom: 2.5rem;
// `;

// const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.5rem;
//   border-radius: 9999px;
//   background-color: #333333; /* Darker button background */
//   color: white; /* White text */
//   cursor: pointer;
  
//   &:hover {
//     background-color: #555555; /* Lighter hover effect */
//   }
// `;

// const TitleContainer = styled.div`
//   position: relative;
//   width: 10rem;
//   height: 2.5rem;
//   text-align: center;
// `;

// const DayNames = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   gap: 0.5rem;
//   margin-bottom: 0.75rem;
//   text-align: center;
//   font-weight: bold;
//   color: white; /* White text for day names */
// `;

// const CalendarGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr); /* Ensure it's a grid with 7 columns */
//   gap: 0.5rem;
//   position: relative;
//   height: auto; /* Allow height to adjust based on content */
// `;

// const DayBox = styled.div`
//   padding: 0.5rem;
//   border-radius: 0.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   background-color: #222222; /* Dark grey for day boxes */
//   color: white; /* White text color */
//   transition: background-color 0.1s ease, opacity 0.1s ease; /* Smooth hover transition */

//   ${({ currentMonth, isToday, isNextMonth }) =>
//     currentMonth
//       ? isToday
//         ? `
//             background-color: #1a1a1a; /* Dark grey for today */
//             color: white;
//             &:hover {
//               background-color: #0f0f0f; /* Slightly darker grey for hover */
//             }
//           `
//         : `
//             background-color: #222222; /* Dark grey for current month days */
//             &:hover {
//               background-color: #1e1e1e; /* Slightly lighter dark grey for hover */
//             }
//           `
//       : `
//           background-color: #333333; /* Neutral black for next month */
//           color: #9ca3af; /* Grey text for next month's days */
//       `}

//   ${({ isToday }) => isToday && "font-weight: bold;"}
// `;

// const ChevronIcon = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Title = styled.div`
//   font-weight: 700;
//   font-size: 40px;
//   color: ${({ theme }) => theme.text_primary};
//   line-height: 68px;
//     text-align: center;
//     margin-bottom: 40px;

//   @media (max-width: 960px) {
//     text-align: center;
//   }

//   @media (max-width: 960px) {
//     font-size: 40px;
//     line-height: 48px;
//     margin-bottom: 8px;
//   }
// `;

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const getDaysInMonth = (month, year) => {
//   return new Date(year, month + 1, 0).getDate();
// };

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [direction, setDirection] = useState("next");

//   // Get the total days for the current, previous, and next months
//   const daysInCurrentMonth = getDaysInMonth(
//     currentDate.getMonth(),
//     currentDate.getFullYear()
//   );
//   const daysInPreviousMonth = getDaysInMonth(
//     currentDate.getMonth() - 1,
//     currentDate.getFullYear()
//   );

//   // Get the first and last days of the current month
//   const startDayOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   ).getDay();
//   const endDayOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     daysInCurrentMonth
//   ).getDay();

//   // Generate the calendar days including previous and next month days
//   const generateCalendarDays = () => {
//     let daysArray = [];

//     // Add days from the previous month if the month doesn't start on Sunday
//     if (startDayOfMonth > 0) {
//       for (let i = startDayOfMonth - 1; i >= 0; i--) {
//         daysArray.unshift({
//           day: daysInPreviousMonth - i,
//           currentMonth: false, // mark as previous month
//         });
//       }
//     }

//     // Add actual days of the current month
//     for (let day = 1; day <= daysInCurrentMonth; day++) {
//       daysArray.push({
//         day,
//         currentMonth: true,
//       });
//     }

//     // Add days from the next month to complete the week (if necessary)
//     if (endDayOfMonth < 6) {
//       for (let i = 1; i <= 6 - endDayOfMonth; i++) {
//         daysArray.push({
//           day: i,
//           currentMonth: false, // mark as next month
//         });
//       }
//     }

//     return daysArray;
//   };

//   const nextMonth = () => {
//     setDirection("next");
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
//     );
//   };

//   const prevMonth = () => {
//     setDirection("prev");
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
//     );
//   };

//   const calendarDays = generateCalendarDays();

//   return (
//     <>
//     <Title>
//         Gallary
//     </Title>
//     <Container>
//       <CalendarWrapper>
//         {/* Header with month and year */}
//         <Header>
//           <div>
//             <Button onClick={prevMonth}>
//               <ChevronIcon>
//                 <ChevronLeft size={20} />
//               </ChevronIcon>
//             </Button>
//             <Button onClick={nextMonth}>
//               <ChevronIcon>
//                 <ChevronRight size={20} />
//               </ChevronIcon>
//             </Button>
//           </div>
//           <TitleContainer>
//             <AnimatePresence mode="wait">
//               <motion.h2
//                 key={currentDate.toISOString()}
//                 initial={{ y: direction === "next" ? -10 : 10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: direction === "next" ? 10 : -10, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {currentDate.toLocaleString("default", { month: "long" })}{" "}
//                 {currentDate.getFullYear()}
//               </motion.h2>
//             </AnimatePresence>
//           </TitleContainer>
//         </Header>

//         {/* Days of the week */}
//         <DayNames>
//           {daysOfWeek.map((day) => (
//             <div key={day}>{day}</div>
//           ))}
//         </DayNames>

//         {/* Calendar days with animations */}
//         <CalendarGrid>
//           <AnimatePresence mode="wait">
//             {calendarDays.map((date, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ x: direction === "next" ? 50 : -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: direction === "next" ? -50 : 50, opacity: 0 }}
//                 transition={{ duration: 0.1 }}
//               >
//                 <DayBox
//                   currentMonth={date.currentMonth}
//                   isToday={
//                     date.currentMonth &&
//                     date.day === new Date().getDate() &&
//                     currentDate.getMonth() === new Date().getMonth() &&
//                     currentDate.getFullYear() === new Date().getFullYear()
//                   }
//                   isNextMonth={!date.currentMonth}
//                 >
//                   {date.day}
//                 </DayBox>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </CalendarGrid>
//       </CalendarWrapper>
//     </Container>
//     </>
//   );
// };

// export default Calendar;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

// Astronomy events data for 2025
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
  height: 65vh;
  flex-direction: column;
  background-color: #121212; /* Dark background */
  color: white; /* White text */
`;

const CalendarWrapper = styled.div`
  max-width: 32rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #333333; /* Darker button background */
  color: white; /* White text */
  cursor: pointer;

  &:hover {
    background-color: #555555; /* Lighter hover effect */
  }
`;

const TitleContainer = styled.div`
  position: relative;
  width: 10rem;
  height: 2.5rem;
  text-align: center;
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

// const CalendarGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr); /* Ensure it's a grid with 7 columns */
//   gap: 0.5rem;
//   position: relative;
//   height: auto; /* Allow height to adjust based on content */
// `;


const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* Ensure it's a grid with 7 columns */
  gap: 0.5rem;
  position: relative;
  height: auto; /* Allow height to adjust based on content */
  padding-bottom: 20px; /* Add padding to bottom of the grid */
`;

const DayBox = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #222222; /* Dark grey for day boxes */
  color: white; /* White text color */
  transition: background-color 0.1s ease, opacity 0.1s ease; /* Smooth hover transition */

  ${({ currentMonth, isToday, isNextMonth }) =>
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

const ChevronIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  text-align: center;
  margin-bottom: 40px;
`;
const Title2 = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 60px;
  text-align: center;
  margin-bottom: 36px;
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState("next");

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

  return (
    <>
    <Title>
        Astronomy Calender
    </Title>
    <Container>
      <CalendarWrapper>
        {/* Header with month and year */}
        <Header>
          <div>
            <Button onClick={prevMonth}>
              <ChevronIcon>
                <ChevronLeft size={20} />
              </ChevronIcon>
            </Button>
          </div>
          <TitleContainer>
            <Title2>
              {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </Title2>
          </TitleContainer>
          <div>
            <Button onClick={nextMonth}>
              <ChevronIcon>
                <ChevronRight size={20} />
              </ChevronIcon>
            </Button>
          </div>
        </Header>

        {/* Calendar days */}
        <DayNames>
          {daysOfWeek.map((day) => (
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
              >
                {dayObj.day}
                {event && (
                  <div style={{ fontSize: "0.7rem", marginTop: "4px" }}>
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {event.event}
                    </span>
                    <br />
                    {event.details}
                  </div>
                )}
              </DayBox>
            );
          })}
        </CalendarGrid>
      </CalendarWrapper>
    </Container>
    </>
  );
};

export default Calendar;
