import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, ImageBackground, Animated, PanResponder, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { FlightStatusLine } from '../components/FlightStatusLine';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const CityBackground = styled(ImageBackground)`
  width: 470px;
  height: 100%;
  resizeMode: contain;
  position: absolute;
  bottom: 190px;
  left: 0;
  z-index: 0;
`;

const Header = styled.View`
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
`;

const BackButton = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const ArrowIcon = styled(Image)`
  width: 24px;
  height: 24px;
`;

const BottomCard = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  z-index: 5;
`;

const HandleBar = styled.View`
  width: 36px;
  height: 5px;
  background-color: #ccc;
  border-radius: 2.5px;
  align-self: center;
  margin-top: 5px;
  opacity: 1;
`;

const HandleArea = styled.View`
  padding: 10px 0 20px 0;
  align-items: center;
`;

const InfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const FlightSection = styled.View`
  flex: 1;
`;

const FlightNumberRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const CarrierCode = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.3);
`;

const FlightNumberText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #000;
  margin-left: 4px;
`;

const DateText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  margin-top: 2px;
`;

const StatusSection = styled.View`
  align-items: flex-end;
`;

const StatusBadge = styled.View<{ status: 'Arrived' | 'OnTime' | 'Delayed' }>`
  width: 65px;
  height: 33px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Delayed':
        return '#FECB2F';
      case 'Arrived':
        return '#000';
      case 'OnTime':
        return '#1872B3';
      default:
        return '#000';
    }
  }};
`;

const StatusText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
`;

const DividerLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
`;

const BottomDividerLine = styled.View`
  width: 360px;
  height: 0px;
  border-width: 1px;
  border-color: #E9E9E9;
  opacity: 1;
  align-self: center;
`;

const FlightDetailsSection = styled.View`
  padding: 20px;
`;

const FlightDetailsTitle = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #000;
  text-align: left;
`;

const DepartureSection = styled.View`
  margin-top: 20px;
`;

const DepartureHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DepartureLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DepartureIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const DepartureTitle = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

const CityText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
`;

const InfoCard = styled.View`
  width: 360px;
  height: 58px;
  border-radius: 8px;
  background-color: #F7F7F7;
  padding: 10px 15px;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

const TerminalSection = styled.View`
  flex: 1;
`;

const GateBoardingRow = styled.View`
  flex-direction: row;
  flex: 2;
  gap: 36px;
`;

const GateBoardingSection = styled.View`
  flex: 1;
`;

const ArrivalSection = styled.View`
  margin-top: 20px;
`;

const ArrivalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ArrivalLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ArrivalIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ArrivalTitle = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

const TerminalLabel = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000;
`;

const TerminalValue = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

const FlightStatusContainer = styled.View`
  padding: 0 20px;
  margin-bottom: 10px;
`;

const FlightTimesRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 15px;
`;

const TimeText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 22px;
  color: #000;
`;

const AirportRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const AirportCode = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 14px;
  color: #000;
