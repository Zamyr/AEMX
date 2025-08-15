import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, FlatList } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { FlightStatusLine } from '../components/FlightStatusLine';

type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;
type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;

type FlightItemData = {
  id: string;
  status: 'Arrived' | 'OnTime' | 'Delayed';
  departureTime: string;
  arrivalTime: string;
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  padding: 20px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 15px;
`;

const ArrowIcon = styled(Image)`
  width: 31px;
  height: 31px;
`;

const FlightInfo = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const FlightNumber = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 32px;
  line-height: 28px;
  color: #000;
`;

const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const DateText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000;
`;

const Separator = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000;
  margin: 0 10px;
`;

const ChangeSection = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const CalendarSmallIcon = styled(Image)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const ChangeText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  text-decoration-line: underline;
`;

const RouteSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding: 0 20px;
`;

const RouteText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

const ResultsText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
`;

const FlightList = styled(FlatList<FlightItemData>)`
  margin-top: 20px;
  padding: 0 20px;
` as new () => FlatList<FlightItemData>;

const FlightItem = styled.View`
  width: 360px;
  height: 122px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #000;
  margin-bottom: 15px;
  position: relative;
  padding: 15px;
`;

const StatusBadge = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 28px;
  padding: 4px 20px 4px 15px;
  background-color: #000;
  border-bottom-right-radius: 20px;
  justify-content: center;
`;

const StatusText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 11px;
  line-height: 20px;
  color: #fff;
`;

const FlightTimesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  gap: 15px;
`;

const TimeText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;
  color: #000;
`;

const FlightDetailsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
`;

const AirportCode = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #000;
`;

const FlightDurationContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const FlightDuration = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  color: rgba(0, 0, 0, 0.4);
`;

const SeparatorLine = styled.View`
  position: absolute;
  bottom: 23px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BottomRow = styled.View`
  position: absolute;
  bottom: 1px;
  left: 15px;
  right: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlightNumberBottom = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #000;
`;

const DetailsText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 11px;
  line-height: 18px;
  color: #000;
  text-decoration-line: underline;
`;

export const SearchResultsScreen: React.FC = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const navigation = useNavigation<SearchResultsNavigationProp>();
  
  const { flightNumber, selectedDate } = route.params;

  const flightData = [
    {
      id: '1',
      status: 'Arrived' as const,
      departureTime: '06:24',
      arrivalTime: '09:21',
    },
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChangeDate = () => {
    navigation.goBack();
  };

  const renderFlightItem = ({ item }: { item: FlightItemData }) => (
    <FlightItem>
      <StatusBadge>
        <StatusText>{item.status}</StatusText>
      </StatusBadge>
      <FlightTimesRow>
        <TimeText>{item.departureTime}</TimeText>
        <FlightStatusLine status={item.status} />
        <TimeText>{item.arrivalTime}</TimeText>
      </FlightTimesRow>
      <FlightDetailsRow>
        <AirportCode>MEX</AirportCode>
        <FlightDurationContainer>
          <FlightDuration>2h 28m</FlightDuration>
        </FlightDurationContainer>
        <AirportCode>CUN</AirportCode>
      </FlightDetailsRow>
      <SeparatorLine />
      <BottomRow>
        <FlightNumberBottom>AM{flightNumber}</FlightNumberBottom>
        <DetailsText>Details</DetailsText>
      </BottomRow>
    </FlightItem>
  );

  return (
    <Container>
      <Header>
        <HeaderRow>
          <LeftSection>
            <BackButton onPress={handleBackPress}>
              <ArrowIcon source={require('../../../assets/images/icons/arrowleft.png')} />
            </BackButton>
            <FlightInfo>
              <FlightNumber>AM{flightNumber}</FlightNumber>
              <DateRow>
                <DateText>{formatDate(selectedDate)}</DateText>
                <Separator>|</Separator>
                <ChangeSection onPress={handleChangeDate}>
                  <CalendarSmallIcon source={require('../../../assets/images/icons/Calendar.png')} />
                  <ChangeText>Change</ChangeText>
                </ChangeSection>
              </DateRow>
            </FlightInfo>
          </LeftSection>
        </HeaderRow>
      </Header>
      
      <RouteSection>
        <RouteText>Mexico City to Cancún</RouteText>
        <ResultsText>1 result</ResultsText>
      </RouteSection>

      <FlightList
        data={flightData}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};
