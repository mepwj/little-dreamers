import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NewHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <LogoSection>
          <LogoIcon>
            🍴
          </LogoIcon>
          <LogoText>
            <LogoTitle>꼬망이들</LogoTitle>
            <LogoSubtitle>아동급식카드 가맹점 찾기</LogoSubtitle>
          </LogoText>
        </LogoSection>
        
        <TaglineSection>
          <Tagline>제주도 아이들을 위한 든든한 식사 파트너</Tagline>
        </TaglineSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default NewHeader;

// Styled Components
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: ${props => props.$scrolled 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.$scrolled
    ? 'rgba(0, 0, 0, 0.08)'
    : 'rgba(0, 0, 0, 0.05)'};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 16px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 12px;
  font-size: 20px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
`;

const LogoSubtitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #737373;
  line-height: 1.2;
`;

const TaglineSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tagline = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #737373;
  letter-spacing: -0.02em;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;