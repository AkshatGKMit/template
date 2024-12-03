export const FontFamily = {
  normal: {
    hairline: 'Lato-Hairline',
    thin: 'Lato-Thin',
    light: 'Lato-Light',
    regular: 'Lato-Regular',
    medium: 'Lato-Medium',
    semibold: 'Lato-Semibold',
    bold: 'Lato-Bold',
    heavy: 'Lato-Heavy',
    black: 'Lato-Black',
  },
  italic: {
    hairline: 'Lato-HairlineItalic',
    thin: 'Lato-ThinItalic',
    light: 'Lato-LightItalic',
    regular: 'Lato-Italic',
    medium: 'Lato-MediumItalic',
    semibold: 'Lato-SemiboldItalic',
    bold: 'Lato-BoldItalic',
    heavy: 'Lato-HeavyItalic',
    black: 'Lato-BlackItalic',
  },
} as const;

export const FontSize = {
  displayLarge: 48,
  displayMedium: 36,
  displaySmall: 30,

  headlineLarge: 28,
  headlineMedium: 25,
  headlineSmall: 22,

  titleLarge: 24,
  titleMedium: 20,
  titleSmall: 15,

  labelLarge: 18,
  labelMedium: 14,
  labelSmall: 10,

  bodyLarge: 16,
  bodyMedium: 12,
  bodySmall: 8,
} as const;

export const FontWeight = {
  hairline: '100',
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
} as const;
