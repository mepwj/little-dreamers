import React from 'react';
import styled from 'styled-components';
import NewHeader from './NewHeader';

const ModernLayout = ({ children }) => {
  return (
    <Container>
      <NewHeader />
      <MainContent>
        {children}
      </MainContent>
    </Container>
  );
};

export default ModernLayout;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.neutral[50]};
`;

const MainContent = styled.main`
  padding-top: 72px;
  position: relative;
  min-height: calc(100vh - 72px);
`;