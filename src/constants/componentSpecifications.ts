import { Elevation, FONT_WEIGHT, Typography } from '@themes';

import ColorType from './colorType';
import { Opacity } from '@themes/colors';

export const APP_BAR_CONSTANTS = {
  THEME: {
    BACKGROUND_COLOR: ColorType.surface,
    ON_SCROLL_BACKGROUND_COLOR: ColorType.surfaceContainer,

    LEADING_ICON_COLOR: ColorType.onSurface,
    TRAILING_ICON_COLOR: ColorType.onSurfaceVariant,
    HEADLINE_COLOR: ColorType.onSurface,
    HEADLINE_TYPOGRAPHY: Typography.titleLarge,
    CONTAINER_ELEVATION: Elevation.lvl0,
    ON_SCROLL_CONTAINER_ELEVATION: Elevation.lvl2,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 64,
    LEADING_ICON_SIZE: 24,
    TRAILING_ICON_SIZE: 24,
    AVATAR_SHAPE: 15,
    AVATAR_SIZE: 30,
    PADDING_HORIZONTAL: 16,
    GAP: 24,
  },
};

export const MENU_CONSTANTS = {
  THEME: {
    CONTAINER_COLOR: ColorType.surfaceContainer,
    SHADOW_COLOR: ColorType.shadow,
    SELECTED_ITEM_CONTAINER_COLOR: ColorType.secondaryContainer,
    SELECTED_ITEM_LABEL_COLOR: ColorType.onSecondaryContainer,
    ITEM_LABEL_COLOR: ColorType.onSurface,
    ITEM_ICON_COLOR: ColorType.onSurfaceVariant,
    DIVIDER_COLOR: ColorType.onSurfaceVariant,
    LEADING_ICON_COLOR: ColorType.onSurface,
    CONTAINER_ELEVATION: Elevation.lvl2,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
  },
  MEASUREMENTS: {
    CONTAINER_MIN_WIDTH: 112,
    CONTAINER_MAX_WIDTH: 280,
    CONTAINER_HEIGHT: 48,
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
  THEME: {
    CONTAINER_COLOR: ColorType.surfaceContainer,
    CONTAINER_SHADOW_COLOR: ColorType.shadow,
    LABEL_ACTIVE_COLOR: ColorType.onSurface,
    LABEL_INACTIVE_COLOR: ColorType.onSurfaceVariant,
    ICON_ACTIVE_COLOR: ColorType.onSecondaryContainer,
    ICON_INACTIVE_COLOR: ColorType.onSurface,
    BADGE_COLOR_COLOR: ColorType.error,
    ACTIVE_INDICATOR_COLOR: ColorType.secondaryContainer,
    CONTAINER_ELEVATION: Elevation.lvl2,
    LABEL_TYPOGRAPHY: Typography.labelMedium,
    LABEL_ACTIVE_WEIGHT: FONT_WEIGHT.BOLD,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 80,
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
  THEME: { COLOR: ColorType.outlineVariant },
};

export const FAB_CONSTANTS = {
  THEME: {
    CONTAINER_COLOR: ColorType.primaryContainer,
    ICON_COLOR: ColorType.onPrimaryContainer,
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
  THEME: {
    CONTAINER_COLOR: ColorType.primaryContainer,
    LABEL_COLOR: ColorType.onPrimaryContainer,
    ICON_COLOR: ColorType.onPrimaryContainer,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 56,
    CONTAINER_MIN_WIDTH: 80,
    CONTAINER_MAX_WIDTH: 120,
    CONTAINER_SHAPE: 16,
    PADDING: 16,
    ICON_SIZE: 24,
  },
};

export const COMMON_BUTTON_CONSTANTS = {
  THEME: {
    DISABLED_CONTAINER_COLOR: ColorType.onSurface,
    DISABLED_LABEL_COLOR: ColorType.onSurface,
    DISABLED_ICON_COLOR: ColorType.onSurface,
    DISABLED_CONTAINER_OPACITY: Opacity.level2,
    DISABLED_LABEL_OPACITY: Opacity.level4,
    DISABLED_ICON_OPACITY: Opacity.level4,
    LABEL_TYPOGRAPHY: Typography.labelLarge,
  },
  MEASUREMENTS: {
    CONTAINER_HEIGHT: 40,
    CONTAINER_SHAPE: 20,
    ICON_SIZE: 18,
    PADDING_HORIZONTAL: 24,
    LEFT_PADDING_WITH_ICON: 16,
    RIGHT_PADDING_WITH_ICON: 16,
    GAP: 8,
  },
  ELEVATED: {
    THEME: {
      CONTAINER_COLOR: ColorType.surfaceContainerLow,
      CONTAINER_SHADOW_COLOR: ColorType.shadow,
      LABEL_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.primary,
      CONTAINER_ELEVATION: Elevation.lvl1,
      DISABLED_CONTAINER_ELEVATION: Elevation.lvl0,
    },
  },
  FILLED: {
    THEME: {
      CONTAINER_COLOR: ColorType.primary,
      LABEL_COLOR: ColorType.onPrimary,
      ICON_COLOR: ColorType.onPrimary,
    },
  },
  TONAL: {
    THEME: {
      CONTAINER_COLOR: ColorType.secondaryContainer,
      LABEL_COLOR: ColorType.onSecondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
    },
  },
  OUTLINED: {
    THEME: {
      CONTAINER_COLOR: ColorType.transparent,
      LABEL_COLOR: ColorType.onSecondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
      OUTLINE_COLOR: ColorType.outline,
      DISABLED_OUTLINE_COLOR: ColorType.onSurface,
      DISABLED_OUTLINE_OPACITY: Opacity.level2,
    },
    MEASUREMENTS: {
      OUTLINE_WIDTH: 1,
    },
  },
  TEXT: {
    THEME: {
      CONTAINER_COLOR: ColorType.transparent,
      LABEL_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.primary,
      DISABLED_LABEL_COLOR: ColorType.onSurface,
      DISABLED_ICON_COLOR: ColorType.onSurface,
      DISABLED_LABEL_OPACITY: Opacity.level4,
      DISABLED_ICON_OPACITY: Opacity.level4,
    },
  },
};

export const ICON_BUTTON_CONSTANTS = {
  THEME: {
    DISABLED_CONTAINER: ColorType.onSurface,
    DISABLED_ICON_COLOR: ColorType.onSurface,
    DISABLED_CONTAINER_OPACITY: Opacity.level2,
    DISABLED_ICON_OPACITY: Opacity.level4,
  },
  MEASUREMENTS: {
    CONTAINER_SIZE: 40,
    SHAPE: 20,
    TARGET_SIZE: 48,
    ICON_SIZE: 24,
  },
  FILLED: {
    THEME: {
      CONTAINER_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.onPrimary,
    },
  },
  TONAL: {
    THEME: {
      CONTAINER_COLOR: ColorType.secondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
    },
  },
  OUTLINED: {
    THEME: {
      CONTAINER_COLOR: ColorType.inverseOnSurface,
      OUTLINE_COLOR: ColorType.inverseSurface,
      DISABLED_OUTLINE_COLOR: ColorType.onSurface,
      ICON_COLOR: ColorType.onSurface,
      DISABLED_OUTLINE_OPACITY: Opacity.level2,
    },
    MEASUREMENTS: {
      OUTLINE_WIDTH: 1,
    },
  },
  STANDARD: {
    THEME: {
      CONTAINER_COLOR: ColorType.transparent,
      ICON_COLOR: ColorType.primary,
    },
  },
};

export const DIALOG_CONSTANTS = {
  THEME: {
    CONTAINER_COLOR: ColorType.surfaceContainerHigh,
    HEADLINE_COLOR: ColorType.onSurface,
    BODY_COLOR: ColorType.onSurfaceVariant,
    CONTAINER_ELEVATION: Elevation.lvl3,
    HEADLINE_TYPOGRAPHY: Typography.headlineSmall,
    BODY_TYPOGRAPHY: Typography.bodyMedium,
  },
  MEASUREMENTS: {
    CONTAINER_MIN_WIDTH: 280,
    CONTAINER_MAX_WIDTH: 560,
    CONTAINER_SHAPE: 28,
    PADDING: 24,
    BUTTONS_GAP: 8,
    TITLE_BODY_GAP: 16,
    BODY_ACTION_BUTTON_GAP: 24,
  },
};

export const SWITCH_CONSTANTS = {
  THEME: {
    ENABLED: {
      SELECTED_TRACK_COLOR: ColorType.primary,
      UNSELECTED_TRACK_COLOR: ColorType.surfaceContainerHighest,
      SELECTED_ICON_COLOR: ColorType.onPrimaryContainer,
      UNSELECTED_ICON_COLOR: ColorType.surfaceContainerHighest,
      SELECTED_HANDLE_COLOR: ColorType.onPrimary,
      UNSELECTED_HANDLE_COLOR: ColorType.outline,
    },
    DISABLED: {
      SELECTED_TRACK_COLOR: ColorType.onSurface,
      UNSELECTED_TRACK_COLOR: ColorType.surfaceContainerHighest,
      UNSELECTED_TRACK_OUTLINE_COLOR: ColorType.onSurface,
      SELECTED_ICON_COLOR: ColorType.onSurface,
      UNSELECTED_ICON_COLOR: ColorType.surfaceContainerHighest,
      SELECTED_HANDLE_COLOR: ColorType.surface,
      UNSELECTED_HANDLE_COLOR: ColorType.onSurface,
      SELECTED_HANDLE_OPACITY: Opacity.full,
      ICON_OPACITY: Opacity.level4,
      TRACK_OPACITY: Opacity.level2,
      UNSELECTED_HANDLE_OPACITY: Opacity.level4,
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
