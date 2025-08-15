import React from 'react';
import styled from 'styled-components/native';
import { HeaderStyled } from '../components/HeaderStyled';
import { PanelContainer } from '../components/PanelContainer';

const HomeContainer = styled.View`
  flex: 1;
`;

export const HomeScreen: React.FC = () => {
  return (
    <HomeContainer>
      <HeaderStyled />
      <PanelContainer />
    </HomeContainer>
  );
};
