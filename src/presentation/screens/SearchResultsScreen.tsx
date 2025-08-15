import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const HelloText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-align: center;
`;

export const SearchResultsScreen: React.FC = () => {
  return (
    <Container>
      <HelloText>Hola mundo</HelloText>
    </Container>
  );
};
