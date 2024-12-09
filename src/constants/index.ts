import { FontSize } from '@themes';
import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const STORE_CONSTANTS = {
  THEME: {
    NAME: 'theme',
    ACTIONS: {
      SWITCH: 'switch',
    },
  },
  COUNTER: {
    NAME: 'counter',
    ACTIONS: {
      INCREMENT: 'increment',
      DECREMENT: 'decrement',
    },
  },
  USER: {
    NAME: 'user',
    ACTIONS: {},
    THUNK: {
      LOGIN: 'login',
    },
  },
} as const;

export const STORAGE_KEY = {
  USER: 'User',
};

export const ERRORS = {
  NO_INTERNET: 'Unable to connect to Internet',
  RUNTIME_ERROR: 'Unexpected error occurred',
} as const;

export const ICON_FAMILY = {
  ANT_DESIGN: 'AntDesign',
  ENTYPO: 'Entypo',
  EVIL_ICONS: 'EvilIcons',
  FEATHER: 'Feather',
  FONT_AWESOME: 'FontAwesome',
  FONT_AWESOME5: 'FontAwesome5',
  FONT_AWESOME5Brands: 'FontAwesome5Brands',
  FONT_AWESOME6: 'FontAwesome6',
  FONT_AWESOME6Brands: 'FontAwesome6Brands',
  FONTISTO: 'Fontisto',
  FOUNDATION: 'Foundation',
  IONICONS: 'Ionicons',
  MATERIAL_COMMUNITY_ICONS: 'MaterialCommunityIcons',
  MATERIAL_ICONS: 'MaterialIcons',
  OCTICONS: 'Octicons',
  SIMPLE_LINE_ICONS: 'SimpleLineIcons',
  ZOCIAL: 'Zocial',
} as const;

export const DEFAULT_LAYOUT: ObjectLayout = {
  height: 0,
  width: 0,
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
};

export const APP_BAR_CONSTANTS = {
  HEIGHT: 60,
  ICON_SIZE: FontSize.titleLarge,
  PADDING_HORIZONTAL: 8,
  GAP: 12,
  TARGET_SIZE: 36,
};

export const BOTTOM_SHEET_CONSTANTS = {
  SHEET_SLIDE_ANIMATION_DURATION: 250,
  OVERLAY_OPACITY_ANIMATION_DURATION: 100,
  MAX_CLOSING_SNAP_POINT_THRESHOLD: 0.85,
  MIN_CLOSING_SNAP_POINT_THRESHOLD: 0.15,
  maxSnapPointThreshold: 0.85,
  minSnapPointThreshold: 0.15,
};

export const SHIMMER_DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;

export const FLIP_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export const FLIP_CARD_SIDE = {
  FRONT: 'front',
  BACK: 'back',
} as const;

export const SWIPE_DIRECTION = {
  NULL: null,
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export const FAB_SIZE = {
  LARGE: 70,
  NORMAL: 56,
  MINI: 44,
} as const;

export const FAB_RADIUS = {
  AUTO: 16,
  ROUND: 100,
} as const;

export const COMPONENTS_CONSTANTS = {
  SWIPEABLE: {
    THRESHOLD_ANIMATION_DURATION: 500,
  },
  FLOATING_ACTION_BUTTON: {
    MARGIN_FROM_SCREEN: 16,
  },
};
