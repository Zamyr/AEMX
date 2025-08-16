import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform, Image, Modal, FlatList, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePanelContext } from '../contexts/PanelContext';
import { useDestinationFormViewModel } from '../viewmodels/useDestinationFormViewModel';

const FormContainer = styled.View`
  align-items: center;
  margin-top: 62px;
`;

const InputRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 15px;
`;

const InputBox = styled(TouchableOpacity)`
  width: 172px;
  height: 64px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #000;
  padding: 15px;
  gap: 2px;
  justify-content: center;
`;

const DateBox = styled(TouchableOpacity)`
  width: 360px;
  height: 64px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #000;
  padding: 15px;
  gap: 1px;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const DateTextContainer = styled.View`
  flex: 1;
`;

const Label = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #666;
`;

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
`;

const CityText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #000;
`;

const CodeText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.3);
`;

const DateText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #000;
  margin-top: 2px;
`;

const CalendarIcon = styled(Image)`
  width: 21px;
  height: 21px;
`;

const PlaceholderText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #666;
  margin-top: 2px;
`;

const SearchButton = styled(TouchableOpacity)`
  width: 360px;
  height: 56px;
  background-color: #000000;
  border-radius: 8px;
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const SearchButtonText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: white;
  text-align: center;
`;

const TextContainer = styled.View`
  align-items: center;
  margin-top: 30px;
`;

const InfoText = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
`;

const DestinationText = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const DestinationLabel = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
`;

const DestinationHighlight = styled(TouchableOpacity)``;

const DestinationHighlightText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  color: #000;
  text-decoration-line: underline;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 70%;
  padding-bottom: 34px;
`;

const ModalHeader = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 18px;
  color: #000;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 5px;
`;

const CloseButtonText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: #666;
`;

const AirportItem = styled(TouchableOpacity)`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AirportInfo = styled.View`
  flex: 1;
`;

const AirportCity = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin-bottom: 2px;
`;

const AirportCountry = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 14px;
  color: #666;
`;

const AirportCode = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.Text`
  font-family: 'Garnett-Regular';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  margin-top: 8px;
`;

const LoadingContainer = styled.View`
  align-items: center;
  margin-top: 8px;
`;

interface Airport {
  code: string;
  city: string;
  country: string;
}

const airports: Airport[] = [
  { code: 'MEX', city: 'Mexico City', country: 'Mexico' },
  { code: 'CUN', city: 'Cancun', country: 'Mexico' },
];

export const DestinationForm: React.FC = () => {
  const [showOriginPicker, setShowOriginPicker] = useState<boolean>(false);
  const [showDestinationPicker, setShowDestinationPicker] = useState<boolean>(false);
  const { selectTab } = usePanelContext();
  
  const {
    selectedOrigin,
    selectedDestination,
    selectedDate,
    setSelectedOrigin,
    setSelectedDestination,
    formattedDate,
    handleSearchFlights,
    isSearchEnabled,
    showDatePicker,
    handleDatePress,
    handleDateChange,
    isSearching,
    notFoundMessage,
  } = useDestinationFormViewModel();

  const handleOriginPress = () => {
    setShowOriginPicker(true);
  };

  const handleDestinationPress = () => {
    setShowDestinationPicker(true);
  };

  const handleOriginSelect = (airport: Airport) => {
    setSelectedOrigin(airport);
    setShowOriginPicker(false);
  };

  const handleDestinationSelect = (airport: Airport) => {
    setSelectedDestination(airport);
    setShowDestinationPicker(false);
  };

  const closeOriginPicker = () => {
    setShowOriginPicker(false);
  };

  const closeDestinationPicker = () => {
    setShowDestinationPicker(false);
  };

  const renderLocationText = (airport: Airport | null) => {
    if (!airport) {
      return <PlaceholderText>Select location</PlaceholderText>;
    }
    
    return (
      <LocationContainer>
        <CityText>{airport.city}</CityText>
        <CodeText>{airport.code}</CodeText>
      </LocationContainer>
    );
  };

  const handleFlightNumberPress = () => {
    selectTab('flightNumber');
  };

  return (
    <FormContainer>
      <InputRow>
        <InputBox onPress={handleOriginPress}>
          <Label>Origin</Label>
          {renderLocationText(selectedOrigin)}
        </InputBox>
        
        <InputBox onPress={handleDestinationPress}>
          <Label>Destination</Label>
          {renderLocationText(selectedDestination)}
        </InputBox>
      </InputRow>
      
      <DateBox onPress={handleDatePress}>
        <DateTextContainer>
          <Label>Date of departure</Label>
          <DateText>{formattedDate}</DateText>
        </DateTextContainer>
        <CalendarIcon source={require('../../../assets/images/icons/Calendar.png')} />
      </DateBox>

      <SearchButton 
        onPress={isSearchEnabled ? handleSearchFlights : undefined}
        activeOpacity={isSearchEnabled ? 0.8 : 1}
      >
        <SearchButtonText>Search Flight</SearchButtonText>
      </SearchButton>

      {isSearching && (
        <LoadingContainer>
          <ActivityIndicator size="small" color="rgba(0, 0, 0, 0.4)" />
        </LoadingContainer>
      )}

      {notFoundMessage && !isSearching && (
        <ErrorMessage>{notFoundMessage}</ErrorMessage>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          textColor="#000000"
          accentColor="#000000"
          themeVariant="light"
        />
      )}
      
      <TextContainer>
        <InfoText>Looking for a specific flight? </InfoText>
        <DestinationText>
          <DestinationLabel>Try searching by </DestinationLabel>
          <DestinationHighlight onPress={handleFlightNumberPress}>
            <DestinationHighlightText>flight number</DestinationHighlightText>
          </DestinationHighlight>
        </DestinationText>
      </TextContainer>

      <Modal
        visible={showOriginPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={closeOriginPicker}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>Select Origin</ModalTitle>
              <CloseButton onPress={closeOriginPicker}>
                <CloseButtonText>Done</CloseButtonText>
              </CloseButton>
            </ModalHeader>
            <FlatList
              data={airports}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <AirportItem onPress={() => handleOriginSelect(item)}>
                  <AirportInfo>
                    <AirportCity>{item.city}</AirportCity>
                    <AirportCountry>{item.country}</AirportCountry>
                  </AirportInfo>
                  <AirportCode>{item.code}</AirportCode>
                </AirportItem>
              )}
            />
          </ModalContainer>
        </ModalOverlay>
      </Modal>

      <Modal
        visible={showDestinationPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDestinationPicker}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>Select Destination</ModalTitle>
              <CloseButton onPress={closeDestinationPicker}>
                <CloseButtonText>Done</CloseButtonText>
              </CloseButton>
            </ModalHeader>
            <FlatList
              data={airports}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <AirportItem onPress={() => handleDestinationSelect(item)}>
                  <AirportInfo>
                    <AirportCity>{item.city}</AirportCity>
                    <AirportCountry>{item.country}</AirportCountry>
                  </AirportInfo>
                  <AirportCode>{item.code}</AirportCode>
                </AirportItem>
              )}
            />
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    </FormContainer>
  );
};
