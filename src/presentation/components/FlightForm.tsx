import React from 'react';
import styled from 'styled-components/native';
import { TextInput, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFlightFormViewModel } from '../viewmodels/useFlightFormViewModel';
import { usePanelContext } from '../contexts/PanelContext';

const FormContainer = styled.View`
  align-items: center;
  margin-top: 62px;
`;

const InputRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 15px;
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

const InputBox = styled.View`
  width: 130px;
  height: 64px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #000;
  padding: 15px;
  gap: 2px;
`;

const DateBox = styled(TouchableOpacity)`
  width: 215px;
  height: 64px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #000;
  padding: 15px;
  gap: 1px;
  flex-direction: row;
  align-items: center;
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

const CarrierText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #000;
`;

const DateText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #000;
  margin-top: 2px;
`;

const FlightInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const FlightInput = styled(TextInput)`
  flex: 1;
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  color: #000;
  padding: 0;
  margin: 0;
  line-height: 18px;
`;

const PlaceholderText = styled.Text`
  font-family: 'Garnett-Semibold';
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #666;
  position: absolute;
  left: 0;
  top: 0;
`;

const FlightInputContainer = styled.View`
  flex: 1;
  position: relative;
`;

const CalendarIcon = styled(Image)`
  width: 21px;
  height: 21px;
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

export const FlightForm: React.FC = () => {
    const {
    flightNumber,
    setFlightNumber,
    formattedDate,
    handleSearchFlight,
    isSearchEnabled,
    showDatePicker,
    handleDatePress,
    handleDateChange,
    selectedDate,
    isSearching,
    notFoundMessage,
  } = useFlightFormViewModel();
  const { selectTab } = usePanelContext();

  const handleDestinationPress = () => {
    selectTab('destination');
  };

  return (
    <FormContainer>
      <InputRow>
        <InputBox>
          <Label>Flight number</Label>
          <FlightInputRow>
            <CarrierText>AM</CarrierText>
            <FlightInputContainer>
              <FlightInput
                value={flightNumber}
                onChangeText={setFlightNumber}
                keyboardType="numeric"
                placeholder=""
                multiline={false}
              />
              {!flightNumber && <PlaceholderText>000</PlaceholderText>}
            </FlightInputContainer>
          </FlightInputRow>
        </InputBox>
        
        <DateBox onPress={handleDatePress}>
          <DateTextContainer>
            <Label>Date of departure</Label>
            <DateText>{formattedDate}</DateText>
          </DateTextContainer>
          <CalendarIcon source={require('../../../assets/images/icons/Calendar.png')} />
        </DateBox>
      </InputRow>
      
      <SearchButton 
        onPress={isSearchEnabled ? handleSearchFlight : undefined}
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
        <InfoText>Can't find your flight number?</InfoText>
        <DestinationText>
          <DestinationLabel>Try searching by </DestinationLabel>
          <DestinationHighlight onPress={handleDestinationPress}>
            <DestinationHighlightText>destination</DestinationHighlightText>
          </DestinationHighlight>
        </DestinationText>
      </TextContainer>
    </FormContainer>
  );
};
