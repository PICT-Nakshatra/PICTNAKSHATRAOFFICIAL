// import React, { useRef, useState, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";
// import * as random from "maath/random/dist/maath-random.esm";
// import styled from "styled-components";

// const StyledCanvasWrapper = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: absolute;
//   inset: 0;
// `;

// const Stars = (props) => {
//   const ref = useRef();
//   const [sphere] = useState(() =>
//     random.inSphere(new Float32Array(10000), { radius: 1.5 })
//   );

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10;
//     ref.current.rotation.y -= delta / 15;
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
//         <PointMaterial
//           transparent
//           color="#ff61a6"
//           size={0.002}
//           sizeAttenuation={true}
//           depthWrite={false}
//         />
//       </Points>
//     </group>
//   );
// };

// const StyledStarsCanvas = () => {
//   return (
//     <StyledCanvasWrapper>
//       <Canvas camera={{ position: [0, 0, 2] }} style={{ backgroundColor: "black" }}>
//         <Suspense fallback={null}>
//           <Stars />
//         </Suspense>
//         <Preload all />
//       </Canvas>
//     </StyledCanvasWrapper>
//   );
// };

// export default StyledStarsCanvas;

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
`;

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(10000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ff61a6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Planet = ({ orbitRadius, orbitSpeed, rotationSpeed, color, size, isMoon }) => {
  const ref = useRef();
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2); // Random initial angle
  const [time] = useState(Math.random() * 100); // Random time offset for vertical motion

  // Rotating planet effect and orbiting effect
  useFrame((state) => {
    setAngle((prev) => prev + orbitSpeed);
    
    // Calculate new position
    const x = orbitRadius * Math.cos(angle);
    const z = orbitRadius * Math.sin(angle);
    
    // Vertical oscillation
    const y = Math.sin(state.clock.getElapsedTime() + time) * 0.1; // Adjust amplitude as needed

    ref.current.position.set(x, y, z);
    ref.current.rotation.y += rotationSpeed;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const StyledStarsCanvas = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas camera={{ position: [0, 0, 2] }} style={{ backgroundColor: "black" }}>
        <Suspense fallback={null}>

          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Stars />

          <Planet orbitRadius={0} orbitSpeed={0} rotationSpeed={0.01} color="#FFD700" size={0.2} /> 
          
          <Planet orbitRadius={1} orbitSpeed={0.02} rotationSpeed={0.02} color="#1E90FF" size={0.1} /> 
          
          <Planet orbitRadius={0.5} orbitSpeed={0.05} rotationSpeed={0.05} color="#C0C0C0" size={0.05} /> 
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;

