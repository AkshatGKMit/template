import { ReactNode, RefObject } from 'react';
import {
  Animated,
  EnterKeyHintTypeOptions,
  GestureResponderEvent,
  InputModeOptions,
  KeyboardTypeOptions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  PanResponderGestureState,
  StyleProp,
  TextInput,
  TextInputEndEditingEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextProps,
  TextStyle,
  TouchableHighlightProps,
  TransformsStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {
  CardSide,
  SwipeDirection,
  FlipDirection,
  IconFamily,
  ShimmerDirection,
  FabAppearance,
  FabSize,
  FabBorderRadius,
} from '@constants';

declare global {
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

  interface FlipCardProps extends ViewProps {
    front: ReactNode;
    back?: ReactNode;
    duration?: number;
    side?: (typeof CardSide)[keyof typeof CardSide];
    direction?: (typeof FlipDirection)[keyof typeof FlipDirection];
    onFront?: () => void;
    onBack?: () => void;
  }

  type FabBorderRadius = (typeof FabBorderRadius)[keyof typeof FabBorderRadius];
  type FabSize = (typeof FabSize)[keyof typeof FabSize];
  type FabAppearance = (typeof FabAppearance)[keyof typeof FabAppearance];

  interface FloatingActionButtonProps {
    icon: Omit<IconProps, 'style'>;
    iconColor?: string;
    shadowColor?: string;
    appearance?: FabAppearance;
    size?: FabSize;
    borderRadius?: FabBorderRadius;
    backgroundColor?: string;
    zIndex?: number;
    onPress?: () => void;
    style?: TransformsStyle;
    onLayout?: (e: LayoutChangeEvent) => void;
  }

  interface FloatingActionButtonAutoHideProps extends FloatingActionButtonProps {
    visible?: boolean;
    visibleDuration?: number;
  }

  interface GradientScreenProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    showStatusBar?: boolean;
  }

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

  type LoaderProps = {
    color?: string;
    size?: number | 'small' | 'large';
  };

  interface LoadingViewProps {
    processInfo?: string;
    invertedStyle?: boolean;
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

  type SwipeDirection = (typeof SwipeDirection)[keyof typeof SwipeDirection];

  interface SwipeableProps {
    children: ReactNode;
    leftChild?: ReactNode;
    rightChild?: ReactNode;
    dismissDirection?: SwipeDirection;
    onDismiss?: () => void;
    onSwipeStart?: (direction?: SwipeDirection, gesture?: PanResponderGestureState) => void;
    onSwipe?: (direction?: SwipeDirection, gesture?: PanResponderGestureState) => void;
    onSwipeFinished?: (direction?: SwipeDirection, gesture?: PanResponderGestureState) => void;
  }

  interface TextButtonProps extends Omit<TextProps, 'children'> {
    text: string;
    color?: string;
    onPress?: () => void;
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
}
