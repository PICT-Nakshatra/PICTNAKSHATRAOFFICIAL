import React from "react";
import AnimatedCard from "./AnimatedCard";

const BlogCard = ({ data }) => {
  return (
    <AnimatedCard 
      data={data} 
      type="blog" 
      linkTo={`/blog/${data._id}`}
    />
  );
};

export default BlogCard;