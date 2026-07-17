import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ActionButton from '../../../components/common/ActionButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';

const MIN = 100, MAX = 300;

const Card8_S1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [size, setSize] = useState(180);
  const last = useRef(180);

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => setSize(Math.min(MAX, Math.max(MIN, last.current + g.dx))),
    onPanResponderRelease: (_, g) => { last.current = Math.min(MAX, Math.max(MIN, last.current + g.dx)); },
  })).current;

  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <Text style={s.heading}>Resizable Box</Text>
        <Text style={s.hint}>Drag ↘ handle or use buttons. Size: {Math.round(size)}px</Text>
        <View style={s.arena}>
          <View style={[s.box, { width: size, height: size }]}>
            <Text style={s.boxText}>Resize Me</Text>
            <Text style={s.boxSize}>{Math.round(size)}×{Math.round(size)}</Text>
            <View style={s.handle} {...pan.panHandlers} testID="c8-resize-handle">
              <Text style={s.handleIcon}>↘</Text>
            </View>
          </View>
        </View>
        <View style={s.btnRow}>
          <TouchableOpacity style={s.btn} testID="c8-increase" onPress={() => { const n = Math.min(MAX, size + 40); setSize(n); last.current = n; }}>
            <Text style={s.btnText}>+ Increase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: Colors.error }]} testID="c8-decrease" onPress={() => { const n = Math.max(MIN, size - 40); setSize(n); last.current = n; }}>
            <Text style={s.btnText}>− Decrease</Text>
          </TouchableOpacity>
        </View>
        <ActionButton label="Next →" testID="c8-next" onPress={() => navigation.navigate('Card8_S2', { size })} />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content:   { flex: 1, padding: Spacing.lg },
  heading:   { fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.xs },
  hint:      { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: Spacing.xl },
  arena:     { flex: 1, justifyContent: 'center', alignItems: 'center' },
  box:       { backgroundColor: Colors.primary + '22', borderWidth: 2, borderColor: Colors.primary, borderRadius: Radius.lg, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  boxText:   { fontSize: FontSize['2xl'], fontWeight: FontWeight.bold, color: Colors.primary },
  boxSize:   { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  handle:    { position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, backgroundColor: Colors.primary, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  handleIcon:{ color: Colors.white, fontSize: FontSize.base, fontWeight: FontWeight.bold },
  btnRow:    { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  btn:       { flex: 1, backgroundColor: Colors.primary, borderRadius: Radius.xl, padding: Spacing.md, alignItems: 'center' },
  btnText:   { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
});

export default Card8_S1;
