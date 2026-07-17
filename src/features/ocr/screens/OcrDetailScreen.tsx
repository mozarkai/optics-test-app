import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { TextDetailRouteProp } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows, palette } from '../../../theme';

const { width } = Dimensions.get('window');
const STAT_WIDTH = (width - Spacing.lg * 2 - Spacing.md) / 2;

const FEATURE_ACTIONS = ['📊 Export Data', '🔍 Search Text', '📝 Edit Text', '📤 Share Results'];

const OcrDetailScreen = memo(() => {
  const { image } = useRoute<TextDetailRouteProp>().params;

  const results = {
    stats: [
      { label: 'Confidence',  value: '98.7%'   },
      { label: 'Language',    value: 'English'  },
      { label: 'Processing',  value: '0.23s'    },
      { label: 'Characters',  value: '67'       },
    ],
    blocks: [
      { text: 'INVOICE',                    confidence: 99.2, bounds: { x: 50, y: 20, w: 100, h: 30 } },
      { text: 'Date: 2024-01-15',           confidence: 97.8, bounds: { x: 50, y: 60, w: 150, h: 20 } },
      { text: 'Amount: $299.99',            confidence: 98.5, bounds: { x: 50, y: 90, w: 130, h: 20 } },
      { text: 'Thank you for your business!', confidence: 96.3, bounds: { x: 30, y: 130, w: 200, h: 25 } },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Document preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Original Document</Text>
          <View style={[styles.preview, { backgroundColor: image.backgroundColor }]}>
            <Text style={styles.previewText}>{image.text}</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Summary</Text>
          <View style={styles.statsGrid}>
            {results.stats.map(s => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Text blocks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extracted Text Blocks</Text>
          {results.blocks.map((b, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.blockRow}>
                <Text style={styles.blockText}>"{b.text}"</Text>
                <Text style={styles.badge}>{b.confidence}%</Text>
              </View>
              <Text style={styles.boundsText}>
                Position: ({b.bounds.x}, {b.bounds.y}) • Size: {b.bounds.w}×{b.bounds.h}
              </Text>
            </View>
          ))}
        </View>

        {/* Feature actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Features</Text>
          <View style={styles.actionsGrid}>
            {FEATURE_ACTIONS.map(label => (
              <TouchableOpacity key={label} style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Processing demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing Demo</Text>
          <View style={styles.card}>
            <Text style={styles.demoText}>🔍 Scanning document...</Text>
            <View style={styles.progressBar}><View style={styles.progressFill} /></View>
            <Text style={styles.demoText}>✅ Text extraction complete!</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll:    { paddingHorizontal: Spacing.lg, paddingTop: Spacing.base, paddingBottom: Spacing['2xl'] },
  section:   { marginBottom: Spacing['2xl'] + 2 },
  sectionTitle: { fontSize: FontSize['3xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  card: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, marginBottom: Spacing.md, ...Shadows.md },
  preview: { borderRadius: Radius.lg, padding: Spacing.lg, minHeight: 120, justifyContent: 'center', alignItems: 'center', ...Shadows.md },
  previewText: { fontSize: FontSize.base, color: Colors.textPrimary, textAlign: 'center', lineHeight: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  statCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center', width: STAT_WIDTH, ...Shadows.md },
  statLabel: { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: Spacing.sm },
  statValue: { fontSize: FontSize['2xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary },
  blockRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  blockText: { fontSize: FontSize.lg, color: Colors.textPrimary, flex: 1, fontStyle: 'italic' },
  badge: {
    backgroundColor: Colors.success,
    color: Colors.textInverse,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    marginLeft: Spacing.sm,
    overflow: 'hidden',
  },
  boundsText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  actionBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center', width: STAT_WIDTH, ...Shadows.md },
  actionBtnText: { color: Colors.textInverse, fontSize: FontSize.base, fontWeight: FontWeight.semibold },
  demoText: { fontSize: FontSize.lg, color: Colors.textPrimary, marginVertical: Spacing.sm, textAlign: 'center' },
  progressBar: { width: '80%', height: 8, backgroundColor: Colors.border, borderRadius: Radius.full, marginVertical: Spacing.md, overflow: 'hidden', alignSelf: 'center' },
  progressFill: { width: '100%', height: '100%', backgroundColor: Colors.success, borderRadius: Radius.full },
});

export default OcrDetailScreen;
