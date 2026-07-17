import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';

const { width } = Dimensions.get('window');
const CLUTTER_COUNT = 5;

const Card5_S2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const clutterAnims = Array.from({ length: CLUTTER_COUNT }, () => useRef(new Animated.Value(0)).current);
  const targetX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    clutterAnims.forEach((a, i) => {
      Animated.loop(Animated.sequence([
        Animated.timing(a, { toValue: width - 100, duration: 400 + i * 80, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: 400 + i * 80, easing: Easing.linear, useNativeDriver: true }),
      ])).start();
    });
    Animated.loop(Animated.sequence([
      Animated.timing(targetX, { toValue: width - 120, duration: 700, useNativeDriver: true }),
      Animated.timing(targetX, { toValue: 0, duration: 700, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.heading}>High Speed Clutter</Text>
      <Text style={s.hint}>Tap TARGET among fast-moving elements</Text>
      <View style={s.arena}>
        {clutterAnims.map((a, i) => (
          <Animated.View key={i} style={[s.clutter, { top: 30 + i * 55, transform: [{ translateX: a }] }]}>
            <Text style={s.clutterText}>NOISE {i + 1}</Text>
          </Animated.View>
        ))}
        <Animated.View style={[s.targetWrap, { transform: [{ translateX: targetX }] }]}>
          <TouchableOpacity testID="c5-s2-target" style={s.targetBtn} onPress={() => navigation.navigate('Card5_S3')}>
            <Text style={s.targetText}>TARGET</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: Colors.background },
  heading:    { fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, padding: Spacing.base },
  hint:       { fontSize: FontSize.base, color: Colors.textSecondary, paddingHorizontal: Spacing.base, marginBottom: Spacing.sm },
  arena:      { flex: 1, position: 'relative', margin: Spacing.base, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  clutter:    { position: 'absolute', backgroundColor: Colors.border, borderRadius: Radius.sm, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md },
  clutterText:{ fontSize: FontSize.sm, color: Colors.textSecondary },
  targetWrap: { position: 'absolute', bottom: 60 },
  targetBtn:  { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  targetText: { color: Colors.white, fontWeight: FontWeight.black, fontSize: FontSize.lg },
});

export default Card5_S2;
