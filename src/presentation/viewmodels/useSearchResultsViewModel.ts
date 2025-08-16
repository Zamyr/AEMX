import { useQuery } from '@tanstack/react-query';
import { FlightRepository } from '../../core/repositories/FlightRepository';
import { FlightStatus } from '../../core/models/Flight';
import OrigenDestinoData from '../../../data/OrigenDestinoResponse.json';

export const useSearchResultsViewModel = (flightNumber: string, selectedDate: Date) => {
  const flightRepository = FlightRepository.getInstance();

  const isDestinationSearch = flightNumber.includes('-');
  const [origin, destination] = isDestinationSearch ? flightNumber.split('-') : ['', ''];

  const searchQuery = useQuery({
    queryKey: ['flights', flightNumber, selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()],
    queryFn: async () => {
      if (isDestinationSearch) {
        const targetYear = selectedDate.getFullYear();
        const targetMonth = selectedDate.getMonth() + 1;
        const targetDay = selectedDate.getDate();
        const targetDate = `${targetYear}-${targetMonth.toString().padStart(2, '0')}-${targetDay.toString().padStart(2, '0')}`;
        
        const filteredFlights = OrigenDestinoData.flightStatusCollection.filter(flight => {
          const flightDate = flight.estimatedDepartureTime?.split('T')[0];
          const departureMatch = flight.segment?.departureAirport === origin;
          const arrivalMatch = flight.segment?.arrivalAirport === destination;
          const dateMatch = flightDate === targetDate;
          
          return departureMatch && arrivalMatch && dateMatch;
        });
        
        return { flightStatusCollection: filteredFlights };
      } else {
        return flightRepository.searchFlightByNumber(flightNumber, selectedDate);
      }
    },
    enabled: !!flightNumber && flightNumber.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const transformFlightData = (flights: FlightStatus[]) => {
    return flights.map((flight, index) => ({
      id: index.toString(),
      status: flight.status === 'ARRIVED' ? 'Arrived' as const : 
             flight.delayInMinutes > 0 ? 'Delayed' as const : 'OnTime' as const,
      departureTime: extractTime(flight.estimatedDepartureTime),
      arrivalTime: extractTime(flight.estimatedArrivalTime),
      departureAirport: flight.segment.departureAirport,
      arrivalAirport: flight.segment.arrivalAirport,
      duration: calculateDuration(flight.estimatedDepartureTime, flight.estimatedArrivalTime),
      flightCode: flight.segment.operatingFlightCode,
      delayInMinutes: flight.delayInMinutes,
    }));
  };

  const extractTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculateDuration = (departureTime: string, arrivalTime: string): string => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    
    const diffMs = arrival.getTime() - departure.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const formatRoute = (departureAirport: string, arrivalAirport: string): string => {
    const airportNames: { [key: string]: string } = {
      'MEX': 'Mexico City',
      'CUN': 'Cancún',
    };
    
    const departure = airportNames[departureAirport] || departureAirport;
    const arrival = airportNames[arrivalAirport] || arrivalAirport;
    
    return `${departure} to ${arrival}`;
  };

  const flights = searchQuery.data?.flightStatusCollection || [];
  const transformedFlights = transformFlightData(flights);
  
  const routeText = flights.length > 0 ? 
    formatRoute(flights[0].segment.departureAirport, flights[0].segment.arrivalAirport) : 
    '';

  return {
    flights: transformedFlights,
    isLoading: searchQuery.isLoading,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
    routeText,
    resultsCount: flights.length,
  };
};
