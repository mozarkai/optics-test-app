/**
 * SectionBlock — labeled section used across all card screens.
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, FontSize, FontWeight } from '../../theme';

type Props = {
  label: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

const SectionBlock = ({ label, children, style }: Props) => (
  <View style={[s.wrap, style]}>
    <Text style={s.label}>{label.toUpperCase()}</Text>
    {children}
  </View>
);

const s = StyleSheet.create({
  wrap:  { marginBottom: Spacing.xl },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
});

export default SectionBlock;
