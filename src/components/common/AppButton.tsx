import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet,
  ActivityIndicator, TouchableOpacityProps, ViewStyle,
} from 'react-native';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

type AppButtonProps = TouchableOpacityProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
};

const variantStyles: Record<Variant, { container: ViewStyle; label: object }> = {
  primary: {
    container: { backgroundColor: Colors.primary },
    label:     { color: Colors.textInverse },
  },
  secondary: {
    container: { backgroundColor: Colors.secondary },
    label:     { color: Colors.textInverse },
  },
  outline: {
    container: { backgroundColor: Colors.transparent, borderWidth: 1.5, borderColor: Colors.primary },
    label:     { color: Colors.primary },
  },
  ghost: {
    container: { backgroundColor: Colors.transparent },
    label:     { color: Colors.primary },
  },
};

const AppButton = ({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  style,
  disabled,
  ...props
}: AppButtonProps) => {
  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        v.container,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.75}
      disabled={disabled || loading}
      {...props}
    >
      {loading
        ? <ActivityIndicator size="small" color={variant === 'primary' || variant === 'secondary' ? Colors.white : Colors.primary} />
        : <Text style={[styles.label, v.label]}>{label}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...Shadows.sm,
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled:  { opacity: 0.55 },
  label: { fontSize: FontSize.lg, fontWeight: FontWeight.bold },
});

export default AppButton;
