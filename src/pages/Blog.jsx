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

const SectionTitle = styled.div`
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  margin: 40px 0 20px 0;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 30px 0 15px 0;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
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

const ComingSoon = styled.div`
  font-size: 44px;
  text-align: center;
  font-weight: 500;
  margin-top: 100px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 60px;
    font-size: 32px;
  }
`;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Blog = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(backendUrl + '/api/blogs/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  console.log(data);

  // Limit to 6 blogs for better layout
  const displayBlogs = data.slice(0, 6);

  return (
    <StarsBackground>
      <Body>
        <Title>Blogs</Title>
        
        {data.length === 0 ? (
          <ComingSoon>Coming Soon...</ComingSoon>
        ) : (
          <SectionContainer>
            <SectionTitle>Latest Blogs</SectionTitle>
            <GridContainer>
              {displayBlogs.map((blog) => (
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