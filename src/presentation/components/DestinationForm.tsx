import React from 'react';
import styled from 'styled-components/native';

const FormContainer = styled.View`
  align-items: center;
  margin-top: 62px;
`;

const DestinationText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: #000;
  text-align: center;
`;

export const DestinationForm: React.FC = () => {
  return (
    <FormContainer>
      <DestinationText>Destination Panel - Todo bien!</DestinationText>
    </FormContainer>
  );
};
