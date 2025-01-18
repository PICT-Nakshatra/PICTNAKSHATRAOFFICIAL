
import React from "react";
import styled from "styled-components";

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
    padding: 12px;
    height: 180px;
    width: 180px;
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

const BlogCard = ({ data }) => {
  return (
    <CardContainer>
      <Title>{data?.title}</Title>
      <Location>{data?.author}</Location>
      <Description>{data?.content}</Description>
    </CardContainer>
  );
};

export default BlogCard;
