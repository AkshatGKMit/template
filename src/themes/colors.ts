import { colorWithOpacity } from '@utility/helpers';

export const Opacity = {
  level1: 0.08,
  level2: 0.12,
  level3: 0.16,
  level4: 0.38,
  full: 1,
};

export const Colors = {
  transparent: '#00000000',
  white: '#ffffff',
  black: '#000000',
  grey: '#9E9E9E',
  blue: '#2288DD',
  red: '#ff0000',
  greyShades: {
    shade50: '#FAFAFA',
    shade100: '#F5F5F5',
    shade200: '#EEEEEE',
    shade300: '#E0E0E0',
    shade400: '#BDBDBD',
    shade500: '#9E9E9E',
    shade600: '#757575',
    shade700: '#616161',
    shade800: '#424242',
    shade900: '#212121',
  },
};

export const Palettes = {
  seed: '#CCFD0C',
  primary: {
    shade0: '#000000',
    shade5: '#0D1300',
    shade10: '#161E00',
    shade15: '#1F2900',
    shade20: '#293500',
    shade25: '#324100',
    shade30: '#3C4D00',
    shade35: '#465900',
    shade40: '#516600',
    shade50: '#668100',
    shade60: '#7D9C00',
    shade70: '#94B800',
    shade80: '#ACD600',
    shade90: '#D6EC92',
    shade95: '#E4FA9F',
    shade98: '#F3FFCA',
    shade99: '#FBFFE2',
    shade100: '#FFFFFF',
  },
  secondary: {
    shade0: '#000000',
    shade5: '#0D1300',
    shade10: '#161E00',
    shade15: '#202901',
    shade20: '#2A3409',
    shade25: '#354014',
    shade30: '#404B1E',
    shade35: '#4C5728',
    shade40: '#576333',
    shade50: '#707C4A',
    shade60: '#899661',
    shade70: '#A4B179',
    shade80: '#BFCD92',
    shade90: '#DBE9AC',
    shade95: '#E9F7BA',
    shade98: '#F3FFCA',
    shade99: '#FBFFE2',
    shade100: '#FFFFFF',
  },
  tertiary: {
    shade0: '#000000',
    shade5: '#001411',
    shade10: '#00201C',
    shade15: '#002C26',
    shade20: '#003730',
    shade25: '#00443B',
    shade30: '#005047',
    shade35: '#005D53',
    shade40: '#006B5E',
    shade50: '#008677',
    shade60: '#34A191',
    shade70: '#54BCAB',
    shade80: '#71D8C6',
    shade90: '#93F4E2',
    shade95: '#B5FFF0',
    shade98: '#E5FFF8',
    shade99: '#F3FFFB',
    shade100: '#FFFFFF',
  },
  neutral: {
    shade0: '#000000',
    shade4: '#0c0f05',
    shade5: '#11110D',
    shade6: '#121508',
    shade10: '#1B1C17',
    shade12: '#1e2114',
    shade15: '#262621',
    shade17: '#282b1d',
    shade20: '#30312B',
    shade24: '#373b2c',
    shade25: '#3B3C36',
    shade30: '#474741',
    shade35: '#53534D',
    shade40: '#5F5F59',
    shade50: '#787771',
    shade60: '#92918A',
    shade70: '#ACABA4',
    shade80: '#C8C7BF',
    shade87: '#d9dcc7',
    shade90: '#E4E3DB',
    shade92: '#e8ead4',
    shade94: '#edf0da',
    shade95: '#F3F1E9',
    shade96: '#f3f5e0',
    shade98: '#FBF9F1',
    shade99: '#FEFCF4',
    shade100: '#FFFFFF',
  },
  neutralVariant: {
    shade0: '#000000',
    shade5: '#101209',
    shade10: '#1A1D13',
    shade15: '#25271C',
    shade20: '#2F3126',
    shade25: '#3A3D31',
    shade30: '#46483C',
    shade35: '#515447',
    shade40: '#5D6053',
    shade50: '#76786B',
    shade60: '#909284',
    shade70: '#ABAC9D',
    shade80: '#C6C8B8',
    shade90: '#E3E4D3',
    shade95: '#F1F2E1',
    shade98: '#FAFBEA',
    shade99: '#FDFDED',
    shade100: '#FFFFFF',
  },
  error: {
    shade0: '#000000',
    shade5: '#2D0001',
    shade10: '#410002',
    shade15: '#540003',
    shade20: '#690005',
    shade25: '#7E0008',
    shade30: '#930109',
    shade35: '#A80810',
    shade40: '#BA1A1A',
    shade50: '#DE3730',
    shade60: '#FF5549',
    shade70: '#FF897D',
    shade80: '#FFB4AB',
    shade90: '#FFD9D6',
    shade95: '#FFEDEA',
    shade98: '#FFF8F7',
    shade99: '#FFFBFF',
    shade100: '#FFFFFF',
  },
};

