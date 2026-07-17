import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';

const { width } = Dimensions.get('window');

const Card5_S1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const targetX   = useRef(new Animated.Value(0)).current;
  const targetY   = useRef(new Animated.Value(0)).current;
  const targetOp  = useRef(new Animated.Value(1)).current;
  const decoyX    = useRef(new Animated.Value(0)).current;
  const rotation  = useRef(new Animated.Value(0)).current;
  const fadeVal   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.parallel([
        Animated.timing(targetX,  { toValue: width - 120, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(targetOp, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(targetX,  { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(targetY,  { toValue: 60, duration: 2000, useNativeDriver: true }),
        Animated.timing(targetOp, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ]),
      Animated.timing(targetY, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.sequence([
      Animated.timing(decoyX, { toValue: width - 140, duration: 1200, useNativeDriver: true }),
      Animated.timing(decoyX, { toValue: 0, duration: 1200, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.timing(rotation, { toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true })).start();

    Animated.loop(Animated.sequence([
      Animated.timing(fadeVal, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.timing(fadeVal, { toValue: 1, duration: 800, useNativeDriver: true }),
    ])).start();
  }, []);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.heading}>Animation Interference</Text>
      <Text style={s.hint}>Tap the moving TARGET (not the decoys)</Text>
      <View style={s.arena}>
        <Animated.View style={[s.decoy, { transform: [{ translateX: decoyX }] }]}>
          <Text style={s.decoyText}>DECOY</Text>
        </Animated.View>
        <Animated.Text style={[s.rotIcon, { transform: [{ rotate: spin }] }]}>⚙️</Animated.Text>
        <Animated.View style={[s.fadeBox, { opacity: fadeVal }]}>
          <Text style={s.fadeText}>FADE</Text>
        </Animated.View>
        <Animated.View style={[s.targetWrap, { transform: [{ translateX: targetX }, { translateY: targetY }], opacity: targetOp }]}>
          <TouchableOpacity testID="c5-target-btn" style={s.targetBtn} onPress={() => navigation.navigate('Card5_S2')}>
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
  hint:       { fontSize: FontSize.base, color: Colors.textSecondary, paddingHorizontal: Spacing.base, marginBottom: Spacing.base },
  arena:      { flex: 1, position: 'relative', margin: Spacing.base, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  decoy:      { position: 'absolute', top: 40, backgroundColor: Colors.border, borderRadius: Radius.sm, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.base },
  decoyText:  { fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: FontWeight.semibold },
  rotIcon:    { position: 'absolute', top: 120, left: 40, fontSize: 40 },
  fadeBox:    { position: 'absolute', top: 200, right: 40, backgroundColor: Colors.textMuted, borderRadius: Radius.md, padding: Spacing.md },
  fadeText:   { color: Colors.white, fontWeight: FontWeight.bold },
  targetWrap: { position: 'absolute', top: 80, left: 20 },
  targetBtn:  { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  targetText: { color: Colors.white, fontWeight: FontWeight.black, fontSize: FontSize.lg },
});

export default Card5_S1;
