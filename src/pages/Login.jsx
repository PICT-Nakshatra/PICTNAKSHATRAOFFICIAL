
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Body = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
//   overflow: hidden;
//   padding-top: 50px; /* Adjust the padding-top to move the form upwards */
//   background-image : /LoginPage.webp
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   padding: 20px;
//   box-sizing: border-box;
// `;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   max-width: 500px;
//   background-color: rgba(17, 25, 40, 0.83);
//   border: 1px solid rgba(255, 255, 255, 0.125);
//   padding: 36px;
//   border-radius: 12px;
//   box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
//   margin-top: 20px; /* Adjust the margin-top to move the form upwards */
//   gap: 20px;
//   box-sizing: border-box;

//   @media (max-width: 768px) {
//     padding: 24px;
//   }
// `;

// const Title = styled.div`
//   font-size: 32px;
//   font-weight: 600;
//   color: ${({ theme }) => theme.text_primary};
//   text-align: center;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     font-size: 28px;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   background-color: transparent;
//   border: 1px solid ${({ theme }) => theme.text_secondary + 50};
//   outline: none;
//   font-size: 18px;
//   color: ${({ theme }) => theme.text_primary};
//   border-radius: 12px;
//   padding: 12px 16px;
//   margin-bottom: 20px;
//   transition: border-color 0.3s;

//   &:focus {
//     border: 1px solid ${({ theme }) => theme.primary};
//   }

//   @media (max-width: 768px) {
//     font-size: 16px;
//     padding: 10px 14px;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   text-align: center;
//   background: hsla(271, 100%, 50%, 1);
//   padding: 13px 16px;
//   border-radius: 12px;
//   border: none;
//   color: ${({ theme }) => theme.text_primary};
//   font-size: 18px;
//   font-weight: 600;
//   cursor: pointer;
//   margin-top: 10px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: hsla(271, 100%, 60%, 1);
//   }

//   @media (max-width: 768px) {
//     font-size: 16px;
//     padding: 12px 14px;
//   }
// `;

// const TextRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   font-size: 14px;
//   color: ${({ theme }) => theme.text_secondary};
//   margin-top: -8px;
//   cursor: pointer;

//   p {
//     &:hover {
//       text-decoration: underline;
//     }
//   }

//   @media (max-width: 768px) {
//     font-size: 12px;
//   }
// `;

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login");
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [token, setToken] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === "Sign Up") {
//         const response = await axios.post(`${backendUrl}/api/users/register`, {
//           name,
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setCurrentState("Login");
//           toast.success("Registration successful! Please log in.");
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(`${backendUrl}/api/users/login`, {
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem("token", response.data.token);
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token , navigate]);

//   return (
//     <Body>
//       <Container>
//         <Wrapper>
//           <Title>{currentState}</Title>
//           <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
//             {currentState === "Sign Up" && (
//               <Input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 type="text"
//                 placeholder="Name"
//               />
//             )}
//             <Input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type="email"
//               placeholder="Email"
//             />
//             <Input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               placeholder="Password"
//             />
//             <TextRow>
//               <p>Forgot your password?</p>
//               {currentState === "Login" ? (
//                 <p onClick={() => setCurrentState("Sign Up")}>Create Account</p>
//               ) : (
//                 <p onClick={() => setCurrentState("Login")}>Login Here</p>
//               )}
//             </TextRow>
//             <Button type="submit">
//               {currentState === "Login" ? "Sign In" : "Sign Up"}
//             </Button>
//           </form>
//         </Wrapper>
//       </Container>
//     </Body>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RINGS from "vanta/dist/vanta.rings.min"; // Import the specific Vanta effect

const Body = styled.div`
  display: flex;
  justify-content: flex-start; /* Align items to the start horizontally */
  align-items: flex-start; /* Align items to the start vertically */
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  overflow: hidden;
  position: relative; /* Positioning for the Vanta background */
`;

const VantaBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; /* Absolute positioning to cover the entire background */
  top: 0;
  left: 0;
  z-index: 1; /* Ensure it is behind the content */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 36px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  gap: 20px;
  box-sizing: border-box;
  z-index: 2; /* Ensure it is above the Vanta background */
  margin: 150px 0 0 150px; /* Margin to position the container */

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust width for mobile view */
    padding: 24px;
    margin: 20px; /* Adjust margin for mobile view */
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px; /* Adjust font size for mobile view */
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 14px; /* Adjust padding for mobile view */
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: hsla(271, 100%, 60%, 1);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 14px; /* Adjust padding for mobile view */
  }
`;

const TextRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: -8px;
  cursor: pointer;

  p {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for mobile view */
  }
`;

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setCurrentState("Login");
          toast.success("Registration successful! Please log in.");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const vantaEffect = RINGS({
      el: "#vanta-background",
      THREE: THREE,
      color: 0xff6347,
      backgroundColor: 0x1a1a1a,
      mouseControls: true,
      touchControls: true,
      gyroControls: true, // Enable gyroscope controls for more interactivity
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      size: 2.0, // Increase the size of the rings
      lightColor: 0xffffff, // Add light color
      baseColor: 0x000000, // Base color of the rings
      backgroundAlpha: 0.8,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <Body>
      <ToastContainer />
      <VantaBackground id="vanta-background" />
      <Wrapper>
        <Title>{currentState}</Title>
        <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
          {currentState === "Sign Up" && (
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
            />
          )}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
          <TextRow>
            <p>Forgot your password?</p>
            {currentState === "Login" ? (
              <p onClick={() => setCurrentState("Sign Up")}>Create Account</p>
            ) : (
              <p onClick={() => setCurrentState("Login")}>Login Here</p>
            )}
          </TextRow>
          <Button type="submit">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Wrapper>
    </Body>
  );
};

export default Login;