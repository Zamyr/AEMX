import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useFlightFormViewModel = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp>();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSearchFlight = () => {
    navigation.navigate('SearchResults', {
      flightNumber,
      selectedDate,
    });
  };

  return {
    flightNumber,
    setFlightNumber,
    selectedDate,
    setSelectedDate,
    formattedDate: formatDate(selectedDate),
    handleSearchFlight,
  };
};
