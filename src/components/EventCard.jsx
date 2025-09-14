import React from "react";
import AnimatedCard from "./AnimatedCard";

const EventCard = ({ data }) => {
  return (
    <AnimatedCard 
      data={data} 
      type="event" 
      linkTo={`/events/${data._id}`}
    />
  );
};

export default EventCard;