/**
 * ActionButton — primary CTA used at the bottom of card screens.
 * Wraps AppButton with a testID and consistent margin.
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { Spacing } from '../../theme';
import type { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  label: string;
  testID: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
};

const ActionButton = ({ label, testID, loading, variant = 'primary', style, ...rest }: Props) => (
  <AppButton
    label={label}
    testID={testID}
    loading={loading}
    variant={variant}
    style={[s.btn, style]}
    {...rest}
  />
);

const s = StyleSheet.create({
  btn: { marginTop: Spacing.xl },
});

export default ActionButton;
