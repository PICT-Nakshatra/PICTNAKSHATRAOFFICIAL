import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Rocket = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF('/Rocket_Take_Off.glb');
  const rocketRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add some animation to the rocket
  useFrame((state) => {
    if (rocketRef.current) {
      // Gentle floating animation
      const adjustedY = isMobile ? position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 : position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      rocketRef.current.position.y = adjustedY;
      // Slow rotation
      rocketRef.current.rotation.y += 0.005;
    }
  });

  // Adjust position for mobile (center the rocket)
  const adjustedPosition = isMobile ? [0, position[1], position[2]] : position;

  return (
    <primitive 
      ref={rocketRef} 
      object={scene} 
      position={adjustedPosition} 
      scale={scale} 
      rotation={rotation}
    />
  );
};

export default Rocket;
