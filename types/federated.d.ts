/**
 * Type definitions for @jvjvjv/weather Module Federation package
 */

declare module '@jvjvjv/weather/WeatherWidget' {
  import { FC } from 'react';
  
  const WeatherWidget: FC;
  export default WeatherWidget;
}

// Legacy support for non-scoped import
declare module 'weather/WeatherWidget' {
  import { FC } from 'react';
  
  const WeatherWidget: FC;
  export default WeatherWidget;
}
