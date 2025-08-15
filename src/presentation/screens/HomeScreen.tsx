import React from 'react';
import styled from 'styled-components/native';
import { HeaderStyled } from '../components/HeaderStyled';
import { PanelContainer } from '../components/PanelContainer';
import { PanelProvider } from '../contexts/PanelContext';

const HomeContainer = styled.View`
  flex: 1;
`;

export const HomeScreen: React.FC = () => {
  return (
    <HomeContainer>
      <HeaderStyled />
      <PanelProvider>
        <PanelContainer />
      </PanelProvider>
    </HomeContainer>
  );
};
