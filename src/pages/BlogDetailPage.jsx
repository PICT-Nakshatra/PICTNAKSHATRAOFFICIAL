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

const ImageGallery = styled.div`
  margin-top: 24px;
`;

const GalleryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || "#333"};
  margin-bottom: 16px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MainImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

const MainImageDisplay = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/blogs/${id}`);
        console.log("Fetched Blog Data:", response.data);
        setBlog(response.data); // Assuming the blog data is directly in response.data
        
        // Set the first image as selected by default
        if (response.data?.images?.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
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
        
        {/* Main Image Display */}
        {selectedImage && (
          <MainImage>
            <MainImageDisplay src={selectedImage.url} alt={blog.title} />
          </MainImage>
        )}
        
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
          
          {/* Image Gallery */}
          {blog.images && blog.images.length > 1 && (
            <ImageGallery>
              <GalleryTitle>Blog Gallery</GalleryTitle>
              <ImageGrid>
                {blog.images.map((image, index) => (
                  <GalleryImage
                    key={index}
                    src={image.url}
                    alt={`${blog.title} - Image ${index + 1}`}
                    onClick={() => setSelectedImage(image)}
                    style={{
                      border: selectedImage?.url === image.url ? '3px solid #38a169' : 'none'
                    }}
                  />
                ))}
              </ImageGrid>
            </ImageGallery>
          )}
        </BlogDetails>
      </Container>
    </Body>
  );
};

export default BlogDetailsPage;