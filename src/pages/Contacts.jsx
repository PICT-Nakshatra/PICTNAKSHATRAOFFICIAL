// import React from 'react'
// import styled, { ThemeProvider } from 'styled-components'
// import ContactComponent from '../components/ContactComponent';
// import { teamData } from '../data/constants';
// import MyComponent from '../components/cards/SocialCard';
// const Body = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   width: 100%;
//   height: 150vh;
//   overflow-x: hidden;
//   position: relative;
//   overflow: hidden;
// `;

// const Home = () => {
//   return (
//     <>
//     <Body>
//           <ContactComponent />
//           <MyComponent data = {teamData} />
//     </Body>
//     </>
//   )
// }

// export default Home

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import ContactComponent from "../components/ContactComponent";
import { teamData , webData1 } from "../data/constants";
import MyComponent from "../components/cards/SocialCard";
import TeamWebCard from '../components/cards/webCard'

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 150vh;
  overflow-x: hidden;
  position: relative;
`;

const Title = styled.h2`
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

const Section = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const Home = () => {
  return (
    <Body>
      {/* Contact Section */}
      <ContactComponent />

      {/* Core Team Section */}
      <Section>
        <Title>Core Team</Title>
        <CardsWrapper>
          <MyComponent data={teamData} />
        </CardsWrapper>
      </Section>
      <Section>
        <Title>Developers</Title>
        <CardsWrapper>
          <TeamWebCard data = {webData1} />
        </CardsWrapper>
      </Section>
    </Body>
  );
};

export default Home;
