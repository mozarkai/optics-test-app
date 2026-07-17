import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionButton from '../../../components/common/ActionButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';
import { generateListItems } from '../../../utils/dataUtils';

const ITEMS = generateListItems(25);

const Card3_S1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={s.container}>
      <View style={s.staticHeader}>
        <Text style={s.headerTitle}>Partial Scroll Container</Text>
        <Text style={s.headerSub}>Only the middle area scrolls</Text>
      </View>

      <View style={s.scrollBox}>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator testID="c3-scroll">
          {ITEMS.map((item, i) => (
            <View key={item.id} style={s.item} testID={`c3-item-${i}`}>
              <Text style={s.itemText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={s.staticFooter}>
        <Text style={s.footerNote}>Footer stays fixed. Scroll above is contained.</Text>
        <ActionButton label="Next →" testID="c3-s1-next" onPress={() => navigation.navigate('Card3_S2')} style={s.btn} />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: Colors.background },
  staticHeader: { backgroundColor: Colors.primary, padding: Spacing.base, alignItems: 'center' },
  headerTitle:  { fontSize: FontSize['2xl'], fontWeight: FontWeight.bold, color: Colors.white },
  headerSub:    { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  scrollBox:    { flex: 1, margin: Spacing.base, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  item:         { paddingVertical: Spacing.md, paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  itemText:     { fontSize: FontSize.base, color: Colors.textPrimary },
  staticFooter: { backgroundColor: Colors.backgroundCard, padding: Spacing.base, borderTopWidth: 1, borderTopColor: Colors.border },
  footerNote:   { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.sm, textAlign: 'center' },
  btn:          { marginTop: 0 },
});

export default Card3_S1;
