import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const StorageKey = {
  themeMode: 'ThemeMode',
  font: 'font',
};

export const Errors = {
  noInternet: 'Unable to connect to Internet',
  runtimeError: 'Unexpected error occurred',
} as const;

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export const Orientation = {
  portrait: 'portrait',
  landscape: 'landscape',
} as const;

export const Font = {
  default: 'Default',
} as const;
