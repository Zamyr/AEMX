import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { usePanelViewModel } from '../viewmodels/usePanelViewModel';
import { FlightForm } from './FlightForm';

const Container = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

const HorizontalLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #D6D6D6;
  margin-top: 23px;
`;

const PanelBox = styled.View`
  height: 45px;
  background-color: white;
  border-radius: 4px;
  border-width: 1px;
  border-color: #D6D6D6;
  padding: 4px;
  position: absolute;

  z-index: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TabButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  height: 37px;
  background-color: ${props => props.isSelected ? '#000000' : 'white'};
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => props.isSelected ? '#D6D6D6' : 'white'}; 
  padding-left: 15px;
  padding-right: 15px;
  justify-content: center;
  align-items: center;
`;

const TabText = styled.Text<{ isSelected: boolean }>`
  color: ${props => props.isSelected ? 'white' : '#000000'};
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
`;

const TabContainer = styled.View`
  flex-direction: row;
  gap: 7px;
`;

export const PanelContainer: React.FC = () => {
  const { selectTab, isTabSelected } = usePanelViewModel();

  return (
    <Container>
      <HorizontalLine />
      <PanelBox>
        <TabContainer>
          <TabButton 
            isSelected={isTabSelected('flightNumber')}
            onPress={() => selectTab('flightNumber')}
          >
            <TabText isSelected={isTabSelected('flightNumber')}>Flight Number</TabText>
          </TabButton>
          <TabButton 
            isSelected={isTabSelected('destination')}
            onPress={() => selectTab('destination')}
          >
            <TabText isSelected={isTabSelected('destination')}>Destination</TabText>
          </TabButton>
        </TabContainer>
      </PanelBox>
      {isTabSelected('flightNumber') && <FlightForm />}
    </Container>
  );
};
