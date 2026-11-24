export type WeatherCondition = 'clear' | 'rain' | 'snow' | 'cloudy' | 'windy';

export interface MenuRecommendation {
  name: string;
  emoji: string;
  reason: string;
  basisType: string;
}

export interface RecommendationResponse {
  region: string;
  resolvedLocation: string;
  dateLabel: string;
  season: string;
  weatherSummary: string;
  temperature: string;
  tempRange: string;
  precipitation: string;
  weatherCondition: WeatherCondition;
  weatherConditionLabel: string;
  menus: MenuRecommendation[];
}
