import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import ActionButton from '../../../components/common/ActionButton';
import { Card8S2RouteProp, RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';

const Card8_S2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { size } = useRoute<Card8S2RouteProp>().params;
  const scale = size / 180;

  return (
    <ScreenWrapper>
      <Text style={s.heading}>Scaled Content</Text>
      <Text style={s.sub}>Box: {Math.round(size)}px — Scale: ×{scale.toFixed(2)}</Text>
      <View style={s.arena}>
        <View style={[s.box, { width: size, height: size }]}>
          <Text style={[s.boxTitle, { fontSize: FontSize['2xl'] * scale }]}>Content</Text>
          <Text style={[s.boxSub, { fontSize: FontSize.base * scale }]}>Scales with box</Text>
          <View style={[s.dot, { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale }]} />
        </View>
      </View>
      <ActionButton label="Validate Layout →" testID="c8-s2-next" onPress={() => navigation.navigate('Card8_S3', { size })} />
    </ScreenWrapper>
  );
};

const s = StyleSheet.create({
  heading: { fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.xs },
  sub:     { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: Spacing.xl },
  arena:   { flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 320 },
  box:     { backgroundColor: Colors.success + '22', borderWidth: 2, borderColor: Colors.success, borderRadius: Radius.lg, justifyContent: 'center', alignItems: 'center', gap: Spacing.sm },
  boxTitle:{ fontWeight: FontWeight.bold, color: Colors.success },
  boxSub:  { color: Colors.textSecondary },
  dot:     { backgroundColor: Colors.success },
});

export default Card8_S2;
