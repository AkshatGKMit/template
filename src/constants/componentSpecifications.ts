import { Elevation, FONT_WEIGHT, Typography } from '@themes';

import ColorType from './colorType';
import { Opacity } from '@themes/colors';

export const APP_BAR_CONSTANTS = {
  COLOR: {
    BACKGROUND: ColorType.surface,
    ON_SCROLL_BACKGROUND: ColorType.surfaceContainer,

    LEADING_ICON: ColorType.onSurface,
    TRAILING_ICON: ColorType.onSurfaceVariant,
    HEADLINE: ColorType.onSurface,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 64,
    CONTAINER_ELEVATION: Elevation.lvl0,
    ON_SCROLL_CONTAINER_ELEVATION: Elevation.lvl2,
    LEADING_ICON_SIZE: 24,
    TRAILING_ICON_SIZE: 24,
    HEADLINE_TYPOGRAPHY: Typography.titleLarge,
    AVATAR_SHAPE: 15,
    AVATAR_SIZE: 30,
    PADDING_HORIZONTAL: 16,
    GAP: 24,
  },
};

export const MENU_CONSTANTS = {
  COLOR: {
    CONTAINER: ColorType.surfaceContainer,
    SHADOW: ColorType.shadow,
    SELECTED_ITEM_CONTAINER: ColorType.secondaryContainer,
    SELECTED_ITEM_LABEL: ColorType.onSecondaryContainer,
    ITEM_LABEL: ColorType.onSurface,
    ITEM_ICON: ColorType.onSurfaceVariant,
    DIVIDER: ColorType.onSurfaceVariant,
    LEADING_ICON: ColorType.onSurface,
  },
  MEASUREMENTS: {
    CONTAINER_MIN_WIDTH: 112,
    CONTAINER_MAX_WIDTH: 280,
    CONTAINER_ELEVATION: Elevation.lvl2,
    CONTAINER_HEIGHT: 48,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
    BORDER_RADIUS: 4,
    HORIZONTAL_PADDING: 12,
    ITEM_HEIGHT: 48,
    ITEM_ELEMENTS_GAP: 12,
    DIVIDER_VERTICAL_PADDING: 8,
    DIVIDER_HEIGHT: 1,
    ICON_SIZE: 24,
  },
};

export const BOTTOM_TAB_CONSTANTS = {
  COLOR: {
    CONTAINER: ColorType.surfaceContainer,
    CONTAINER_SHADOW: ColorType.shadow,
    LABEL_ACTIVE: ColorType.onSurface,
    LABEL_INACTIVE: ColorType.onSurfaceVariant,
    ICON_ACTIVE: ColorType.onSecondaryContainer,
    ICON_INACTIVE: ColorType.onSurface,
    BADGE_COLOR: ColorType.error,
    ACTIVE_INDICATOR: ColorType.secondaryContainer,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 80,
    CONTAINER_ELEVATION: Elevation.lvl2,
    LABEL_TYPOGRAPHY: Typography.labelMedium,
    LABEL_ACTIVE_WEIGHT: FONT_WEIGHT.BOLD,
    ICON_SIZE: 24,
    BADGE_SIZE: 6,
    BADGE_SHAPE: 3,
    ACTIVE_INDICATOR_HEIGHT: 32,
    ACTIVE_INDICATOR_WIDTH: 64,
    ACTIVE_INDICATOR_SHAPE: 16,
    TOP_PADDING: 12,
    BOTTOM_PADDING: 16,
    INDICATOR_LABEL_GAP: 4,
    TARGET_SIZE: 48,
    CONTAINER_GAP: 8,
  },
};

export const DIVIDER_CONSTANTS = {
  THICKNESS: 1,
  COLOR: ColorType.outlineVariant,
};

