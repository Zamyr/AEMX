import { useState } from 'react';

export const useFlightFormViewModel = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return {
    flightNumber,
    setFlightNumber,
    selectedDate,
    setSelectedDate,
    formattedDate: formatDate(selectedDate),
  };
};
