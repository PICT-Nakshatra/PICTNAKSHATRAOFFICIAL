import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import ContactComponent from '../components/ContactComponent';
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 95vh;
  overflow-x: hidden;
  position: relative;
  overflow: hidden;
`;

const Home = () => {
  return (
    <>
    <Body>
          <ContactComponent />
    </Body>
    </>
  )
}

export default Home

