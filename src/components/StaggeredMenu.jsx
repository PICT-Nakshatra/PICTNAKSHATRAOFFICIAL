import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// Styled Components
const StaggeredMenuWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 40;
`;

const PreLayers = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(260px, 38vw, 420px);
  pointer-events: none;
  z-index: 5;
  
  ${props => props.position === 'left' && `
    right: auto;
    left: 0;
  `}
`;

const PreLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: translateX(0);
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
  pointer-events: none;
  z-index: 20;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 768px) {
    height: 70px;
    padding: 1.5em;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const LogoImg = styled.img`
  display: block;
  height: 48px;
  width: auto;
  object-fit: contain;
  transition: filter 0.3s ease;
  cursor: pointer;
  
  ${props => props.inverted && `
    filter: invert(100%);
  `}
  
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
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  line-height: 1;
  overflow: visible;
  
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
  width: var(--sm-toggle-width, auto);
  min-width: var(--sm-toggle-width, auto);
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
  will-change: transform;
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
  will-change: transform;
`;

const MenuPanel = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(260px, 38vw, 420px);
  height: 100%;
  background: ${({ theme }) => theme.bgLight};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  padding: 6em 2em 2em 2em;
  overflow-y: auto;
  z-index: 10;
  
  ${props => props.position === 'left' && `
    right: auto;
    left: 0;
  `}
  
  @media (max-width: 1024px) {
    width: 100%;
    left: 0;
    right: 0;
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
  
  ${props => props.numbering && `
    counter-reset: smItem;
  `}
`;

const PanelItemWrap = styled.li`
  position: relative;
  overflow: hidden;
  line-height: 1;
`;

const PanelItem = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
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
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  ${props => props.numbering && `
    &::after {
      counter-increment: smItem;
      content: counter(smItem, decimal-leading-zero);
      position: absolute;
      top: 0.1em;
      right: 3.2em;
      font-size: 18px;
      font-weight: 400;
      color: ${props.theme.primary};
      letter-spacing: 0;
      pointer-events: none;
      user-select: none;
      opacity: var(--sm-num-opacity, 0);
    }
  `}
`;

const PanelItemButton = styled.button`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
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
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  ${props => props.numbering && `
    &::after {
      counter-increment: smItem;
      content: counter(smItem, decimal-leading-zero);
      position: absolute;
      top: 0.1em;
      right: 3.2em;
      font-size: 18px;
      font-weight: 400;
      color: ${props.theme.primary};
      letter-spacing: 0;
      pointer-events: none;
      user-select: none;
      opacity: var(--sm-num-opacity, 0);
    }
  `}
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
  color: ${({ theme }) => theme.primary};
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
  
  .sm-socials-link {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  &:hover .sm-socials-link:not(:hover) {
    opacity: 0.35;
  }
  
  &:focus-within .sm-socials-link:not(:focus-visible) {
    opacity: 0.35;
  }
  
  .sm-socials-link:hover,
  .sm-socials-link:focus-visible {
    opacity: 1;
  }
`;

const SocialsItem = styled.li`
  /* No specific styles needed */
`;

const SocialsLink = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  position: relative;
  padding: 2px 0;
  display: inline-block;
  transition: color 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

const LogoutButton = styled.button`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
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
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#1C1E27', '#171721'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/LOGO.png',
  menuButtonColor,
  openMenuButtonColor,
  changeMenuColorOnOpen = true,
  accentColor,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    // Close menu after logout
    if (openRef.current) {
      toggleMenu();
    }
  };

  const handleNavigation = (link) => {
    // Close menu before navigation
    if (openRef.current) {
      toggleMenu();
    }
    // Navigate to the link
    navigate(link);
  };

  const handleLogoClick = () => {
    // Close menu if open
    if (openRef.current) {
      toggleMenu();
    }
    // Navigate to home
    navigate("/");
  };

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor || '#F2F3F4' });
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity']: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' })
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? (openMenuButtonColor || '#F2F3F4') : (menuButtonColor || '#F2F3F4');
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor || '#F2F3F4' });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? (openMenuButtonColor || '#F2F3F4') : (menuButtonColor || '#F2F3F4');
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor || '#F2F3F4' });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  return (
    <StaggeredMenuWrapper className={className} data-position={position} data-open={open || undefined}>
      <PreLayers ref={preLayersRef} position={position} aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1C1E27', '#171721'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => (
            <PreLayer
              key={i}
              className="sm-prelayer"
              style={{ background: c }}
            />
          ));
        })()}
      </PreLayers>

      <Header aria-label="Main navigation header">
        <Logo aria-label="Logo">
          <LogoImg
            src={logoUrl}
            alt="Logo"
            draggable={false}
            width={110}
            height={24}
            inverted={open}
            onClick={handleLogoClick}
          />
        </Logo>

        <ToggleButton
          ref={toggleBtnRef}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <ToggleTextWrap ref={textWrapRef} aria-hidden="true">
            <ToggleTextInner ref={textInnerRef}>
              {textLines.map((l, i) => (
                <ToggleLine key={i}>
                  {l}
                </ToggleLine>
              ))}
            </ToggleTextInner>
          </ToggleTextWrap>

          <Icon ref={iconRef} aria-hidden="true">
            <IconLine ref={plusHRef} />
            <IconLine ref={plusVRef} />
          </Icon>
        </ToggleButton>
      </Header>

      <MenuPanel
        id="staggered-menu-panel"
        ref={panelRef}
        position={position}
        aria-hidden={!open}
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
                <PanelItem to="#" numbering={displayItemNumbering}>
                  <PanelItemLabel className="sm-panel-itemLabel">
                    No items
                  </PanelItemLabel>
                </PanelItem>
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
