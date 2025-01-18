import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero';
import About from '../components/About';
import FAQ from '../components/FAQ'
import Gallary from '../components/Gallary'
import Activities from '../components/Activities';
import Footer from '../components/Footer';
import { items, tabs } from '../data/constants';
import NewsLetter from '../components/NewsLetter';
import Calendar from '../../components/cards/calendar';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Home = () => {
  return (
    <>
    <Body>
          <Hero />
          <About />
          <Gallary items={items}/>
          <Activities />
          <Calendar />
          <NewsLetter />
          <FAQ tabs = {tabs}/>
          <Footer />
        </Body>
    </>
  )
}

export default Home
