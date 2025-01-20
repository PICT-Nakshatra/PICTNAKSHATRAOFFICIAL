import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./Event"; // Adjust the import based on your project structure

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  min-height: 95vh;
  padding: 16px;
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2f855a;
  }
`;

const BlogDetails = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BlogInfo = styled.div`
  margin-top: 16px;
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary || "#666"};

  strong {
    color: ${({ theme }) => theme.text_primary || "#333"};
  }
`;

const BlogContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-top: 16px;
`;

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/blogs/${id}`);
        console.log("Fetched Blog Data:", response.data);
        setBlog(response.data); // Assuming the blog data is directly in response.data
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <Container>Loading blog details...</Container>;
  }

  if (!blog) {
    return <Container>Blog not found.</Container>;
  }

  return (
    <Body>
      <Container>
        <Header>
          <Title>{blog.title}</Title>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        </Header>
        <BlogDetails>
          <BlogInfo>
            <InfoItem>
              <strong>Author:</strong> {blog.author}
            </InfoItem>
            <InfoItem>
              <strong>Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}
            </InfoItem>
            <InfoItem>
              <strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleDateString()}
            </InfoItem>
          </BlogInfo>
          <BlogContent>{blog.longDescription}</BlogContent>
        </BlogDetails>
      </Container>
    </Body>
  );
};

export default BlogDetailsPage;