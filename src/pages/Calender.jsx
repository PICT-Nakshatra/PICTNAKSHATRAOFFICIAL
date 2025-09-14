import React from 'react'
import styled from 'styled-components'
import Calendar from '../components/Calendar';
import StarsBackground from '../components/StarsBackground';
const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  padding: 16px;
`;
const Calender = () => {
  return (
    <StarsBackground>
      <Body>
        <Calendar />
      </Body>
    </StarsBackground>
  )
}

export default Calender
