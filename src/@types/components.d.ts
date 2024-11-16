import { RefObject } from 'react';
import {
  EnterKeyHintTypeOptions,
  GestureResponderEvent,
  InputModeOptions,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputEndEditingEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';

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

  interface GradientScreenProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
  }

  type LoaderProps = {
    color?: string;
    size?: number | 'small' | 'large';
  };

  interface LoadingViewProps {
    processInfo?: string;
    invertedStyle?: boolean;
  }

  interface TextFieldProps {
    value: string;
    onChangeText: (text: string) => void;
    label?: string;
    placeholder?: string;
    ref?: RefObject<TextInput>;
    keyboardType?: KeyboardTypeOptions;
    inputMode?: InputModeOptions;
    enterKeyHint?: EnterKeyHintTypeOptions;
    onEndEditing?: (e?: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
    onSubmitEditing?: (e?: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    autoFocus?: boolean;
    prefixIcon?: IconProps;
    suffixIconButton?: IconBtnProps;
    secureText?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    errorMsg?: string;
    multiline?: boolean;
    addOns?: TextInputProps;
  }
}
