import type { WeatherCondition } from './types.ts';

export interface WeatherTheme {
  id: WeatherCondition | 'default';
  pageBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  cardSurface: string;
  cardBorder: string;
  divider: string;
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
  primaryBtn: string;
  secondaryBtn: string;
  quickBtn: string;
  quickBtnActive: string;
  accentText: string;
  isDark: boolean;
}

export const WEATHER_THEMES: Record<WeatherCondition | 'default', WeatherTheme> = {
  default: {
    id: 'default',
    pageBg: 'bg-[#F7F6F2]',
    textPrimary: 'text-[#1A1917]',
    textSecondary: 'text-[#4A4640]',
    textMuted: 'text-[#736E66]',
    cardSurface: 'bg-white',
    cardBorder: 'border-[#E6E3DC]',
    divider: 'border-[#EAE7E0]',
    inputBg: 'bg-white',
    inputBorder: 'border-[#D8D4CA]',
    inputFocus: 'focus:border-[#1F3A2E] focus:ring-2 focus:ring-[#1F3A2E]/15',
    primaryBtn: 'bg-[#1F3A2E] text-white hover:bg-[#162920]',
    secondaryBtn: 'bg-white text-[#1A1917] border border-[#D8D4CA] hover:bg-[#F0EDE6]',
    quickBtn: 'text-[#5C574F] hover:text-[#1A1917] hover:bg-[#ECE9E2]',
    quickBtnActive: 'bg-[#E6E2D8] text-[#1A1917] font-medium',
    accentText: 'text-[#1F3A2E]',
    isDark: false,
  },
  clear: {
    id: 'clear',
    pageBg: 'bg-[#EFF6FD]',
    textPrimary: 'text-[#132238]',
    textSecondary: 'text-[#334863]',
    textMuted: 'text-[#5B708A]',
    cardSurface: 'bg-white/95',
    cardBorder: 'border-[#D4E3F4]',
    divider: 'border-[#DFECFA]',
    inputBg: 'bg-white',
    inputBorder: 'border-[#C4D8EE]',
    inputFocus: 'focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15',
    primaryBtn: 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]',
    secondaryBtn: 'bg-white text-[#132238] border border-[#C4D8EE] hover:bg-[#E7F0FA]',
    quickBtn: 'text-[#475E7A] hover:text-[#132238] hover:bg-[#E2EEFA]',
    quickBtnActive: 'bg-[#D6E6F8] text-[#132238] font-medium',
    accentText: 'text-[#1D4ED8]',
    isDark: false,
  },
  rain: {
    id: 'rain',
    pageBg: 'bg-[#16202C]',
    textPrimary: 'text-[#F1F5F9]',
    textSecondary: 'text-[#CBD5E1]',
    textMuted: 'text-[#94A3B8]',
    cardSurface: 'bg-[#1E2B3B]',
    cardBorder: 'border-[#2E4057]',
    divider: 'border-[#2A3A4E]',
    inputBg: 'bg-[#1A2635]',
    inputBorder: 'border-[#33475F]',
    inputFocus: 'focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20',
    primaryBtn: 'bg-[#3B82F6] text-white hover:bg-[#2563EB]',
    secondaryBtn: 'bg-[#233245] text-[#F1F5F9] border border-[#384D66] hover:bg-[#2B3D54]',
    quickBtn: 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#243447]',
    quickBtnActive: 'bg-[#2A3D54] text-[#F1F5F9] font-medium',
    accentText: 'text-[#93C5FD]',
    isDark: true,
  },
  snow: {
    id: 'snow',
    pageBg: 'bg-[#EDF3F9]',
    textPrimary: 'text-[#182433]',
    textSecondary: 'text-[#3F5166]',
    textMuted: 'text-[#64768C]',
    cardSurface: 'bg-white/95',
    cardBorder: 'border-[#D5E1EE]',
    divider: 'border-[#E2ECF5]',
    inputBg: 'bg-white',
    inputBorder: 'border-[#C7D6E6]',
    inputFocus: 'focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15',
    primaryBtn: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]',
    secondaryBtn: 'bg-white text-[#182433] border border-[#C7D6E6] hover:bg-[#E7EFF7]',
    quickBtn: 'text-[#52657A] hover:text-[#182433] hover:bg-[#E1EAF3]',
    quickBtnActive: 'bg-[#D6E3F0] text-[#182433] font-medium',
    accentText: 'text-[#2563EB]',
    isDark: false,
  },
  cloudy: {
    id: 'cloudy',
    pageBg: 'bg-[#E5E8ED]',
    textPrimary: 'text-[#1B2028]',
    textSecondary: 'text-[#424954]',
    textMuted: 'text-[#656E7A]',
    cardSurface: 'bg-[#F9FAFB]',
    cardBorder: 'border-[#CFD5DF]',
    divider: 'border-[#DCE1E8]',
    inputBg: 'bg-[#F9FAFB]',
    inputBorder: 'border-[#C2C9D4]',
    inputFocus: 'focus:border-[#374151] focus:ring-2 focus:ring-[#374151]/15',
    primaryBtn: 'bg-[#27303F] text-white hover:bg-[#1B222D]',
    secondaryBtn: 'bg-[#F9FAFB] text-[#1B2028] border border-[#C2C9D4] hover:bg-[#ECEFF4]',
    quickBtn: 'text-[#4B5360] hover:text-[#1B2028] hover:bg-[#D8DDE5]',
    quickBtnActive: 'bg-[#CFD5DF] text-[#1B2028] font-medium',
    accentText: 'text-[#27303F]',
    isDark: false,
  },
  windy: {
    id: 'windy',
    pageBg: 'bg-[#ECF3F2]',
    textPrimary: 'text-[#162726]',
    textSecondary: 'text-[#395250]',
    textMuted: 'text-[#5D7876]',
    cardSurface: 'bg-white/95',
    cardBorder: 'border-[#CCE0DD]',
    divider: 'border-[#DCEBE8]',
    inputBg: 'bg-white',
    inputBorder: 'border-[#BDD5D1]',
    inputFocus: 'focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15',
    primaryBtn: 'bg-[#0F766E] text-white hover:bg-[#115E59]',
    secondaryBtn: 'bg-white text-[#162726] border border-[#BDD5D1] hover:bg-[#E2EEEC]',
    quickBtn: 'text-[#456360] hover:text-[#162726] hover:bg-[#DCE9E7]',
    quickBtnActive: 'bg-[#CEE1DF] text-[#162726] font-medium',
    accentText: 'text-[#0F766E]',
    isDark: false,
  },
};
