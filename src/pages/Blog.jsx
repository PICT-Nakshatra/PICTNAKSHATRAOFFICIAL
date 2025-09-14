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
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  min-height: 95vh;
  padding: 16px;
  overflow-x: hidden;
  
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

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr; /* Single column on mobile */
  gap: 0.5rem 1rem; /* gap-y-6 corresponds to 1.5rem (24px) in Tailwind, gap-2 corresponds to 0.5rem (8px) */

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); /* Two columns on small screens */
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* Three columns on medium screens */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* Four columns on large screens */
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

  return (
    <StarsBackground >
      <Body>
        <Title>Blogs</Title>
        {data.length == 0 ? (<Title1>Coming Soon...</Title1>) : <GridContainer>
          {data.map((blog) => (
            <li key={blog.id}>
              <BlogCard data={blog} />
            </li>
          ))}
        </GridContainer>}
        
      </Body>
    </StarsBackground>
  );
};

export default Blog;