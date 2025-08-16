import { FlightResponse, FlightSearchParams } from '../models/Flight';
import { ApiService } from '../services/ApiService';

export class FlightRepository {
  private static instance: FlightRepository;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): FlightRepository {
    if (!FlightRepository.instance) {
      FlightRepository.instance = new FlightRepository();
    }
    return FlightRepository.instance;
  }

  async searchFlight(params: FlightSearchParams): Promise<FlightResponse> {
    return this.apiService.searchFlightByNumber(params.flightNumber, params.date);
  }

  async searchFlightByNumber(flightNumber: string, date: Date): Promise<FlightResponse> {
    return this.apiService.searchFlightByNumber(flightNumber, date);
  }
}