export const FAB_CONSTANTS = {
  COLOR: {
    CONTAINER: ColorType.primaryContainer,
    ICON: ColorType.onPrimaryContainer,
  },
  MEASUREMENTS: {
    NORMAL: {
      CONTAINER_HEIGHT: 56,
      CONTAINER_WIDTH: 56,
      CONTAINER_SHAPE: 16,
      PADDING: 16,
      ICON_SIZE: 24,
    },
    SMALL: {
      CONTAINER_HEIGHT: 40,
      CONTAINER_WIDTH: 40,
      CONTAINER_SHAPE: 12,
      PADDING: 8,
      ICON_SIZE: 24,
    },
    LARGE: {
      CONTAINER_HEIGHT: 96,
      CONTAINER_WIDTH: 96,
      CONTAINER_SHAPE: 28,
      PADDING: 16,
      ICON_SIZE: 36,
    },
  },
};

export const EXTENDED_FAB_CONSTANTS = {
  COLOR: {
    CONTAINER: ColorType.primaryContainer,
    LABEL: ColorType.onPrimaryContainer,
    ICON: ColorType.onPrimaryContainer,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 56,
    CONTAINER_MIN_WIDTH: 80,
    CONTAINER_MAX_WIDTH: 120,
    CONTAINER_SHAPE: 16,
    PADDING: 16,
    ICON_SIZE: 24,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
  },
};

export const COMMON_BUTTON_CONSTANTS = {
  COLOR: {
    DISABLED_CONTAINER: ColorType.onSurface,
    DISABLED_LABEL_COLOR: ColorType.onSurface,
    DISABLED_ICON_COLOR: ColorType.onSurface,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 40,
    CONTAINER_SHAPE: 20,
    ICON_SIZE: 18,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
    PADDING_HORIZONTAL: 24,
    LEFT_PADDING_WITH_ICON: 16,
    RIGHT_PADDING_WITH_ICON: 16,
    GAP: 8,
    DISABLED_CONTAINER_OPACITY: Opacity.level2,
    DISABLED_LABEL_OPACITY: Opacity.level4,
    DISABLED_ICON_OPACITY: Opacity.level4,
  },
  ELEVATED: {
    COLOR: {
      CONTAINER_COLOR: ColorType.surfaceContainerLow,
      CONTAINER_SHADOW: ColorType.shadow,
      LABEL_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.primary,
      DISABLED_CONTAINER: ColorType.onSurface,
      DISABLED_LABEL_COLOR: ColorType.onSurface,
      DISABLED_ICON_COLOR: ColorType.onSurface,
    },
    MEASUREMENTS: {
      CONTAINER_ELEVATION: Elevation.lvl1,
      DISABLED_CONTAINER_ELEVATION: Elevation.lvl0,
    },
  },
  FILLED: {
    COLOR: {
      CONTAINER_COLOR: ColorType.primary,
      LABEL_COLOR: ColorType.onPrimary,
      ICON_COLOR: ColorType.onPrimary,
    },
  },
  TONAL: {
    COLOR: {
      CONTAINER_COLOR: ColorType.secondaryContainer,
      LABEL_COLOR: ColorType.onSecondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
    },
  },
  OUTLINED: {
    COLOR: {
      CONTAINER_COLOR: ColorType.transparent,
      LABEL_COLOR: ColorType.onSecondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
      OUTLINE_COLOR: ColorType.outline,
      DISABLED_OUTLINE_COLOR: ColorType.onSurface,
    },
    MEASUREMENTS: {
      OUTLINE_WIDTH: 1,
      DISABLED_OUTLINE_OPACITY: Opacity.level2,
    },
  },
  TEXT: {
    COLOR: {
      CONTAINER_COLOR: ColorType.transparent,
      LABEL_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.primary,
    },
  },
};

