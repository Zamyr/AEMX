import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

interface FlightStatusLineProps {
  status: 'Arrived' | 'InTheAir' | 'OnTime' | 'Delayed';
}

const StatusLineContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Circle = styled.View`
  width: 9px;
  height: 9px;
  background-color: #000;
  border-radius: 4.5px;
`;

const StatusLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: #000;
  margin-left: 2px;
`;

const PlaneIcon = styled(Image)`
  width: 35px;
  height: 20px;
  align-self: center;
`;

export const FlightStatusLine: React.FC<FlightStatusLineProps> = ({ status }) => {
  return (
    <StatusLineContainer>
      <Circle />
      <StatusLine />
      {status === 'Arrived' ? (
        <>
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <Circle />
        </>
      ) : (
        <>
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <StatusLine />
          <Circle />
        </>
      )}
    </StatusLineContainer>
  );
};
