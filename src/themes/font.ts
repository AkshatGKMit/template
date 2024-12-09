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
  displayLarge: { fontSize: 57, fontWeight: FontWeight.regular },
  displayMedium: { fontSize: 45, fontWeight: FontWeight.regular },
  displaySmall: { fontSize: 36, fontWeight: FontWeight.regular },

  headlineLarge: { fontSize: 32, fontWeight: FontWeight.regular },
  headlineMedium: { fontSize: 28, fontWeight: FontWeight.regular },
  headlineSmall: { fontSize: 24, fontWeight: FontWeight.regular },

  titleLarge: { fontSize: 22, fontWeight: FontWeight.regular },
  titleMedium: { fontSize: 16, fontWeight: FontWeight.medium },
  titleSmall: { fontSize: 14, fontWeight: FontWeight.medium },

  bodyLarge: { fontSize: 16, fontWeight: FontWeight.regular },
  bodyMedium: { fontSize: 14, fontWeight: FontWeight.regular },
  bodySmall: { fontSize: 12, fontWeight: FontWeight.regular },

  labelLarge: { fontSize: 14, fontWeight: FontWeight.medium },
  labelMedium: { fontSize: 12, fontWeight: FontWeight.medium },
  labelSmall: { fontSize: 11, fontWeight: FontWeight.medium },
} as const;

export const Elevation = {
  lvl0: 0,
  lvl1: 1,
  lvl2: 3,
  lvl3: 6,
  lvl4: 8,
  lvl5: 12,
} as const;