`;

export const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<DetailNavigationProp>();
  
  const { flightData } = route.params;
  
  const screenHeight = Dimensions.get('window').height;
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomCardHeight = useRef(new Animated.Value(screenHeight * 0.48)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        const newHeight = isExpanded 
          ? screenHeight * 0.7 - gestureState.dy
          : screenHeight * 0.48 - gestureState.dy;
        
        if (newHeight >= screenHeight * 0.48 && newHeight <= screenHeight * 0.7) {
          bottomCardHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const targetHeight = gestureState.dy < -50 
          ? screenHeight * 0.7 
          : screenHeight * 0.48;
        
        const newExpandedState = targetHeight === screenHeight * 0.7;
        setIsExpanded(newExpandedState);
        
        Animated.spring(bottomCardHeight, {
          toValue: targetHeight,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
      },
    }),
  ).current;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatFlightDate = () => {
    // Usar estimatedDepartureTime del flightData si está disponible
    const departureTime = flightData.estimatedDepartureTime || new Date().toISOString();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(departureTime).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '--:--';
    
    // Si viene en formato ISO "2023-11-21T22:14:00", extraer solo HH:MM
    if (timeString.includes('T')) {
      const timePart = timeString.split('T')[1]; // Obtiene "22:14:00"
      return timePart.substring(0, 5); // Obtiene "22:14"
    }
    
    // Si viene en formato "06:24:00", extraer solo HH:MM
    if (timeString.includes(':') && timeString.length >= 5) {
      return timeString.substring(0, 5);
    }
    
    return timeString;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Delayed':
        return 'Delayed';
      case 'Arrived':
        return 'Arrived';
      case 'OnTime':
        return 'On Time';
      default:
        return status;
    }
  };

  const getAirportCityName = (airportCode: string) => {
    const airportNames: { [key: string]: string } = {
      'MEX': 'Ciudad de México - AICM',
      'CUN': 'Cancún - CUN',
    };
    return airportNames[airportCode] || `${airportCode} Airport`;
  };

  return (
    <Container>
      <CityBackground 
        source={require('../../../assets/images/icons/city.png')}
        resizeMode="cover"
      />
      
      <Header>
        <BackButton onPress={handleBackPress}>
          <ArrowIcon source={require('../../../assets/images/icons/arrowleft.png')} />
        </BackButton>
      </Header>
      
      <BottomCard style={{ height: bottomCardHeight }}>
        <HandleArea {...panResponder.panHandlers}>
          <HandleBar />
        </HandleArea>
        
        <InfoHeader>
          <FlightSection>
            <FlightNumberRow>
              <CarrierCode>AM</CarrierCode>
              <FlightNumberText>{flightData.flightCode}</FlightNumberText>
            </FlightNumberRow>
            <DateText>{formatFlightDate()}</DateText>
          </FlightSection>
          
          <StatusSection>
            <StatusBadge status={flightData.status}>
              <StatusText>{getStatusText(flightData.status)}</StatusText>
            </StatusBadge>
          </StatusSection>
        </InfoHeader>
        
        <DividerLine />
        
        <FlightStatusContainer>
          <FlightTimesRow>
            <TimeText>{flightData.departureTime}</TimeText>
            <FlightStatusLine status={flightData.status} />
            <TimeText>{flightData.arrivalTime}</TimeText>
          </FlightTimesRow>
          
          <AirportRow>
            <AirportCode>{flightData.departureAirport}</AirportCode>
            <AirportCode>{flightData.arrivalAirport}</AirportCode>
          </AirportRow>
        </FlightStatusContainer>
        
        <BottomDividerLine />
        
        <FlightDetailsSection>
          <FlightDetailsTitle>Flight details</FlightDetailsTitle>
          
          <DepartureSection>
            <DepartureHeader>
              <DepartureLeft>
                <DepartureIcon source={require('../../../assets/images/icons/Despegue.png')} />
                <DepartureTitle>Departure</DepartureTitle>
              </DepartureLeft>
              <CityText>{getAirportCityName(flightData.departureAirport)}</CityText>
            </DepartureHeader>
            
            <InfoCard>
              <TerminalSection>
                <TerminalLabel>Terminal</TerminalLabel>
                <TerminalValue>{flightData.boardingTerminal || ''}</TerminalValue>
              </TerminalSection>
              <GateBoardingRow>
                <GateBoardingSection>
                  <TerminalLabel>Gate</TerminalLabel>
                  <TerminalValue>{flightData.boardingGate || ''}</TerminalValue>
                </GateBoardingSection>
                <GateBoardingSection>
                  <TerminalLabel>Boarding</TerminalLabel>
                  <TerminalValue>{formatTime(flightData.boardingTime || '--:--')}</TerminalValue>
                </GateBoardingSection>
              </GateBoardingRow>
            </InfoCard>
          </DepartureSection>

          <ArrivalSection>
            <ArrivalHeader>
              <ArrivalLeft>
                <ArrivalIcon source={require('../../../assets/images/icons/Planedown.png')} />
                <ArrivalTitle>Arrival</ArrivalTitle>
              </ArrivalLeft>
              <CityText>Cancún - Terminal 4</CityText>
            </ArrivalHeader>
            
            <InfoCard>
              <TerminalSection>
                <TerminalLabel>Terminal</TerminalLabel>
                <TerminalValue>{flightData.arrivalTerminal || ''}</TerminalValue>
              </TerminalSection>
              <TerminalSection>
                <TerminalLabel>Est. Landing</TerminalLabel>
                <TerminalValue>{formatTime(flightData.arrivalDateTime || '--:--')}</TerminalValue>
              </TerminalSection>
            </InfoCard>
          </ArrivalSection>
        </FlightDetailsSection>
        
      </BottomCard>
    </Container>
  );
};
