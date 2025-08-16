import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
import { FlightRepository } from '../../core/repositories/FlightRepository';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useFlightFormViewModel = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const flightRepository = FlightRepository.getInstance();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSearchFlight = async () => {
    if (!isSearchEnabled) return;
    
    try {
      setIsSearching(true);
      setNotFoundMessage('');
      
      const result = await flightRepository.searchFlightByNumber(flightNumber, selectedDate);
      
      if (result.flightStatusCollection.length > 0) {
        // Si encuentra vuelos, navegar a SearchResults
        navigation.navigate('SearchResults', {
          flightNumber,
          selectedDate,
        });
      } else {
        // Si no encuentra vuelos, mostrar mensaje
        setNotFoundMessage('Vuelo no encontrado');
      }
    } catch (error) {
      setNotFoundMessage('Error al buscar vuelo');
    } finally {
      setIsSearching(false);
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
    // Limpiar mensaje de error cuando se cambia la fecha
    if (notFoundMessage) {
      setNotFoundMessage('');
    }
  };

  const handleFlightNumberChange = (text: string) => {
    setFlightNumber(text);
    // Limpiar mensaje de error cuando se cambia el número de vuelo
    if (notFoundMessage) {
      setNotFoundMessage('');
    }
  };

  const isSearchEnabled = flightNumber.trim().length > 0;

  return {
    flightNumber,
    setFlightNumber: handleFlightNumberChange,
    selectedDate,
    setSelectedDate,
    formattedDate: formatDate(selectedDate),
    handleSearchFlight,
    isSearchEnabled,
    showDatePicker,
    handleDatePress,
    handleDateChange,
    isSearching,
    notFoundMessage,
  };
};
