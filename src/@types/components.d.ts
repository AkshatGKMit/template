import { ReactElement, ReactNode, RefObject } from 'react';
import {
  Animated,
  EnterKeyHintTypeOptions,
  GestureResponderEvent,
  InputModeOptions,
  KeyboardTypeOptions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  PanResponderGestureState,
  PressableProps,
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
  FLIP_CARD_SIDE,
  SWIPE_DIRECTION,
  FLIP_DIRECTION,
  ICON_FAMILY,
  SHIMMER_DIRECTION,
  FabAppearance,
  FAB_SIZE,
  FAB_RADIUS,
} from '@constants';

declare global {
  interface RefOptions {
    onShow?: () => void;
    onHide?: () => void;
  }

  interface RefManagerParams extends RefOptions {
    child: React.JSX.Element | null;
  }

  interface SafeAreaProps {
    useSafeArea?: boolean;
    useSafeAreaInLandscape?: boolean;
    useSafeAreaInPortrait?: boolean;
    topInset?: boolean;
    bottomInset?: boolean;
    leftInset?: boolean;
    rightInset?: boolean;
  }

  interface TrailingButton {
    icon: IconProps;
    title: string;
    onPress?: () => void;
  }

  type TrailingButtons = TrailingButton[];

  interface TrailingContainerProps {
    style: any;
    trailing?: IconButtonProps;
    iconColor?: string;
  }

  interface AppBarProps {
    title: string;
    titleColor?: string;
    centerTitle?: boolean;
    backgroundColor?: string;
    iconColor?: string;
    leading?: IconButtonProps;
    trailing?: ReactNode;
  }

  interface SmallAppBarProps extends AppBarProps {
    trailing?: IconButtonProps;
  }

  interface ExtendedAppBarProps extends Omit<AppBarProps, 'centerTitle'> {
    trailing: TrailingButtons;
  }

  interface TrailingButtonContainerProps {
    trailing: TrailingButtons;
    maxNumberOfButtons: number;
    styles: any;
    iconColor?: string;
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
    side?: (typeof FLIP_CARD_SIDE)[keyof typeof FLIP_CARD_SIDE];
    direction?: (typeof FLIP_DIRECTION)[keyof typeof FLIP_DIRECTION];
    onFront?: () => void;
    onBack?: () => void;
  }

  type FabBorderRadius = (typeof FAB_RADIUS)[keyof typeof FAB_RADIUS];
  type FabSize = (typeof FAB_SIZE)[keyof typeof FAB_SIZE];
  type FabAppearance = (typeof FabAppearance)[keyof typeof FabAppearance];

  interface FabProps {
    children?: ReactNode;
    shadowColor?: string;
    appearance?: FabAppearance;
    size?: FabSize;
    borderRadius?: FabBorderRadius;
    backgroundColor?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    onLayout?: (e: LayoutChangeEvent) => void;
  }

  interface FabShrinkProps extends FabProps {
    icon: Omit<IconProps, 'style'>;
    color?: string;
  }

  interface FabExpandedProps extends FabProps {
    text: string;
    icon?: Omit<IconProps, 'style'>;
    color?: string;
  }

  interface FabAutoHideProps extends FabShrinkProps {
    visible?: boolean;
    visibleDuration?: number;
  }

  interface GradientScreenProps extends SafeAreaProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
  }

  type IconFamilyType = (typeof ICON_FAMILY)[keyof typeof ICON_FAMILY];

  interface IconProps {
    family: IconFamilyType;
    name: string;
    size?: FontSize | number;
    color?: string;
  }

  interface IconButtonProps extends TouchableHighlightProps, IconProps {
    underlayColor?: string;
    onPress?: () => void;
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
    icon?: Partial<Omit<IconButtonProps, 'onPress'>>;
    onOpened?: () => void;
    onClose?: () => void;
    gap?: number;
    showSeparator?: boolean;
    listStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
  }

  interface RippleButtonProps extends ViewProps {
    children?: ReactElement<IconProps> | ReactElement<TextBlockProps>;
    rippleColor?: string;
    onPress?: () => void;
    borderRadius?: number;
  }

  interface ScaffoldProps extends SafeAreaProps, ViewProps {
    backgroundColor?: string;
    style?: StyleProp<Omit<ViewStyle, 'backgroundColor'>>;
    appBar?: ReactElement<SmallAppBarProps | ExtendedAppBarProps>;
  }

  interface ShimmerProps {
    baseColor: string;
    highlightColor: string;
    shimmerWidth?: number;
    direction?: (typeof SHIMMER_DIRECTION)[keyof typeof SHIMMER_DIRECTION];
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

  type SwipeDirection = (typeof SWIPE_DIRECTION)[keyof typeof SWIPE_DIRECTION];

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

  interface TextBlockProps extends TextProps {
    fontFamily?: FontFamily;
    fontSize?: FontSize;
    color?: string;
    style?: StyleProp<Omit<TextStyle, 'fontFamily' | 'fontSize' | 'color'>>;
  }

  interface TextButtonProps extends Omit<TextProps, 'children'> {
    text: string;
    color?: string;
    onPress?: () => void;
  }

  interface TextFieldProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    label?: string;
    placeholder?: string;
    ref?: RefObject<TextInput>;
    prefixIcon?: IconProps;
    suffixIconButton?: IconButtonProps;
    secureText?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    errorMsg?: string;
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
