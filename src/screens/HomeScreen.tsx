import React, { memo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { CARD_CONFIG, CardConfig, CardEntryRoute } from '../features/cards/cardConfig';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../theme';

const CardRow = memo(({ item, onPress }: { item: CardConfig; onPress: () => void }) => (
  <TouchableOpacity
    testID={`home-card-${item.num}`}
    style={s.card}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[s.badge, { backgroundColor: item.color }]}>
      <Text style={s.badgeNum}>{item.num}</Text>
    </View>
    <View style={s.body}>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.sub}>{item.subtitle}</Text>
    </View>
    <Text style={[s.arrow, { color: item.color }]}>›</Text>
  </TouchableOpacity>
));

const HomeScreen = memo(() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToCard = (screen: CardEntryRoute) => navigation.navigate(screen);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.appTitle}>Optics Super App</Text>
        <Text style={s.appSub}>{`${CARD_CONFIG.length} automation testing scenarios`}</Text>
      </View>
      <FlatList
        data={CARD_CONFIG}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <CardRow item={item} onPress={() => navigateToCard(item.screen)} />
        )}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header:    { paddingHorizontal: Spacing.lg, paddingTop: Spacing.base, paddingBottom: Spacing.md },
  appTitle:  { fontSize: FontSize['7xl'], fontWeight: FontWeight.black, color: Colors.textPrimary },
  appSub:    { fontSize: FontSize.base, color: Colors.textSecondary, marginTop: Spacing.xs },
  list:      { paddingHorizontal: Spacing.lg, paddingBottom: Spacing['3xl'] },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  badge:    { width: 44, height: 44, borderRadius: Radius.lg, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  badgeNum: { color: Colors.white, fontWeight: FontWeight.black, fontSize: FontSize.lg },
  body:     { flex: 1 },
  title:    { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 2 },
  sub:      { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18 },
  arrow:    { fontSize: 28, fontWeight: FontWeight.black, marginLeft: Spacing.sm },
});

export default HomeScreen;
