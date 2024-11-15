import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

declare global {
  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
}
