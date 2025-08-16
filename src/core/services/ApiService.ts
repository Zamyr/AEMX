import { FlightResponse } from '../models/Flight';
import flightData from '../../../data/NumerodeVueloResponse.json';

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async searchFlightByNumber(flightNumber: string, date: Date): Promise<FlightResponse> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    const response: FlightResponse = flightData as FlightResponse;
    
    const filteredFlights = response.flightStatusCollection.filter(flight => {
      const flightMatches = flight.segment.operatingFlightCode === flightNumber;
      
      const flightDate = new Date(flight.estimatedDepartureTime);
      const searchDate = new Date(date);
      const dateMatches = 
        flightDate.getFullYear() === searchDate.getFullYear() &&
        flightDate.getMonth() === searchDate.getMonth() &&
        flightDate.getDate() === searchDate.getDate();
      
      return flightMatches && dateMatches;
    });

    return {
      flightStatusCollection: filteredFlights
    };
  }
}
