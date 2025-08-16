import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';

import OrigenDestinoData from '../../../data/OrigenDestinoResponse.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Airport {
  code: string;
  city: string;
  country: string;
}

export const useDestinationFormViewModel = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<Airport | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Airport | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [notFoundMessage, setNotFoundMessage] = useState<string>('');
  
  const navigation = useNavigation<NavigationProp>();

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSearchFlights = async () => {
    if (!isSearchEnabled) return;
    
    try {
      setIsSearching(true);
      setNotFoundMessage('');
      
      // Filtrar vuelos por origen, destino y fecha
      const targetYear = selectedDate.getFullYear();
      const targetMonth = selectedDate.getMonth() + 1;
      const targetDay = selectedDate.getDate();
      const targetDateString = `${targetYear}-${targetMonth.toString().padStart(2, '0')}-${targetDay.toString().padStart(2, '0')}`;
      
      const filteredFlights = OrigenDestinoData.flightStatusCollection.filter(flight => {
        const flightDate = flight.estimatedDepartureTime?.split('T')[0];
        const departureMatch = flight.segment?.departureAirport === selectedOrigin?.code;
        const arrivalMatch = flight.segment?.arrivalAirport === selectedDestination?.code;
        const dateMatch = flightDate === targetDateString;
        
        return departureMatch && arrivalMatch && dateMatch;
      });
      
      if (filteredFlights.length > 0) {
        const routeFlightNumber = `${selectedOrigin!.code}-${selectedDestination!.code}`;
        
        navigation.navigate('SearchResults', {
          flightNumber: routeFlightNumber,
          selectedDate,
        });
      } else {
        setNotFoundMessage('No flights found for this route and date');
      }
    } catch (error) {
      setNotFoundMessage('Error searching flights');
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
    if (notFoundMessage) {
      setNotFoundMessage('');
    }
  };

  const handleOriginSelect = (airport: Airport) => {
    setSelectedOrigin(airport);
    if (notFoundMessage) {
      setNotFoundMessage('');
    }
  };

  const handleDestinationSelect = (airport: Airport) => {
    setSelectedDestination(airport);
    if (notFoundMessage) {
      setNotFoundMessage('');
    }
  };

  const isSearchEnabled = selectedOrigin !== null && selectedDestination !== null && selectedDate !== null;

  return {
    selectedOrigin,
    selectedDestination,
    selectedDate,
    setSelectedOrigin: handleOriginSelect,
    setSelectedDestination: handleDestinationSelect,
    formattedDate: formatDate(selectedDate),
    handleSearchFlights,
    isSearchEnabled,
    showDatePicker,
    handleDatePress,
    handleDateChange,
    isSearching,
    notFoundMessage,
  };
};
