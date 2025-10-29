import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Container,
  Paper,
} from '@mui/material';
import {
  WbSunny,
  Cloud,
  Grain,
  AcUnit,
  Thunderstorm,
} from '@mui/icons-material';

interface WeatherDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitation: number;
}

interface WeatherData {
  days: WeatherDay[];
  location: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using Open-Meteo API (no API key required)
      // Default location: New York City
      const latitude = 40.7128;
      const longitude = -74.0060;
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=America/New_York&forecast_days=5`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        
        const days: WeatherDay[] = data.daily.time.map((date: string, index: number) => ({
          date,
          maxTemp: Math.round(data.daily.temperature_2m_max[index]),
          minTemp: Math.round(data.daily.temperature_2m_min[index]),
          weatherCode: data.daily.weathercode[index],
          precipitation: data.daily.precipitation_sum[index],
        }));
        
        setWeather({
          days,
          location: 'New York, NY',
        });
      } catch (apiError) {
        // Fallback to mock data if API fails
        console.warn('API failed, using mock data:', apiError);
        const today = new Date();
        const days: WeatherDay[] = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return {
            date: date.toISOString().split('T')[0],
            maxTemp: Math.round(20 + Math.random() * 10),
            minTemp: Math.round(10 + Math.random() * 8),
            weatherCode: [0, 1, 2, 3, 61][Math.floor(Math.random() * 5)],
            precipitation: Math.random() > 0.5 ? Math.round(Math.random() * 5 * 10) / 10 : 0,
          };
        });
        
        setWeather({
          days,
          location: 'New York, NY (Demo Data)',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes
    if (code === 0) return <WbSunny fontSize="large" color="warning" />;
    if (code <= 3) return <Cloud fontSize="large" color="action" />;
    if (code <= 67) return <Grain fontSize="large" color="primary" />;
    if (code <= 77) return <AcUnit fontSize="large" color="info" />;
    if (code <= 99) return <Thunderstorm fontSize="large" color="error" />;
    return <Cloud fontSize="large" color="action" />;
  };

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return 'Clear sky';
    if (code === 1) return 'Mainly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Overcast';
    if (code <= 49) return 'Foggy';
    if (code <= 59) return 'Drizzle';
    if (code <= 69) return 'Rain';
    if (code <= 79) return 'Snow';
    if (code <= 84) return 'Rain showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading weather data: {error}
        </Alert>
      </Container>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          5-Day Weather Forecast
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          {weather.location}
        </Typography>
        
        <Grid container spacing={2}>
          {weather.days.map((day, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={day.date}>
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom align="center" fontWeight="bold">
                    {formatDate(day.date)}
                  </Typography>
                  
                  <Box display="flex" justifyContent="center" my={2}>
                    {getWeatherIcon(day.weatherCode)}
                  </Box>
                  
                  <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    {getWeatherDescription(day.weatherCode)}
                  </Typography>
                  
                  <Box mt={2}>
                    <Typography variant="h6" align="center" color="error.main">
                      {day.maxTemp}°C
                    </Typography>
                    <Typography variant="body2" align="center" color="primary.main">
                      {day.minTemp}°C
                    </Typography>
                  </Box>
                  
                  {day.precipitation > 0 && (
                    <Typography variant="caption" display="block" align="center" sx={{ mt: 1 }}>
                      💧 {day.precipitation}mm
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default WeatherWidget;
