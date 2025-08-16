import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, FlatList, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { FlightStatusLine } from '../components/FlightStatusLine';
import { useSearchResultsViewModel } from '../viewmodels/useSearchResultsViewModel';

type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;
type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;

type FlightItemData = {
  id: string;
  status: 'Arrived' | 'OnTime' | 'Delayed';
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  flightCode: string;
  delayInMinutes: number;
  estimatedDepartureTime?: string;
  boardingTerminal?: string;
  boardingGate?: string;
  boardingTime?: string;
  arrivalTerminal?: string;
  arrivalDateTime?: string;
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
  border-radius: 15px;
  border-width: 2px;
  border-color: #000;
  margin-bottom: 15px;
  position: relative;
  padding: 15px;
`;

const StatusBadge = styled.View<{ status: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 80px;
  height: 28px;
  padding: 4px 20px 4px 20px;
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
  border-bottom-right-radius: 20px;
  border-top-left-radius: 12px;
  justify-content: center;
`;

const StatusText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  color: #fff;
  width: 80px
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

const DetailsButton = styled(TouchableOpacity)`
  padding: 0px;
`;

const NoFlightsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const NoFlightsText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
`;

const FavoriteRow = styled.View`
  position: absolute;
  top: 15px;
  right: 15px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const FavoriteText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 11px;
  line-height: 18px;
  color: #000;
`;

const ToggleContainer = styled(TouchableOpacity)<{ isActive: boolean }>`
  width: 33px;
  height: 19px;
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? '#000' : '#ccc')};
  justify-content: center;
  padding: 1px;
`;

const ToggleCircle = styled.View<{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  border-radius: 8.5px;
  background-color: #fff;
  align-self: ${({ isActive }) => (isActive ? 'flex-end' : 'flex-start')};
`;

const LoadingContainer = styled.View`
  margin-top: 50px;
  align-items: center;
`;

const ErrorContainer = styled.View`
  margin-top: 50px;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: red;
  text-align: center;
`;

export const SearchResultsScreen: React.FC = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const navigation = useNavigation<SearchResultsNavigationProp>();
  
  const { flightNumber } = route.params;
  const [currentDate, setCurrentDate] = useState(route.params.selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [favoriteFlights, setFavoriteFlights] = useState<Set<string>>(new Set());
  
  const isDestinationSearch = flightNumber.includes('-');
  const [origin, destination] = isDestinationSearch ? flightNumber.split('-') : ['', ''];
  
  const {
    flights,
    isLoading,
    error,
    routeText,
    resultsCount,
  } = useSearchResultsViewModel(flightNumber, currentDate);

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

  const handleViewDetails = (flightData: FlightItemData) => {
    navigation.navigate('Detail', { flightData });
  };

  const handleToggleFavorite = (flightId: string) => {
    setFavoriteFlights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(flightId)) {
        newSet.delete(flightId);
      } else {
        newSet.add(flightId);
      }
      return newSet;
    });
  };

  const handleChangeDate = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setCurrentDate(date);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Delayed':
        return 'Delayed';
      case 'Arrived':
        return 'Arrived';
      case 'OnTime':
        return 'In the air';
      default:
        return status;
    }
  };

  const getSortedFlights = () => {
    return [...flights].sort((a, b) => {
      const aIsFavorite = favoriteFlights.has(a.id);
      const bIsFavorite = favoriteFlights.has(b.id);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      
      return 0;
    });
  };

  const renderFlightItem = ({ item }: { item: FlightItemData }) => {
    const isFavorite = favoriteFlights.has(item.id);
    
    return (
      <FlightItem>
        <StatusBadge status={item.status}>
          <StatusText>{getStatusText(item.status)}</StatusText>
        </StatusBadge>
        {isDestinationSearch && (
          <FavoriteRow>
            <FavoriteText>Favorite</FavoriteText>
            <ToggleContainer isActive={isFavorite} onPress={() => handleToggleFavorite(item.id)}>
              <ToggleCircle isActive={isFavorite} />
            </ToggleContainer>
          </FavoriteRow>
        )}
        <FlightTimesRow>
          <TimeText>{item.departureTime}</TimeText>
          <FlightStatusLine status={item.status} />
          <TimeText>{item.arrivalTime}</TimeText>
        </FlightTimesRow>
        <FlightDetailsRow>
          <AirportCode>{item.departureAirport}</AirportCode>
          <FlightDurationContainer>
            <FlightDuration>{item.duration}</FlightDuration>
          </FlightDurationContainer>
          <AirportCode>{item.arrivalAirport}</AirportCode>
        </FlightDetailsRow>
        <SeparatorLine />
        <BottomRow>
          <FlightNumberBottom>AM {item.flightCode}</FlightNumberBottom>
          <DetailsButton onPress={() => handleViewDetails(item)}>
            <DetailsText>Details</DetailsText>
          </DetailsButton>
        </BottomRow>
      </FlightItem>
    );
  };

  return (
    <Container>
      <Header>
        <HeaderRow>
          <LeftSection>
            <BackButton onPress={handleBackPress}>
              <ArrowIcon source={require('../../../assets/images/icons/arrowleft.png')} />
            </BackButton>
            <FlightInfo>
              <FlightNumber>
                {isDestinationSearch ? `${origin} → ${destination}` : `AM${flightNumber}`}
              </FlightNumber>
              <DateRow>
                <DateText>{formatDate(currentDate)}</DateText>
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
        <RouteText>{routeText || 'Mexico City to Cancún'}</RouteText>
        <ResultsText>{resultsCount} result{resultsCount !== 1 ? 's' : ''}</ResultsText>
      </RouteSection>

      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#000" />
        </LoadingContainer>
      )}

      {error && (
        <ErrorContainer>
          <ErrorText>Error loading flights: {error.message}</ErrorText>
        </ErrorContainer>
      )}

      {!isLoading && !error && flights.length === 0 && (
        <NoFlightsContainer>
          <NoFlightsText>No flights found for this date</NoFlightsText>
        </NoFlightsContainer>
      )}

      {flights.length > 0 && (
        <FlightList
          data={getSortedFlights()}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showDatePicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDatePickerChange}
          textColor="#000000"
          accentColor="#000000"
          themeVariant="light"
        />
      )}
    </Container>
  );
};
