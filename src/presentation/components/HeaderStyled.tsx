import React from 'react';
import styled from 'styled-components/native';
import { useHeaderViewModel } from '../viewmodels/useHeaderViewModel';

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const HeaderStyled: React.FC = () => {
  const { title, subtitle } = useHeaderViewModel();

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderContainer>
  );
};
