import { FlightResponse } from '../models/Flight';
import flightData from '../../../data/NumerodeVueloResponse.json';

export class ApiService {
  private static instance: ApiService;

  private constructor() {
    // Configuración inicial del servicio
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async searchFlightByNumber(flightNumber: string, date: Date): Promise<FlightResponse> {
    // Simulamos una llamada a API con delay
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    // Por ahora usamos el JSON local
    // En el futuro aquí iría la llamada real a la API
    const response: FlightResponse = flightData as FlightResponse;
    
    // Filtrar por número de vuelo y fecha
    const filteredFlights = response.flightStatusCollection.filter(flight => {
      const flightMatches = flight.segment.operatingFlightCode === flightNumber;
      
      // Comparar fechas (solo año, mes, día)
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