const { error, neutral, neutralVariant, primary, secondary, tertiary } = Palettes;

export const Light: ColorTheme = {
  primary: primary.shade40,
  primaryContainer: primary.shade90,
  secondary: secondary.shade40,
  secondaryContainer: secondary.shade90,
  tertiary: tertiary.shade40,
  tertiaryContainer: tertiary.shade90,
  error: error.shade40,
  errorContainer: error.shade90,
  background: neutral.shade98,

  onPrimary: primary.shade100,
  onPrimaryContainer: primary.shade10,
  onSecondary: secondary.shade100,
  onSecondaryContainer: secondary.shade10,
  onTertiary: tertiary.shade100,
  onTertiaryContainer: tertiary.shade10,
  onError: error.shade100,
  onErrorContainer: error.shade10,
  onBackground: neutral.shade10,
  onSurface: neutral.shade10,
  onSurfaceVariant: neutralVariant.shade30,
  onSurfaceDisabled: colorWithOpacity(neutral.shade10, Opacity.level4),

  surfaceDim: neutral.shade87,
  surface: neutral.shade98,
  surfaceBright: neutral.shade98,
  surfaceContainerLowest: neutral.shade100,
  surfaceContainerLow: neutral.shade96,
  surfaceContainer: neutral.shade94,
  surfaceContainerHigh: neutral.shade92,
  surfaceContainerHighest: neutral.shade90,

  outline: neutralVariant.shade50,
  outlineVariant: neutralVariant.shade80,

  shadow: neutral.shade0,
  scrim: neutral.shade0,

  inverseSurface: neutral.shade20,
  inverseOnSurface: neutral.shade95,
  inversePrimary: primary.shade80,

  backdrop: colorWithOpacity(neutralVariant.shade20, 0.4),
  transparent: Colors.transparent,
} as const;

export const Dark: ColorTheme = {
  primary: primary.shade80,
  primaryContainer: primary.shade30,
  secondary: secondary.shade80,
  secondaryContainer: secondary.shade30,
  tertiary: tertiary.shade80,
  tertiaryContainer: tertiary.shade30,
  error: error.shade80,
  errorContainer: error.shade30,
  background: neutral.shade10,

  onPrimary: primary.shade20,
  onPrimaryContainer: primary.shade90,
  onSecondary: secondary.shade20,
  onSecondaryContainer: secondary.shade90,
  onTertiary: tertiary.shade20,
  onTertiaryContainer: tertiary.shade90,
  onError: error.shade20,
  onErrorContainer: error.shade90,
  onBackground: neutral.shade90,
  onSurface: neutral.shade90,
  onSurfaceVariant: neutralVariant.shade90,
  onSurfaceDisabled: colorWithOpacity(neutral.shade90, Opacity.level4),

  surfaceDim: neutral.shade6,
  surface: neutral.shade6,
  surfaceBright: neutral.shade24,
  surfaceContainerLowest: neutral.shade4,
  surfaceContainerLow: neutral.shade10,
  surfaceContainer: neutral.shade12,
  surfaceContainerHigh: neutral.shade17,
  surfaceContainerHighest: neutral.shade24,

  outline: neutralVariant.shade50,
  outlineVariant: neutralVariant.shade80,

  shadow: neutral.shade0,
  scrim: neutral.shade0,

  inverseSurface: neutral.shade90,
  inverseOnSurface: neutral.shade20,
  inversePrimary: primary.shade40,

  backdrop: colorWithOpacity(neutralVariant.shade20, 0.4),
  transparent: Colors.transparent,
} as const;
