import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './src/presentation/screens/HomeScreen';
import { SearchResultsScreen } from './src/presentation/screens/SearchResultsScreen';
import { DetailScreen } from './src/presentation/screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  SearchResults: {
    flightNumber: string;
    selectedDate: Date;
  };
  Detail: {
    flightData: {
      id: string;
      status: 'Arrived' | 'OnTime' | 'Delayed';
      departureTime: string;
      arrivalTime: string;
      departureAirport: string;
      arrivalAirport: string;
      duration: string;
      flightCode: string;
      delayInMinutes: number;
      // Campos adicionales del JSON
      estimatedDepartureTime?: string;
      boardingTerminal?: string;
      boardingGate?: string;
      boardingTime?: string;
      arrivalTerminal?: string;
      arrivalDateTime?: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
