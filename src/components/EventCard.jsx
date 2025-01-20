// import React, { useRef } from "react";
// import styled from "styled-components";
// import { ChevronRight, ChevronsRight } from 'lucide-react';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-contnet: center;
//   position: rlative;
//   z-index: 1;
//   align-items: center;
// `;

// const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: column;
//   width: 100%;
//   max-width: 1100px;
//   gap: 12px;
//   @media (max-width: 960px) {
//     flex-direction: column;
//   }
// `;
// const Title = styled.div`
//   font-size: 40px;
//   text-align: center;
//   font-weight: 500;
//   margin-top: 20px;
//   color: ${({ theme }) => theme.text_primary};
//   @media (max-width: 768px) {
//     margin-top: 12px;
//     font-size: 32px;
//   }
// `;
// const Desc = styled.div`
//   font-size: 18px;
//   text-align: center;
//   font-weight: 600;
//   color: ${({ theme }) => theme.text_secondary};
//   @media (max-width: 768px) {
//     font-size: 16px;
//   }
// `;

// // const CardContainer = styled.div`
// //   width: 50%;
// //   position: relative;
// //   margin-top: 1rem;
// //   margin-left: auto;
// //   margin-right: auto;
// //   background-color: transparent;
// //   border: 1px solid ${({ theme }) => theme.borderColor || 'transparent'};
// //   border-radius: 0.375rem; /* Equivalent to rounded-md */
// //   color: white;
// //   overflow: hidden;
// //   transition: all 0.3s;
  
// //   &.dark {
// //     background-color: black;
// //     border: 0;
// //     color: white;
// //   }

// //   @media (max-width: 768px) {
// //     width: 90%;
// //   }
// // `;

// const CardContainer = styled.div`
//   width: 50%;
//   position: relative;
//   margin-top: 1rem;
//   margin-left: auto;
//   margin-right: auto;
//   background-color: ${({ theme }) => theme.cardBackground};
//   border: 2px solid ${({ theme }) => theme.borderColor || "grey"}; /* Add a clear border */
//   border-radius: 0.375rem; /* Equivalent to rounded-md */
//   color: ${({ theme }) => theme.cardTextColor || 'black'};
//   overflow: hidden;
//   transition: all 0.3s;
  
//   &.dark {
//     background-color: black;
//     border: 2px solid #2f855a; /* Border color for dark mode */
//     color: white;
//   }

//   @media (max-width: 768px) {
//     width: 90%;
//   }

//   &:hover {
//     border-color: ${({ theme }) => theme.text_primary}; /* Change border color on hover */
//   }
// `;

// const Figure = styled.figure`
//   width: 100%;
//   height: 250px; /* Adjust height as needed */
//   border-radius: 0.375rem; /* Equivalent to rounded-md */
//   overflow: hidden;
// `;

// const StyledImage = styled('img')`
//   height: 100%;
//   width: 100%;
//   transform: scale(1.05);
//   transition: all 0.3s;
//   border-radius: 0.5rem; /* Equivalent to rounded-lg */
//   object-fit: cover;

//   ${CardContainer}:hover & {
//     transform: scale(1);
//   }
// `;

// const Content = styled.div`
//   padding: 1rem;
//   transition: all 0.3s;
//   background-color: transparent;
// `;

// const DateText = styled.span`
//   font-size: 0.875rem; /* Equivalent to text-sm */
//   color : white
// `;

// const Titles = styled.h1`
//   font-size: 1.125rem; /* Equivalent to text-lg */
//   font-weight: 500; /* Equivalent to font-medium */
//   text-transform: capitalize;
// `;


// const ReadMoreLink = styled.a`
//   background-color: #38a169; /* Equivalent to bg-green-400 */
//   width: fit-content;
//   font-size: 1rem; /* Equivalent to text-base */
//   color: ${({ theme }) => theme.linkColor || '#2b6cb0'}; /* Default to blue-600 */
//   border-radius: 0.375rem; /* Equivalent to rounded-md */
//   font-weight: normal;
//   padding: 0.5rem;
//   display: flex;
//   justify-content: center;
//   transition: all 0.3s;
//   align-items: center;

//   &:hover {
//     background-color: #2f855a; /* Darker green on hover */
//   }
// `;

// const IconContainer = styled.span`
//   position: relative;
// `;

// const ChevronRightIcon = styled(ChevronRight)`
//   transition: all 0.3s;
//   align-item: center;
// `;

// const Contact = ({data}) => {
  
  
//   return (
//     <Container id="Education">
//       <CardContainer className="group">
//       <Wrapper>
//         <Title>{data.title}</Title>
//         <Desc
//           style={{
//             marginBottom: "40px",
//           }}
//         >
//           {data.description}
//         </Desc>
//       <Content>
//         <DateText>{data.date}</DateText>
        
//         <ReadMoreLink href="#">
//           Read Story
//           <IconContainer>
//             <ChevronRightIcon className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2" />
            
//           </IconContainer>
//         </ReadMoreLink>
//       </Content>
//       </Wrapper>
//     </CardContainer>
//     </Container>
//   );
// };

// export default Contact;

import React from "react";
import styled from "styled-components";
import { ChevronRight } from 'lucide-react';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor || "#ddd"};
  border-radius: 10px;
  padding: 16px;
  width: 300px; /* Fixed width for square shape */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  @media only screen and (max-width: 768px) {
    padding: 15px;
    width: 300px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Date = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || "#666"};
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-top: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Location = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary || "#888"};
`;

const ReadMoreLink = styled.a`
  background-color: #38a169; /* Equivalent to bg-green-400 */
  width: fit-content;
  font-size: 0.9rem; /* Equivalent to text-base */ 
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  font-weight: normal;
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  transition: all 0.3s;
  align-items: center;
  margin-top: auto;
  

  &:hover {
    background-color: #2f855a; /* Darker green on hover */
  }
`;

const IconContainer = styled.span`
  position: relative;
`;

const ChevronRightIcon = styled(ChevronRight)`
  transition: all 0.3s;
  justify-content : center;
  display : flex;
  align-item: center;
`;

const EventCard = ({ data }) => {
  return (
    <CardContainer>
      <Title>{data?.title}</Title>
      <Date>{data?.date}</Date>
      <Location>{data?.location}</Location>
      <Description>{data?.description}</Description>
      <ReadMoreLink href= {`/events/${data._id}`}>
          Read Story
          <IconContainer>
            <ChevronRightIcon className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2" />
          </IconContainer>
        </ReadMoreLink>
    </CardContainer>
  );
};

export default EventCard;
