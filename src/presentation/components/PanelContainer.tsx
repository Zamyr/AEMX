import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

const HorizontalLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #D6D6D6;
  margin-top: 53px;
`;

const PanelBox = styled.View`
  width: 280px;
  height: 45px;
  background-color: white;
  border-radius: 4px;
  border-width: 1px;
  border-color: #D6D6D6;
  padding: 4px;
  position: absolute;
  top: 31px;
  z-index: 1;
`;

export const PanelContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <HorizontalLine />
      <PanelBox>
        {children}
      </PanelBox>
    </Container>
  );
};
