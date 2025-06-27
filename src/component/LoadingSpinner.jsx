import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ message = "잠시만 기다려주세요!" }) => {
  return (
    <LoadingContainer>
      <SpinnerWrapper>
        <Spinner />
        <DotContainer>
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </DotContainer>
      </SpinnerWrapper>
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  animation: ${fadeIn} 0.5s ease;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2ecc71;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #2ecc71;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.$delay}s;
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 16px;
`;