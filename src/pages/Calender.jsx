import React from 'react'
import styled from 'styled-components'
import Calendar from '../../components/cards/calendar';
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 95vh;
  overflow-x: hidden;
  position: relative;
`;
const Calender = () => {
  return (
    <Body>
      <Calendar />
    </Body>
  )
}

export default Calender
