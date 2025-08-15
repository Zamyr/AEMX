import React from 'react';
import styled from 'styled-components/native';
import { HeaderStyled } from './src/presentation/components/HeaderStyled';
import { PanelContainer } from './src/presentation/components/PanelContainer';

const AppContainer = styled.View`
  flex: 1;
`;

function App() {
  return (
    <AppContainer>
      <HeaderStyled />
      <PanelContainer />
    </AppContainer>
  );
}

export default App;
