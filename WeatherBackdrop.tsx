import type { WeatherCondition } from './types.ts';

interface WeatherBackdropProps {
  condition: WeatherCondition | 'default';
}

const RAIN_DROPS = [
  { left: '8%', delay: '0s', duration: '1.5s', height: '72px' },
  { left: '19%', delay: '0.4s', duration: '1.8s', height: '88px' },
  { left: '31%', delay: '0.9s', duration: '1.4s', height: '64px' },
  { left: '44%', delay: '0.2s', duration: '1.9s', height: '94px' },
  { left: '57%', delay: '0.7s', duration: '1.6s', height: '78px' },
  { left: '70%', delay: '0.1s', duration: '1.7s', height: '82px' },
  { left: '82%', delay: '0.6s', duration: '1.5s', height: '70px' },
  { left: '92%', delay: '0.3s', duration: '1.85s', height: '86px' },
];

const SNOW_FLAKES = [
  { left: '10%', delay: '0s', duration: '6.2s', size: '6px' },
  { left: '24%', delay: '1.5s', duration: '7.4s', size: '5px' },
  { left: '38%', delay: '0.7s', duration: '6.8s', size: '7px' },
  { left: '52%', delay: '2.2s', duration: '7.1s', size: '5px' },
  { left: '66%', delay: '1.1s', duration: '6.4s', size: '6px' },
  { left: '79%', delay: '2.8s', duration: '7.8s', size: '5px' },
  { left: '90%', delay: '0.4s', duration: '6.6s', size: '6px' },
];

export function WeatherBackdrop({ condition }: WeatherBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden transition-opacity duration-700"
    >
      {condition === 'clear' && (
        <div
          className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full opacity-70 blur-3xl transition-all duration-700"
          style={{
            background:
              'radial-gradient(circle, rgba(254, 240, 138, 0.55) 0%, rgba(191, 219, 254, 0.35) 55%, rgba(239, 246, 253, 0) 75%)',
          }}
        />
      )}

      {condition === 'rain' && (
        <>
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.14) 0%, rgba(22, 32, 44, 0) 65%)',
            }}
          />
          {RAIN_DROPS.map((drop, index) => (
            <span
              key={index}
              className="weather-rain-streak absolute top-0 w-px bg-gradient-to-b from-transparent via-sky-300/40 to-transparent"
              style={{
                left: drop.left,
                height: drop.height,
                animationDelay: drop.delay,
                animationDuration: drop.duration,
              }}
            />
          ))}
        </>
      )}

      {condition === 'snow' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.85) 0%, rgba(237, 243, 249, 0) 65%)',
            }}
          />
          {SNOW_FLAKES.map((flake, index) => (
            <span
              key={index}
              className="weather-snow-flake absolute top-0 rounded-full bg-white shadow-sm"
              style={{
                left: flake.left,
                width: flake.size,
                height: flake.size,
                animationDelay: flake.delay,
                animationDuration: flake.duration,
              }}
            />
          ))}
        </>
      )}

      {condition === 'cloudy' && (
        <div
          className="absolute inset-x-0 top-0 h-[420px] opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(203, 213, 225, 0.55) 0%, rgba(229, 232, 237, 0) 70%)',
          }}
        />
      )}

      {condition === 'windy' && (
        <div
          className="absolute inset-x-0 top-0 h-[420px] opacity-75"
          style={{
            background:
              'radial-gradient(ellipse at 70% 10%, rgba(153, 246, 228, 0.3) 0%, rgba(236, 243, 242, 0) 65%)',
          }}
        />
      )}
    </div>
  );
}