export const ICON_BUTTON_CONSTANTS = {
  COLOR: {
    DISABLED_CONTAINER: ColorType.onSurface,
    DISABLED_ICON_COLOR: ColorType.onSurface,
  },
  MEASUREMENTS: {
    CONTAINER_SIZE: 40,
    SHAPE: 20,
    TARGET_SIZE: 48,
    ICON_SIZE: 24,
    DISABLED_CONTAINER_OPACITY: Opacity.level2,
    DISABLED_ICON_OPACITY: Opacity.level4,
  },
  FILLED: {
    CONTAINER: ColorType.primary,
    CONTAINER_UNSELECTED: ColorType.surfaceContainerHighest,
    ICON: ColorType.onPrimary,
    ICON_UNSELECTED: ColorType.primary,
  },
  TONAL: {
    CONTAINER: ColorType.secondaryContainer,
    CONTAINER_UNSELECTED: ColorType.surfaceContainerHighest,
    ICON: ColorType.onSecondaryContainer,
    ICON_UNSELECTED: ColorType.onSurfaceVariant,
  },
  OUTLINED: {
    COLOR: {
      CONTAINER: ColorType.transparent,
      CONTAINER_UNSELECTED: ColorType.transparent,
      OUTLINE_SELECTED: ColorType.inverseSurface,
      OUTLINE_UNSELECTED: ColorType.outline,
      ICON: ColorType.onSurfaceVariant,
      ICON_UNSELECTED: ColorType.inverseOnSurface,
    },
    MEASUREMENTS: {
      OUTLINE_WIDTH: 1,
    },
  },
  STANDARD: {
    CONTAINER: ColorType.transparent,
    CONTAINER_UNSELECTED: ColorType.transparent,
    ICON: ColorType.primary,
    ICON_UNSELECTED: ColorType.onSurfaceVariant,
  },
};

export const DIALOG_CONSTANTS = {
  COLOR: {
    CONTAINER: ColorType.surfaceContainerHigh,
    HEADLINE: ColorType.onSurface,
    BODY: ColorType.onSurfaceVariant,
  },
  MEASUREMENTS: {
    CONTAINER_MIN_WIDTH: 280,
    CONTAINER_MAX_WIDTH: 560,
    CONTAINER_ELEVATION: Elevation.lvl3,
    CONTAINER_SHAPE: 28,
    PADDING: 24,
    BUTTONS_GAP: 8,
    TITLE_BODY_GAP: 16,
    BODY_ACTION_BUTTON_GAP: 24,
    HEADLINE_TYPOGRAPHY: Typography.headlineSmall,
    BODY_TYPOGRAPHY: Typography.bodyMedium,
  },
};

export const SWITCH_CONSTANTS = {
  COLOR: {
    ENABLED: {
      SELECTED_TRACK: ColorType.primary,
      UNSELECTED_TRACK: ColorType.surfaceContainerHighest,
      SELECTED_ICON: ColorType.onPrimaryContainer,
      UNSELECTED_ICON: ColorType.surfaceContainerHighest,
      SELECTED_HANDLE: ColorType.onPrimary,
      UNSELECTED_HANDLE: ColorType.outline,
    },
    DISABLED: {
      TRACK_OPACITY: Opacity.level2,
      SELECTED_TRACK: ColorType.onSurface,
      UNSELECTED_TRACK: ColorType.surfaceContainerHighest,
      UNSELECTED_TRACK_OUTLINE: ColorType.onSurface,
      ICON_OPACITY: Opacity.level4,
      SELECTED_ICON: ColorType.onSurface,
      UNSELECTED_ICON: ColorType.surfaceContainerHighest,
      SELECTED_HANDLE: ColorType.surface,
      SELECTED_HANDLE_OPACITY: 1,
      UNSELECTED_HANDLE_OPACITY: Opacity.level4,
      UNSELECTED_HANDLE: ColorType.onSurface,
    },
  },
  MEASUREMENTS: {
    TRACK_HEIGHT: 32,
    TRACK_WIDTH: 52,
    TRACK_OUTLINE_WIDTH: 2,
    TRACK_SHAPE: 16,
    HANDLE_UNSELECTED_SIZE: 16,
    HANDLE_SELECTED_SIZE: 24,
    HANDLE_SIZE_WITH_ICON: 24,
    HANDLE_SHAPE: 12,
    ICON_SIZE: 16,
  },
};
