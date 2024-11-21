import React, { Component, ReactNode, RefObject } from 'react';
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
  TextProps,
  TextStyle,
  TouchableHighlightProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { CardSide, SlideDirection, FlipDirection, IconFamily, ShimmerDirection } from '@constants';

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

  interface RefOptions {
    onShow?: () => void;
    onHide?: () => void;
  }

  interface RefManagerParams extends RefOptions {
    child: React.JSX.Element | null;
  }

  interface BottomSheetParams extends RefManagerParams {
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

  interface SnackbarParams extends RefOptions {
    text: string;
    heading?: string;
    duration?: number;
    indefinite?: boolean;
    showClose?: boolean;
    action?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    headingStyle?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
  }

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

  interface ShimmerProps {
    baseColor: string;
    highlightColor: string;
    shimmerWidth?: number;
    direction?: (typeof ShimmerDirection)[keyof typeof ShimmerDirection];
    period?: number;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
  }

  interface FlipCardProps extends ViewProps {
    front: ReactNode;
    back?: ReactNode;
    duration?: number;
    side?: (typeof CardSide)[keyof typeof CardSide];
    direction?: (typeof FlipDirection)[keyof typeof FlipDirection];
    onFront?: () => void;
    onBack?: () => void;
  }

  interface TextButtonProps extends Omit<TextProps, 'children'> {
    text: string;
    color?: string;
    onPress?: () => void;
  }
}
