/**
 * ScreenWrapper — shared container for all card screens.
 * Handles SafeAreaView + ScrollView with consistent padding.
 */
import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../theme';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const ScreenWrapper = ({ children, scrollable = true, style, contentStyle }: Props) => (
  <SafeAreaView style={[s.root, style]}>
    {scrollable ? (
      <ScrollView
        contentContainerStyle={[s.content, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      children
    )}
  </SafeAreaView>
);

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing['3xl'] },
});

export default ScreenWrapper;
