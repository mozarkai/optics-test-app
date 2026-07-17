import React, { useState, useCallback, memo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Dimensions,
  Alert, FlatList, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../../../theme';

const { width } = Dimensions.get('window');
const HALF = (width - Spacing.lg * 2 - Spacing.md) / 2;

// ─── Types ────────────────────────────────────────────────────────────────────

type ListItem = {
  id: string;
  text: string;
  color: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WORDS = [
  'apple','banana','cherry','date','elderberry','fig','grape','honeydew','kiwi','lemon',
  'mango','nectarine','orange','peach','quince','raspberry','strawberry','tangerine',
  'vanilla','watermelon','algorithm','binary','cache','debug','encryption','firewall',
  'gateway','hash','interface','javascript','kernel','lambda','middleware','namespace',
  'object','protocol','quantum','router','server','token','unicode','virtual','wireless',
  'xml','yaml','zip','azure','cobalt','denim','emerald','fuchsia',
];

const makeItem = (i: number): ListItem => ({
  id: Math.random().toString(36).slice(2),
  text: `${WORDS[Math.floor(Math.random() * WORDS.length)]} ${i + 1}`,
  color: `hsl(${Math.floor(Math.random() * 360)}, 65%, 82%)`,
});

const INITIAL_ITEMS = Array.from({ length: 50 }, (_, i) => makeItem(i));

// ─── Sub-components ───────────────────────────────────────────────────────────

const ListRow = memo(({ item, selected, editing, onPress, onLongPress }: {
  item: ListItem;
  selected: boolean;
  editing: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.row, { backgroundColor: item.color }, selected && styles.rowSelected]}
    onPress={onPress}
    onLongPress={onLongPress}
    activeOpacity={0.75}
  >
    <Text style={styles.rowText} numberOfLines={1}>{item.text}</Text>
    {selected && <Text style={styles.rowCheck}>✓</Text>}
  </TouchableOpacity>
));

// ─── Main Screen ──────────────────────────────────────────────────────────────

const ScrollSwipeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // List state
  const [items, setItems]               = useState<ListItem[]>(INITIAL_ITEMS);
  const [editing, setEditing]           = useState(false);
  const [selected, setSelected]         = useState<Set<string>>(new Set());
  const [inputText, setInputText]       = useState('');

  // Interactive widget state
  const [tapCount, setTapCount]         = useState(0);
  const [counter, setCounter]           = useState(0);
  const [toggled, setToggled]           = useState(false);
  const [sliderVal, setSliderVal]       = useState(3);   // 1–5 star rating

  // ── List handlers ──────────────────────────────────────────────────────────

  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const addItem = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;
    setItems(prev => [{ id: Math.random().toString(36).slice(2), text, color: `hsl(${Math.floor(Math.random() * 360)}, 65%, 82%)` }, ...prev]);
    setInputText('');
  }, [inputText]);

  const deleteSelected = useCallback(() => {
    if (!selected.size) { Alert.alert('Nothing selected'); return; }
    Alert.alert('Delete', `Remove ${selected.size} item(s)?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setItems(prev => prev.filter(i => !selected.has(i.id)));
        setSelected(new Set());
        setEditing(false);
      }},
    ]);
  }, [selected]);

  const renderItem = useCallback(({ item }: { item: ListItem }) => (
    <ListRow
      item={item}
      selected={selected.has(item.id)}
      editing={editing}
      onPress={() => editing ? toggleSelect(item.id) : null}
      onLongPress={() => { setEditing(true); toggleSelect(item.id); }}
    />
  ), [selected, editing, toggleSelect]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Section 1: Interactive widgets ─────────────────────────────── */}
        <Text style={styles.sectionTitle}>Interactive Elements</Text>
        <View style={styles.widgetGrid}>

          {/* Tap counter */}
          <TouchableOpacity
            style={[styles.widget, { backgroundColor: Colors.primary }]}
            onPress={() => { setTapCount(n => n + 1); Alert.alert('Tapped!', `${tapCount + 1} taps so far`); }}
          >
            <Text style={styles.widgetLabel}>Tap Me</Text>
            <Text style={styles.widgetValue}>{tapCount}</Text>
          </TouchableOpacity>

          {/* Counter +/- */}
          <View style={[styles.widget, { backgroundColor: Colors.success }]}>
            <Text style={styles.widgetLabel}>Counter</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity onPress={() => setCounter(n => Math.max(0, n - 1))} style={styles.counterBtn}>
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.widgetValue}>{counter}</Text>
              <TouchableOpacity onPress={() => setCounter(n => n + 1)} style={styles.counterBtn}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Toggle */}
          <View style={[styles.widget, { backgroundColor: toggled ? '#f5576c' : Colors.textSecondary }]}>
            <Text style={styles.widgetLabel}>Toggle</Text>
            <Switch
              value={toggled}
              onValueChange={setToggled}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.6)' }}
              thumbColor={Colors.white}
            />
            <Text style={styles.widgetValue}>{toggled ? 'ON' : 'OFF'}</Text>
          </View>

          {/* Star rating */}
          <View style={[styles.widget, { backgroundColor: '#ed8936' }]}>
            <Text style={styles.widgetLabel}>Rating</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(s => (
                <TouchableOpacity key={s} onPress={() => setSliderVal(s)}>
                  <Text style={{ fontSize: 18, color: s <= sliderVal ? '#fff' : 'rgba(255,255,255,0.35)' }}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>

        {/* ── Section 2: Bounded scrollable list ─────────────────────────── */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionTitle}>List  <Text style={styles.listCount}>({items.length})</Text></Text>
          <View style={styles.listActions}>
            <TouchableOpacity
              style={[styles.actionBtn, editing && styles.actionBtnActive]}
              onPress={() => { setEditing(e => !e); setSelected(new Set()); }}
            >
              <Text style={[styles.actionBtnText, editing && styles.actionBtnTextActive]}>
                {editing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
            {editing && selected.size > 0 && (
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDanger]} onPress={deleteSelected}>
                <Text style={[styles.actionBtnText, { color: Colors.white }]}>Delete ({selected.size})</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Add item row — always visible */}
        <View style={styles.addRow}>
          <TextInput
            style={styles.addInput}
            placeholder="Add new item…"
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addItem}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addBtn} onPress={addItem}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Fixed-height bounded FlatList — NOT full screen */}
        <View style={styles.listBox}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={i => i.id}
            showsVerticalScrollIndicator
            contentContainerStyle={styles.listContent}
            nestedScrollEnabled
          />
        </View>

        {/* ── Section 3: Navigate to Animation ───────────────────────────── */}
        <TouchableOpacity
          style={styles.animBtn}
          onPress={() => navigation.navigate('Animation')}
          activeOpacity={0.85}
        >
          <Text style={styles.animBtnTitle}>🎭  View Animation Demo</Text>
          <Text style={styles.animBtnSub}>InstaBIZ-style loading animations</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll:    { paddingHorizontal: Spacing.lg, paddingTop: Spacing.base, paddingBottom: Spacing['2xl'] },

  sectionTitle: { fontSize: FontSize['3xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  listCount:    { fontSize: FontSize.lg, fontWeight: FontWeight.regular, color: Colors.textSecondary },

  // Widget grid
  widgetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing['2xl'] },
  widget: {
    width: HALF,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
    gap: Spacing.xs,
    ...Shadows.md,
  },
  widgetLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5 },
  widgetValue: { fontSize: FontSize['5xl'], fontWeight: FontWeight.black, color: Colors.white },
  counterRow:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  counterBtn:  { width: 28, height: 28, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  counterBtnText: { fontSize: FontSize['2xl'], color: Colors.white, fontWeight: FontWeight.bold, lineHeight: 26 },
  starsRow:    { flexDirection: 'row', gap: 2 },

  // List header
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  listActions:   { flexDirection: 'row', gap: Spacing.sm },
  actionBtn:     { backgroundColor: Colors.border, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2 },
  actionBtnActive: { backgroundColor: Colors.primary },
  actionBtnDanger: { backgroundColor: Colors.error },
  actionBtnText:   { fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: FontWeight.semibold },
  actionBtnTextActive: { color: Colors.white },

  // Add row
  addRow:  { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  addInput: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addBtn:     { backgroundColor: Colors.success, borderRadius: Radius.md, paddingHorizontal: Spacing.base, justifyContent: 'center', ...Shadows.sm },
  addBtnText: { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },

  // Bounded list box — fixed height, scrolls internally
  listBox: {
    height: 280,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing['2xl'],
    ...Shadows.md,
  },
  listContent: { padding: Spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  rowSelected: { borderWidth: 2, borderColor: Colors.primary },
  rowText:     { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  rowCheck:    { fontSize: FontSize.lg, color: Colors.primary, fontWeight: FontWeight.bold },

  // Animation button
  animBtn: {
    backgroundColor: Colors.primaryDark,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.lg,
  },
  animBtnTitle: { fontSize: FontSize['2xl'], color: Colors.white, fontWeight: FontWeight.bold, marginBottom: Spacing.xs },
  animBtnSub:   { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
});

export default ScrollSwipeScreen;
