
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

const BlogCard = ({ data }) => {
  return (
    <CardContainer>
      <Title>{data?.title}</Title>
      <Location>{data?.author}</Location>
      <Description>{data?.content}</Description>
      <ReadMoreLink href= {`/blog/${data._id}`}>
          Read Story
          <IconContainer>
            <ChevronRightIcon className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2" />
          </IconContainer>
        </ReadMoreLink>
    </CardContainer>
  );
};

export default BlogCard;
