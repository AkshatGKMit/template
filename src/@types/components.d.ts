import { Component, ReactNode, RefObject } from 'react';
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
  TouchableHighlightProps,
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

  interface IconButtonProps extends TouchableHighlightProps {
    family: IconFamilyType;
    name: string;
    iconStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
    onPress?: (ev?: GestureResponderEvent) => void;
  }

  interface GradientScreenProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    showStatusBar?: boolean;
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
    suffixIconButton?: IconButtonProps;
    secureText?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    errorMsg?: string;
    multiline?: boolean;
    addOns?: TextInputProps;
  }

  interface BottomSheetDataParams {
    child: React.JSX.Element | null;
    /**
     * @params Points must lie between 0.15 to 0.85
     */
    snap?: {
      points: number[];
      closingPoint: number;
    };
    isDismissible?: boolean;
    backgroundColor?: string;
    borderRadius?: number;
  }

  interface BottomSHeetOptionParams {
    onShow?: () => void;
    onHide?: () => void;
  }

  type BottomSheetParams = BottomSheetDataParams & BottomSHeetOptionParams;

  interface ObjectLayout {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
    minHeight?: number;
    minWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
  }

  interface DropDownItem {
    id: string | number;
    label: string;
    value: BasicType;
    startNode?: IconProps;
  }

  type DropdownItems = DropDownItem[];

  interface DropdownProps {
    items: DropdownItems;
    value?: DropDownItem | null;
    onSelect?: (item: DropDownItem, index: number) => void;
    hint?: string;
    leftIcon?: IconProps;
    rightIcon?: IconProps;
    buttonStyle?: StyleProp<ViewStyle>;
    listStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    gap?: number;
    showSeparator?: boolean;
  }

  interface PopUpMenuButton {
    id: string;
    label: string;
    startIcon?: IconProps;
    onPress?: (item: PopUpMenuButton, index: number) => void;
  }

  type PopUpMenuButtons = PopUpMenuButton[];

  interface PopUpMenuProps {
    items: PopUpMenuButtons;
    icon?: Omit<IconButtonProps, 'onPress'>;
    onOpened?: () => void;
    onClose?: () => void;
    gap?: number;
    showSeparator?: boolean;
    listStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
  }
}
