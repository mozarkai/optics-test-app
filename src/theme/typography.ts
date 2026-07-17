export const FontSize = {
  xs:    11,
  sm:    12,
  md:    13,
  base:  14,
  lg:    16,
  xl:    17,
  '2xl': 18,
  '3xl': 20,
  '4xl': 22,
  '5xl': 24,
  '6xl': 28,
  '7xl': 32,
} as const;

export const FontWeight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
  black:    '900' as const,
};

export const LineHeight = {
  tight:   18,
  snug:    20,
  normal:  24,
  relaxed: 28,
} as const;

export const TextStyles = {
  h1: { fontSize: FontSize['7xl'], fontWeight: FontWeight.black,    lineHeight: LineHeight.relaxed },
  h2: { fontSize: FontSize['5xl'], fontWeight: FontWeight.bold,     lineHeight: LineHeight.relaxed },
  h3: { fontSize: FontSize['3xl'], fontWeight: FontWeight.bold,     lineHeight: LineHeight.normal  },
  h4: { fontSize: FontSize['2xl'], fontWeight: FontWeight.semibold, lineHeight: LineHeight.normal  },
  h5: { fontSize: FontSize.xl,     fontWeight: FontWeight.semibold, lineHeight: LineHeight.normal  },
  body:    { fontSize: FontSize.lg,   fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal },
  bodyMd:  { fontSize: FontSize.base, fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal },
  caption: { fontSize: FontSize.sm,   fontWeight: FontWeight.medium,   lineHeight: LineHeight.tight  },
  label:   { fontSize: FontSize.base, fontWeight: FontWeight.semibold,  lineHeight: LineHeight.tight },
  button:  { fontSize: FontSize.lg,   fontWeight: FontWeight.bold,     lineHeight: LineHeight.tight  },
} as const;
