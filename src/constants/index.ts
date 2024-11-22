import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const StorageKey = {
  themeMode: 'ThemeMode',
  fontFamily: 'fontFamily',
};

export const Errors = {
  noInternet: 'Unable to connect to Internet',
  runtimeError: 'Unexpected error occurred',
} as const;

export const IconFamily = {
  antDesign: 'AntDesign',
  entypo: 'Entypo',
  feather: 'Feather',
  fontAwesome: 'FontAwesome',
  fontisto: 'Fontisto',
  ionicons: 'Ionicons',
  materialCommunityIcons: 'MaterialCommunityIcons',
  materialIcons: 'MaterialIcons',
  octicons: 'Octicons',
  simpleLineIcons: 'SimpleLineIcons',
} as const;

export const Images = {};

export const defaultLayout: ObjectLayout = {
  height: 0,
  width: 0,
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
};

export const BottomSheetConstants = {
  sheetSlideAnimDuration: 250,
  overlayOpacityAnimDuration: 100,
  maxClosingSnapPointThreshold: 0.85,
  minClosingSnapPointThreshold: 0.15,
  maxSnapPointThreshold: 0.85,
  minSnapPointThreshold: 0.15,
};

export const ShimmerDirection = {
  ltr: 'ltr',
  rtl: 'rtl',
};

export const FlipDirection = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export const CardSide = {
  front: 'front',
  back: 'back',
};
