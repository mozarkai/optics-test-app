// ─── Brand ───────────────────────────────────────────────────────────────────
export const palette = {
  // Purple brand
  purple100: '#ede9fe',
  purple400: '#a78bfa',
  purple500: '#667eea',
  purple600: '#764ba2',

  // Pink accent
  pink400: '#f093fb',
  pink500: '#f5576c',

  // Green
  green400: '#34d399',
  green500: '#10b981',
  green600: '#48bb78',

  // Neutrals
  gray50:  '#f8f9fa',
  gray100: '#f2f2f7',
  gray200: '#e2e8f0',
  gray300: '#cbd5e0',
  gray400: '#a0aec0',
  gray500: '#718096',
  gray600: '#4a5568',
  gray700: '#2d3748',
  gray800: '#1a202c',
  gray900: '#171923',

  // Semantic
  red50:   '#fff5f5',
  red200:  '#fed7d7',
  red400:  '#f56565',
  red600:  '#c53030',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────
export const Colors = {
  // Brand
  primary:     palette.purple500,
  primaryDark: palette.purple600,
  secondary:   palette.pink400,

  // Backgrounds
  background:         palette.gray100,
  backgroundCard:     palette.white,
  backgroundInput:    palette.white,

  // Text
  textPrimary:   palette.gray800,
  textSecondary: palette.gray500,
  textMuted:     palette.gray400,
  textInverse:   palette.white,

  // Status
  success:     palette.green600,
  error:       palette.red400,
  errorBg:     palette.red50,
  errorBorder: palette.red200,

  // Border
  border:      palette.gray200,
  borderFocus: palette.purple500,
  borderError: palette.red400,

  // Misc
  white:   palette.white,
  black:   palette.black,
  overlay: 'rgba(0,0,0,0.4)',
} as const;

// ─── Gradients ────────────────────────────────────────────────────────────────
export const Gradients = {
  primary:   [palette.purple500, palette.purple600] as string[],
  secondary: [palette.pink400,   palette.pink500]   as string[],
  success:   [palette.green400,  palette.green500]  as string[],
} as const;
