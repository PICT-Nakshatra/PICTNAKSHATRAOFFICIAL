import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// Styled Components
const StaggeredMenuWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 40;
  pointer-events: none;
  
  /* Always allow pointer events on header */
  header {
    pointer-events: auto;
  }
  
  /* Menu panel is positioned relative to viewport */
  aside {
    pointer-events: auto;
  }
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
  background: transparent;
  z-index: 20;
  
  @media (max-width: 768px) {
    height: 70px;
    padding: 1.5em;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

const LogoImg = styled.img`
  display: block;
  height: 48px;
  width: auto;
  object-fit: contain;
  transition: filter 0.3s ease;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

const ToggleButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #F2F3F4;
  font-weight: 500;
  line-height: 1;
  overflow: visible;
  font-size: 16px;
  
  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.7);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const ToggleTextWrap = styled.span`
  position: relative;
  margin-right: 0.5em;
  display: inline-block;
  height: 1em;
  overflow: hidden;
  white-space: nowrap;
`;

const ToggleTextInner = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const ToggleLine = styled.span`
  display: block;
  height: 1em;
  line-height: 1;
`;

const Icon = styled.span`
  position: relative;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconLine = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
  
  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

const MenuPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: clamp(260px, 38vw, 420px);
  height: 100vh;
  background: #1C1E27;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  padding: 6em 2em 2em 2em;
  overflow-y: auto;
  z-index: 10;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  
  ${props => props.position === 'left' && `
    right: auto;
    left: 0;
    transform: translateX(-100%);
  `}
  
  @media (max-width: 1024px) {
    width: 100%;
    left: 0;
    right: 0;
    transform: translateX(100%);
  }
  
  &.open {
    transform: translateX(0);
  }
`;

const PanelInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const PanelList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
    counter-reset: smItem;
`;

const PanelItemWrap = styled.li`
  position: relative;
  overflow: hidden;
  line-height: 1;
`;

const PanelItemButton = styled.button`
  position: relative;
  color: #F2F3F4;
  font-weight: 600;
  font-size: 4rem;
  cursor: pointer;
  line-height: 1;
  letter-spacing: -2px;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
  display: inline-block;
  text-decoration: none;
  padding-right: 1.4em;
  background: transparent;
  border: none;
  text-align: left;
  width: 100%;
  
  &:hover {
    color: #854CE6;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const PanelItemLabel = styled.span`
  display: inline-block;
  will-change: transform;
  transform-origin: 50% 100%;
`;

const Socials = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialsTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #854CE6;
`;

const SocialsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialsItem = styled.li`
  /* No specific styles needed */
`;

const SocialsLink = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  color: #F2F3F4;
  text-decoration: none;
  position: relative;
  padding: 2px 0;
  display: inline-block;
  transition: color 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    color: #854CE6;
  }
`;

const LogoutButton = styled.button`
  position: relative;
  color: #F2F3F4;
  font-weight: 600;
  font-size: 4rem;
  cursor: pointer;
  line-height: 1;
  letter-spacing: -2px;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
  display: inline-block;
  text-decoration: none;
  padding-right: 1.4em;
  background: transparent;
  border: none;
  text-align: left;
  width: 100%;
  
  &:hover {
    color: #854CE6;
  }
  
  &::after {
    counter-increment: smItem;
    content: counter(smItem, decimal-leading-zero);
    position: absolute;
    top: 0.1em;
    right: 3.2em;
    font-size: 18px;
    font-weight: 400;
    color: #854CE6;
    letter-spacing: 0;
    pointer-events: none;
    user-select: none;
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StaggeredMenu = ({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#F2F3F4',
  openMenuButtonColor = '#F2F3F4',
  changeMenuColorOnOpen = true,
  colors = ['#1C1E27', '#171721', '#090917'],
  logoUrl = '/LOGO.png',
  accentColor = '#854CE6',
  onMenuOpen,
  onMenuClose,
  className
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const handleNavigation = (link) => {
    setOpen(false);
    navigate(link);
  };

  const handleLogoClick = () => {
    setOpen(false);
    navigate("/");
  };

  const toggleMenu = useCallback(() => {
    const newOpen = !open;
    setOpen(newOpen);
    
    if (newOpen) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
  }, [open, onMenuOpen, onMenuClose]);

  // Add logout item to menu items if authenticated
  const menuItems = [...items].map(item => ({
    ...item,
    onClick: item.link ? () => handleNavigation(item.link) : item.onClick
  }));
  
  if (isAuthenticated) {
    menuItems.push({
      label: 'Logout',
      onClick: handleLogout,
      isButton: true
    });
  } else {
    menuItems.push({
      label: 'Login',
      onClick: () => handleNavigation('/login')
    });
  }

  return (
    <StaggeredMenuWrapper className={className} data-position={position}>
      <Header aria-label="Main navigation header">
        <Logo aria-label="Logo" onClick={handleLogoClick}>
          <LogoImg
            src={logoUrl}
            alt="Logo"
            draggable={false}
            width={110}
            height={24}
          />
        </Logo>

        <ToggleButton
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <ToggleTextWrap aria-hidden="true">
            <ToggleTextInner>
              <ToggleLine>{open ? 'Close' : 'Menu'}</ToggleLine>
            </ToggleTextInner>
          </ToggleTextWrap>

          <Icon aria-hidden="true">
            <IconLine style={{ 
              transform: open ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -50%)' 
            }} />
            <IconLine style={{ 
              transform: open ? 'translate(-50%, -50%) rotate(-45deg)' : 'translate(-50%, -50%) rotate(90deg)' 
            }} />
          </Icon>
        </ToggleButton>
      </Header>

      <MenuPanel
        id="staggered-menu-panel"
        position={position}
        aria-hidden={!open}
        className={open ? 'open' : ''}
      >
        <PanelInner>
          <PanelList role="list" numbering={displayItemNumbering}>
            {menuItems && menuItems.length ? (
              menuItems.map((it, idx) => (
                <PanelItemWrap key={it.label + idx}>
                  {it.isButton ? (
                    <LogoutButton
                      onClick={it.onClick}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <PanelItemLabel className="sm-panel-itemLabel">
                        {it.label}
                      </PanelItemLabel>
                    </LogoutButton>
                  ) : (
                    <PanelItemButton
                      onClick={it.onClick}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      numbering={displayItemNumbering}
                    >
                      <PanelItemLabel className="sm-panel-itemLabel">
                        {it.label}
                      </PanelItemLabel>
                    </PanelItemButton>
                  )}
                </PanelItemWrap>
              ))
            ) : (
              <PanelItemWrap aria-hidden="true">
                <PanelItemButton numbering={displayItemNumbering}>
                  <PanelItemLabel className="sm-panel-itemLabel">
                    No items
                  </PanelItemLabel>
                </PanelItemButton>
              </PanelItemWrap>
            )}
          </PanelList>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <Socials aria-label="Social links">
              <SocialsTitle className="sm-socials-title">Socials</SocialsTitle>
              <SocialsList role="list">
                {socialItems.map((s, i) => (
                  <SocialsItem key={s.label + i}>
                    <SocialsLink
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </SocialsLink>
                  </SocialsItem>
                ))}
              </SocialsList>
            </Socials>
          )}
        </PanelInner>
      </MenuPanel>
    </StaggeredMenuWrapper>
  );
};

export default StaggeredMenu;