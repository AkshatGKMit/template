import { Platform } from 'react-native';

import { Typography } from '@themes';

import { ICON_FAMILY, Icons } from './icons';
import { IMAGES } from './images';

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
  FAVORITE: {
    NAME: 'favorite',
    THUNK: {
      GET_FROM_STORAGE: 'GET_FAVORITE_FROM_STORAGE',
      SAVE_TO_STORAGE: 'SAVE_FAVORITE_TO_STORAGE',
      FETCH_FAVORITE_FROM_API: 'FETCH_FAVORITE_FROM_API',
    },
  },
  MOVIES: {
    NAME: 'movies',
    SAGA: {
      POPULAR_MOVIES_REQUEST: 'POPULAR_MOVIES_REQUEST',
      POPULAR_MOVIES_SUCCESS: 'POPULAR_MOVIES_SUCCESS',
      POPULAR_MOVIES_FAILURE: 'POPULAR_MOVIES_FAILURE',
    },
  },
} as const;

export const QUERY_CONSTANTS = {
  KEYS: {
    GET_INFINITE_POPULAR_MOVIES: ['popular movies'],
    GET_POPULAR_MOVIES: (page: number) => ['popular movies', page],
    ADD_FAVORITE: ['add favorite'],
    GET_FAVORITES: ['get favorites'],
    GET_FAVORITES_FROM_STORAGE: ['GET_FAVORITES_FROM_STORAGE'],
  },
} as const;

export const STORAGE_KEY = {
  USER: 'User',
  FAVORITE_MOVIES_ID: 'FavoriteMoviesId',
};

export const ERRORS = {
  NO_INTERNET: 'Unable to connect to Internet',
  RUNTIME_ERROR: 'Unexpected error occurred',
} as const;

export const ROUTES = {
  PRACTICE_STACK: {
    PRACTICE_HOME: 'Practice Home',
    PAGINATION: 'Pagination',
    INFINITE_PAGINATION: 'Infinite Pagination',
    FAVORITES: 'Favorite Infinite Pagination',
    SAGA: 'Redux Saga',
  },
  COMPONENTS_STACK: {
    COMPONENTS_HOME: 'Components Home',
  },
  BOTTOM_TABS: {
    PRACTICE_TAB: 'Practice',
    COMPONENTS_TAB: 'Components',
  },
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
  ICON_TYPOGRAPHY: 24,
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
  BUTTON: {
    HEIGHT: 40,
    DISABLED_BACKGROUND_OPACITY: 0.12,
    DISABLED_FOREGROUND_OPACITY: 0.55,
    PADDING_HORIZONTAL: 24,
    PADDING_LEFT_WITH_ICON: 16,
    GAP: 8,
    BORDER_RADIUS: 20,
  },
  RIPPLE_BUTTON: {
    MAX_OPACITY: 0.05,
    MIN_SCALE: 0.01,
    MAX_SCALE: 10,
    RIPPLE_DURATION: 775,
  },
  MENUS: {
    CONTAINER_MIN_WIDTH: 112,
    CONTAINER_MAX_WIDTH: 112,
    BORDER_RADIUS: 4,
    PADDING_HORIZONTAL: 12,
    PADDING_VERTICAL: 8,
    ITEM_HEIGHT: 48,
    GAP: 12,
    DIVIDER_HEIGHT: 1,
    ICON_SIZE: 24,
  },
};

export { ICON_FAMILY, Icons, Typography, IMAGES };
export * from './animationConstants';
export * from './componentSpecifications';
