import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from './ScreenWrapper';
import ActionButton from './ActionButton';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../../theme';

type Props = { title?: string; message?: string };

const SuccessScreen = ({
  title = 'Success!',
  message = 'Action completed successfully.',
}: Props) => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View style={s.box}>
        <Text style={s.icon}>✅</Text>
        <Text style={s.title}>{title}</Text>
        <Text style={s.msg}>{message}</Text>
        <ActionButton
          label="Go Back"
          testID="success-go-back"
          onPress={() => navigation.goBack()}
          style={s.btn}
        />
      </View>
    </ScreenWrapper>
  );
};

const s = StyleSheet.create({
  box:   { backgroundColor: Colors.backgroundCard, borderRadius: Radius['3xl'], padding: Spacing['2xl'], alignItems: 'center', ...Shadows.lg },
  icon:  { fontSize: 56, marginBottom: Spacing.base },
  title: { fontSize: FontSize['5xl'], fontWeight: FontWeight.black, color: Colors.textPrimary, marginBottom: Spacing.sm, textAlign: 'center' },
  msg:   { fontSize: FontSize.lg, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.sm },
  btn:   { marginTop: Spacing.base },
});

export default SuccessScreen;
