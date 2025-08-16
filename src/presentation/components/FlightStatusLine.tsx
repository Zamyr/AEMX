import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

interface FlightStatusLineProps {
  status: 'Arrived' | 'OnTime' | 'Delayed' | 'InTheAir';
}

const StatusLineContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;

const Circle = styled.View`
  width: 9px;
  height: 9px;
  background-color: #000;
  border-radius: 4.5px;
`;

const EndCircle = styled.View`
  width: 9px;
  height: 9px;
  background-color: #000;
  border-radius: 4.5px;
`;

const StatusLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: #000;
  margin: 0 5px;
`;

const DottedStatusLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: transparent;
  border-style: dashed;
  border-width: 1px;
  border-color: #000;
  border-top-width: 1px;
  margin: 0 5px;
`;

const LargeStatusLine = styled.View`
  flex: 2;
  height: 2px;
  background-color: #000;
  margin: 0 5px;
`;

const SmallDottedStatusLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: transparent;
  border-style: dashed;
  border-width: 1px;
  border-color: #000;
  border-top-width: 1px;
  margin: 0 5px;
`;

const PlaneIcon = styled(Image)`
  width: 32px;
  height: 18px;
  align-self: center;
`;

export const FlightStatusLine: React.FC<FlightStatusLineProps> = ({ status }) => {
  return (
    <StatusLineContainer>
      <Circle />
      {status === 'Arrived' ? (
        <>
          <StatusLine />
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <EndCircle />
        </>
      ) : status === 'OnTime' ? (
        <>
        <LargeStatusLine />
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <SmallDottedStatusLine />
          <EndCircle />
        </>
      ) : status === 'Delayed' ? (
        <>
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <DottedStatusLine />
          <EndCircle />
        </>
      ) : (
        <>
          <StatusLine />
          <PlaneIcon 
            source={require('../../../assets/images/icons/plane.png')}
            resizeMode="contain"
          />
          <StatusLine />
          <EndCircle />
        </>
      )}
    </StatusLineContainer>
  );
};
