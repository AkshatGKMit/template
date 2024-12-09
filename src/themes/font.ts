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

export const Typography = {
  displayLarge: { fontSize: 57, fontFamily: FontFamily.normal.regular },
  displayMedium: { fontSize: 45, fontFamily: FontFamily.normal.regular },
  displaySmall: { fontSize: 36, fontFamily: FontFamily.normal.regular },

  headlineLarge: { fontSize: 32, fontFamily: FontFamily.normal.regular },
  headlineMedium: { fontSize: 28, fontFamily: FontFamily.normal.regular },
  headlineSmall: { fontSize: 24, fontFamily: FontFamily.normal.regular },

  titleLarge: { fontSize: 22, fontFamily: FontFamily.normal.regular },
  titleMedium: { fontSize: 16, fontFamily: FontFamily.normal.medium },
  titleSmall: { fontSize: 14, fontFamily: FontFamily.normal.medium },

  bodyLarge: { fontSize: 16, fontFamily: FontFamily.normal.regular },
  bodyMedium: { fontSize: 14, fontFamily: FontFamily.normal.regular },
  bodySmall: { fontSize: 12, fontFamily: FontFamily.normal.regular },

  labelLarge: { fontSize: 14, fontFamily: FontFamily.normal.medium },
  labelMedium: { fontSize: 12, fontFamily: FontFamily.normal.medium },
  labelSmall: { fontSize: 11, fontFamily: FontFamily.normal.medium },
} as const;

export const Elevation = {
  lvl0: 0,
  lvl1: 1,
  lvl2: 3,
  lvl3: 6,
  lvl4: 8,
  lvl5: 12,
} as const;
