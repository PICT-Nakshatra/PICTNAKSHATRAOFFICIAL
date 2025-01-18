

// import React, { useState, useEffect } from "react";
// import { Link as LinkR, useNavigate } from "react-router-dom";
// import styled, { useTheme } from "styled-components";
// import { MenuRounded } from "@mui/icons-material";

// const Nav = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   position: sticky;
//   top: 0;
//   z-index: 10;
//   color: white;
// `;

// const NavbarContainer = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   padding: 0 24px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 1rem;
// `;
// const NavLogo = styled(LinkR)`
//   width: auto;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   img {
//     max-height: 70px; /* Adjust the maximum height of the logo */
//     width: auto; /* Keep the aspect ratio of the logo */
//     object-fit: contain; /* Ensure the logo fits within the container */
//   }
// `;
// const NavItems = styled.ul`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 32px;
//   padding: 0 6px;
//   list-style: none;

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const NavLink = styled.a`
//   color: ${({ theme }) => theme.text_primary};
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;
//   &:hover {
//     color: ${({ theme }) => theme.primary};
//   }
// `;

// const ButtonContainer = styled.div`
//   width: 80%;
//   height: 100%;
//   display: flex;
//   justify-content: end;
//   align-items: center;
//   padding: 0 6px;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const MobileIcon = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.text_primary};
//   display: none;
//   @media screen and (max-width: 768px) {
//     display: block;
//   }
// `;

// const MobileMenu = styled.ul`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   gap: 16px;
//   padding: 0 6px;
//   list-style: none;
//   padding: 12px 40px 24px 40px;
//   background: ${({ theme }) => theme.card_light + 99};
//   position: absolute;
//   top: 80px;
//   right: 0;

//   transition: all 0.6s ease-in-out;
//   transform: ${({ isOpen }) =>
//     isOpen ? "translateY(0)" : "translateY(-100%)"};
//   border-radius: 0 0 20px 20px;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
//   opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
//   z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
// `;
// const AuthButton = styled.a`
//   border: 1px solid ${({ theme }) => theme.primary};
//   color: ${({ theme }) => theme.primary};
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   border-radius: 20px;
//   cursor: pointer;
//   padding: 10px 20px;
//   font-size: 16px;
//   font-weight: 500;
//   transition: all 0.6s ease-in-out;
//   text-decoration: none;
//   &:hover {
//     background: ${({ theme }) => theme.primary};
//     color: ${({ theme }) => theme.text_primary};
//   }
// `;

// const LogoutButton = styled.button`
//   border: 1px solid ${({ theme }) => theme.primary};
//   color: ${({ theme }) => theme.primary};
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   border-radius: 20px;
//   cursor: pointer;
//   padding: 10px 20px;
//   font-size: 16px;
//   font-weight: 500;
//   transition: all 0.6s ease-in-out;
//   background: transparent;
//   border: none;
//   &:hover {
//     background: ${({ theme }) => theme.primary};
//     color: ${({ theme }) => theme.text_primary};
//   }
// `;

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const theme = useTheme();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <Nav>
//       <NavbarContainer>
//         <NavLogo to="/"><img src="/LOGO.png" alt="logo"/></NavLogo>

//         <MobileIcon onClick={() => setIsOpen(!isOpen)}>
//           <MenuRounded style={{ color: theme.text_primary }} />
//         </MobileIcon>

//         <NavItems>
//           <NavLink href="/events">Events</NavLink>
//           <NavLink href="/contacts">Contacts</NavLink>
//           <NavLink href="/blog">Blogs</NavLink>
//         </NavItems>

//         {isOpen && (
//           <MobileMenu isOpen={isOpen}>
//             <NavLink onClick={() => setIsOpen(!isOpen)} href="/events">
//               Events
//             </NavLink>
//             <NavLink onClick={() => setIsOpen(!isOpen)} href="/contacts">
//               Contacts
//             </NavLink>

//             {isLoggedIn ? (
//               <LogoutButton onClick={handleLogout}>
//                 Logout
//               </LogoutButton>
//             ) : (
//               <AuthButton
//                 href="/Login"
//                 target="_blank"
//                 style={{ backgroundColor: isLoggedIn ? theme.primary : 'transparent' }}
//               >
//                 {isLoggedIn ? 'Logout' : 'Log In/Sign Up'}
//               </AuthButton>
//             )}
//           </MobileMenu>
//         )}

//         <ButtonContainer>
//           {isLoggedIn ? (
//             <LogoutButton onClick={handleLogout}>
//               Logout
//             </LogoutButton>
//           ) : (
//             <AuthButton href='/Login' target="_Blank">
//               Log In/Sign Up
//             </AuthButton>
//           )}
//         </ButtonContainer>

//       </NavbarContainer>
//     </Nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(Link)`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 70px; /* Adjust the maximum height of the logo */
    width: auto; /* Keep the aspect ratio of the logo */
    object-fit: contain; /* Ensure the logo fits within the container */
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const AuthButton = styled(Link)`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const LogoutButton = styled.button`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  background: transparent;
  border: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <img src="/LOGO.png" alt="logo" />
        </NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: theme.text_primary }} />
        </MobileIcon>

        <NavItems>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/blog">Blogs</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} to="/events">
              Events
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} to="/contacts">
              Contacts
            </NavLink>

            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <AuthButton
                onClick={() => setIsOpen(!isOpen)}
                to="/login"
              >
                Log In/Sign Up
              </AuthButton>
            )}
          </MobileMenu>
        )}

        <ButtonContainer>
          {isLoggedIn ? (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          ) : (
            <AuthButton to="/login">Log In/Sign Up</AuthButton>
          )}
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
