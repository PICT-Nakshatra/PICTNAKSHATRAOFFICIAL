// import React, { use, useEffect, useState } from 'react'
// import styled, { ThemeProvider } from 'styled-components'
// import BlogCard from '../components/BlogCard';
// const Body = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   width: 100%;
//   height: 95vh;
//   overflow-x: hidden;
//   position: relative;
//   overflow: hidden;
// `;

// const Title = styled.div`
//   font-size: 52px;
//   text-align: center;
//   font-weight: 600;
//   margin-top: 20px;
//   color: ${({ theme }) => theme.text_primary};
//   @media (max-width: 768px) {
//     margin-top: 12px;
//     font-size: 32px;
//   }
// `;

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const Blog= () => {

//   const [data,setdata]= useState([]);
//   useEffect(() => {
//     fetch(backendUrl + '/api/blogs/')
//       .then(res => res.json())
//       .then(data => setdata(data))
//   }, [])  

// console.log(data);

//   const allcards = data.map((data) => {
    
//       return (
//         <li key={data.id}> <BlogCard data={data} /></li>
//       )
    
//   })

//   return (
//     <>
//     <Body>
//       <Title>Blogs</Title>
//       <ul>{allcards}</ul>
//     </Body>
//     </>
//   )
// }

// export default Blog


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlogCard from "../components/BlogCard";
import StarsBackground from "../components/StarsBackground";
import Lottie from "lottie-react";

const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
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
const Title1 = styled.div`
  font-size: 44px;
  text-align: center;
  font-weight: 500;
  margin-top: 200px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const SectionContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`;

const LoaderText = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RocketLoader = styled.div`
  width: 200px;
  height: 200px;
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr; /* Single column on mobile */
  gap: 1rem; /* Reduced gap for better spacing */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); /* Two columns on small screens */
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* Three columns on medium screens */
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Keep 3 columns for better card sizing */
    gap: 2rem;
  }
`;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Blog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rocketAnimation, setRocketAnimation] = useState(null);
  
  useEffect(() => {
    // Load rocket animation
    fetch("/Rocket_Loader.json")
      .then(response => response.json())
      .then(data => setRocketAnimation(data))
      .catch(error => console.error("Error loading rocket animation:", error));

    // Load blogs data
    fetch(backendUrl + '/api/blogs/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  if (loading) {
    return (
      <StarsBackground>
        <Body>
          <Title>Blogs</Title>
          <LoaderContainer>
            <RocketLoader>
              {rocketAnimation && <Lottie animationData={rocketAnimation} loop={true} />}
            </RocketLoader>
            <LoaderText>Loading Blogs...</LoaderText>
          </LoaderContainer>
        </Body>
      </StarsBackground>
    );
  }

  return (
    <StarsBackground>
      <Body>
        <Title>Blogs</Title>
        {data.length === 0 ? (
          <Title1>Coming Soon...</Title1>
        ) : (
          <SectionContainer>
            <GridContainer>
              {data.map((blog) => (
                <li key={blog.id}>
                  <BlogCard data={blog} />
                </li>
              ))}
            </GridContainer>
          </SectionContainer>
        )}
      </Body>
    </StarsBackground>
  );
};

export default Blog;