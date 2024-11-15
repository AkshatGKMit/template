import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconFamily } from '@constants';

declare global {
  type IconFamilyType = (typeof IconFamily)[keyof typeof IconFamily];

  interface IconProps {
    family: IconFamilyType;
    name: string;
    style?: StyleProp<TextStyle>;
  }

  interface IconBtnProps {
    family: IconFamilyType;
    name: string;
    iconStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
    onPress?: (ev?: GestureResponderEvent) => void;
  }
}
