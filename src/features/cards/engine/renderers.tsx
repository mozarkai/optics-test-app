/**
 * Content Renderers
 * Each function renders one ContentConfig type.
 * CardScreen calls the right renderer based on config.type.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
  FlatList, ActivityIndicator, TextInput, ScrollView, Keyboard,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';
import { generateListItems, randomId, randomColor, randomDelay } from '../../../utils/dataUtils';
import type {
  TextBlockConfig, TapTargetConfig, DelayedRevealConfig,
  ValidationListConfig, InfiniteListConfig, EditableListConfig,
  ScaledImagesConfig, MultiLangConfig, FlickerConfig,
  RandomLayoutConfig, MisleadingButtonsConfig, LagButtonConfig,
  OcrCalibrationConfig, AoiFocusConfig, CombinedScrollConfig,
  DrmSimulationConfig, InputVariationsConfig,
} from './types';

// ─── Shared nav helper ────────────────────────────────────────────────────────
const useNav = () => useNavigation<NavigationProp<RootStackParamList>>();

// ─── TextBlock ────────────────────────────────────────────────────────────────
export const RenderTextBlock = ({ cfg }: { cfg: TextBlockConfig }) => {
  const style: object[] = [s.normal];
  if (cfg.lowContrast) style.push(s.lowContrast);
  if (cfg.rotate) style.push({ transform: [{ rotate: cfg.rotate }] });

  const inner = (
    <Text
      testID={cfg.testID}
      selectable={cfg.selectable ?? true}
      style={style}
    >
      {cfg.content}
    </Text>
  );

  if (cfg.narrow) return <View style={s.narrow}>{inner}</View>;
  if (cfg.rotate === '90deg') return <View style={s.rotateWrap}>{inner}</View>;
  return inner;
};

// ─── TapTarget ────────────────────────────────────────────────────────────────
export const RenderTapTarget = ({ cfg }: { cfg: TapTargetConfig }) => {
  const nav = useNav();
  const handle = (i: number) => {
    if (i === cfg.correctIndex) nav.navigate(cfg.onCorrect as any);
    else Alert.alert('Wrong!', cfg.wrongMessage);
  };
  return (
    <View style={s.grid}>
      {Array.from({ length: cfg.count }, (_, i) => (
        <TouchableOpacity
          key={i}
          testID={`${cfg.testIDPrefix}-${i}`}
          style={[s.tapBtn, i === cfg.correctIndex && s.tapBtnCorrect]}
          onPress={() => handle(i)}
        >
          <Text style={s.tapBtnText}>{cfg.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── DelayedReveal ────────────────────────────────────────────────────────────
export const RenderDelayedReveal = ({ cfg }: { cfg: DelayedRevealConfig }) => {
  const nav = useNav();
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [tapTriggered, setTapTriggered] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers = cfg.items
      .filter(i => i.trigger === 'timer')
      .map(i => setTimeout(() => setVisible(p => new Set([...p, i.id])), i.delayMs ?? 3000));
    return () => timers.forEach(clearTimeout);
  }, [cfg.items]);

  return (
    <View style={s.revealList}>
      {cfg.items.map(item => {
        const shown = visible.has(item.id) || tapTriggered.has(item.id);
        return (
          <View key={item.id} style={s.revealRow}>
            <Text style={s.revealLabel}>{item.label}</Text>
            {item.trigger === 'tap' && !shown ? (
              <TouchableOpacity
                testID={`${item.testID}-trigger`}
                style={s.triggerBtn}
                onPress={() => setTapTriggered(p => new Set([...p, item.id]))}
              >
                <Text style={s.triggerText}>Tap to reveal</Text>
              </TouchableOpacity>
            ) : shown ? (
              <TouchableOpacity
                testID={item.testID}
                style={s.revealedBtn}
                onPress={() => item.onRevealNavigate && nav.navigate(item.onRevealNavigate as any)}
              >
                <Text style={s.revealedText}>✅ Visible — Tap →</Text>
              </TouchableOpacity>
            ) : (
              <Text style={s.waiting} testID={`${item.testID}-waiting`}>⏳ Waiting…</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

// ─── ValidationList ───────────────────────────────────────────────────────────
export const RenderValidationList = ({ cfg }: { cfg: ValidationListConfig }) => {
  const [results, setResults] = useState<string[]>([]);

  const validateAny = () => {
    const found = cfg.elements.filter(e => e.present);
    setResults([`ANY: ${found.length}/${cfg.elements.length} → PASS`, ...found.map(e => `✅ ${e.label}`)]);
    Alert.alert('ANY', `${found.length} present. PASS`);
  };
  const validateAll = () => {
    const missing = cfg.elements.filter(e => !e.present);
    setResults([`ALL: ${missing.length} missing → FAIL`, ...missing.map(e => `❌ ${e.label}`)]);
    Alert.alert('ALL', `Missing: ${missing.map(e => e.label).join(', ')}. FAIL`);
  };

  return (
    <View>
      {cfg.elements.map(el => (
        <View key={el.id} style={s.valRow} testID={el.present ? `${cfg.testIDPrefix}-${el.id}` : undefined}>
          <View style={[s.dot, { backgroundColor: el.present ? Colors.success : Colors.error }]} />
          <Text style={s.valLabel}>{el.label}</Text>
          <Text style={[s.valStatus, { color: el.present ? Colors.success : Colors.error }]}>
            {el.present ? 'Present' : 'Missing'}
          </Text>
        </View>
      ))}
      <View style={s.valBtnRow}>
        <TouchableOpacity style={[s.valBtn, { backgroundColor: Colors.primary }]} testID={`${cfg.testIDPrefix}-any`} onPress={validateAny}>
          <Text style={s.valBtnText}>Validate ANY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.valBtn, { backgroundColor: Colors.error }]} testID={`${cfg.testIDPrefix}-all`} onPress={validateAll}>
          <Text style={s.valBtnText}>Validate ALL</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 && (
        <View style={s.resultBox}>
          {results.map((r, i) => <Text key={i} style={s.resultText}>{r}</Text>)}
        </View>
      )}
    </View>
  );
};

// ─── InfiniteList ─────────────────────────────────────────────────────────────
export const RenderInfiniteList = ({ cfg }: { cfg: InfiniteListConfig }) => {
  const nav = useNav();
  const [items, setItems] = useState(() =>
    Array.from({ length: cfg.pageSize }, (_, i) => ({ id: i + 1, label: `Row ${i + 1}` }))
  );
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems(p => [...p, ...Array.from({ length: cfg.pageSize }, (_, i) => ({ id: p.length + i + 1, label: `Row ${p.length + i + 1}` }))]);
      setLoading(false);
    }, 800);
  }, [loading, cfg.pageSize]);

  return (
    <FlatList
      data={items}
      keyExtractor={i => String(i.id)}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      style={s.infiniteList}
      ListFooterComponent={loading ? <ActivityIndicator color={Colors.primary} style={s.spinner} /> : null}
      renderItem={({ item }) => (
        <TouchableOpacity
          testID={`${cfg.testIDPrefix}-${item.id}`}
          style={[s.listRow, item.id === cfg.targetId && s.targetRow]}
          onPress={() => item.id === cfg.targetId ? nav.navigate(cfg.onTargetPress as any) : null}
        >
          <Text style={[s.listRowText, item.id === cfg.targetId && s.targetText]}>{item.label}</Text>
          {item.id === cfg.targetId && <Text style={s.targetBadge}>TARGET →</Text>}
        </TouchableOpacity>
      )}
    />
  );
};

// ─── EditableList ─────────────────────────────────────────────────────────────
export const RenderEditableList = ({ cfg }: { cfg: EditableListConfig }) => {
  const nav = useNav();
  const [items, setItems] = useState(() => generateListItems(cfg.initialCount));
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    setItems(p => [{ id: randomId(), text: input.trim(), color: randomColor() }, ...p]);
    setInput('');
  };

  return (
    <View>
      <View style={s.addRow}>
        <TextInput
          style={s.addInput}
          value={input}
          onChangeText={setInput}
          placeholder="New item…"
          placeholderTextColor={Colors.textMuted}
          onSubmitEditing={add}
          returnKeyType="done"
          testID={`${cfg.testIDPrefix}-input`}
        />
        <TouchableOpacity style={s.addBtn} testID={`${cfg.testIDPrefix}-add`} onPress={add}>
          <Text style={s.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.listCount}>{items.length} items</Text>
      <View style={s.editListBox}>
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          nestedScrollEnabled
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID={`${cfg.testIDPrefix}-item-${index}`}
              style={s.editRow}
              onPress={() => index === 0 && cfg.onItemPress ? nav.navigate(cfg.onItemPress as any) : null}
            >
              <Text style={s.editRowText}>{item.text}</Text>
              {index === 0 && cfg.onItemPress && <Text style={s.editRowNav}>→</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

// ─── ScaledImages ─────────────────────────────────────────────────────────────
export const RenderScaledImages = ({ cfg }: { cfg: ScaledImagesConfig }) => {
  const nav = useNav();
  return (
    <View style={s.scaleGrid}>
      {cfg.scales.map((scale, i) => (
        <TouchableOpacity
          key={i}
          testID={`${cfg.testIDPrefix}-${i}`}
          style={s.scaleCell}
          onPress={() => nav.navigate(cfg.onPress as any)}
        >
          <View style={[s.scaleBox, { transform: [{ scale }] }]}>
            <Text style={s.scaleText}>{cfg.label}</Text>
          </View>
          <Text style={s.scaleLabel}>×{scale}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── MultiLang ────────────────────────────────────────────────────────────────
export const RenderMultiLang = ({ cfg }: { cfg: MultiLangConfig }) => {
  const nav = useNav();
  return (
    <View style={s.langGrid}>
      {cfg.words.map((w, i) => (
        <TouchableOpacity
          key={i}
          testID={`${cfg.testIDPrefix}-${i}`}
          style={s.langBtn}
          onPress={() => w.correct ? nav.navigate(cfg.onCorrect as any) : Alert.alert('Wrong', `"${w.text}" is ${w.lang}. Try again.`)}
        >
          <Text style={s.langWord}>{w.text}</Text>
          <Text style={s.langLabel}>{w.lang}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── Flicker ──────────────────────────────────────────────────────────────────
const FlickerItem = ({ item }: { item: FlickerConfig['items'][0] }) => {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), item.intervalMs);
    return () => clearInterval(t);
  }, [item.intervalMs]);
  return (
    <View style={s.flickerRow}>
      <Text style={s.flickerLabel}>{item.label} ({item.intervalMs}ms)</Text>
      {on
        ? <View style={[s.flickerPill, { backgroundColor: item.color }]} testID={item.id}><Text style={s.flickerOn}>ON</Text></View>
        : <View style={[s.flickerPill, { backgroundColor: Colors.border }]}><Text style={s.flickerOff}>OFF</Text></View>
      }
    </View>
  );
};

export const RenderFlicker = ({ cfg }: { cfg: FlickerConfig }) => (
  <View>{cfg.items.map(item => <FlickerItem key={item.id} item={item} />)}</View>
);

// ─── RandomLayout ─────────────────────────────────────────────────────────────
export const RenderRandomLayout = ({ cfg }: { cfg: RandomLayoutConfig }) => {
  const nav = useNav();
  const [order, setOrder] = useState(cfg.buttons);
  const shuffle = () => setOrder(p => [...p].sort(() => Math.random() - 0.5));
  return (
    <View>
      <View style={s.randomGrid}>
        {order.map(btn => (
          <TouchableOpacity
            key={btn.id}
            testID={`${cfg.testIDPrefix}-${btn.id}`}
            style={[s.randomBtn, { backgroundColor: btn.color }]}
            onPress={() => cfg.onPress ? nav.navigate(cfg.onPress as any) : null}
          >
            <Text style={s.randomBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={s.shuffleBtn} testID={`${cfg.testIDPrefix}-shuffle`} onPress={shuffle}>
        <Text style={s.shuffleBtnText}>🔀 Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── MisleadingButtons ────────────────────────────────────────────────────────
export const RenderMisleadingButtons = ({ cfg }: { cfg: MisleadingButtonsConfig }) => {
  const [attempts, setAttempts] = useState(0);
  // Vary color/size/padding slightly for decoys
  const variants = Array.from({ length: cfg.count }, (_, i) => ({
    color:   i === cfg.correctIndex ? Colors.primary : `rgba(102,126,234,${0.5 + i * 0.1})`,
    size:    i === cfg.correctIndex ? FontSize.lg : FontSize.lg - (i % 3),
    padding: i === cfg.correctIndex ? Spacing.md : Spacing.md - (i % 3) * 2,
  }));

  return (
    <View>
      <Text style={s.misleadHint}>Attempts: {attempts}</Text>
      <View style={s.misleadGrid}>
        {variants.map((v, i) => (
          <TouchableOpacity
            key={i}
            testID={i === cfg.correctIndex ? `${cfg.testIDPrefix}-real` : `${cfg.testIDPrefix}-fake-${i}`}
            style={[s.misleadBtn, { backgroundColor: v.color, paddingVertical: v.padding, paddingHorizontal: v.padding * 2 }]}
            onPress={() => {
              setAttempts(a => a + 1);
              if (i === cfg.correctIndex) Alert.alert('Correct!', `Found on attempt ${attempts + 1}`);
              else Alert.alert('Wrong!', 'Look at color, size, and spacing.');
            }}
          >
            <Text style={[s.misleadBtnText, { fontSize: v.size }]}>{cfg.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ─── LagButton ────────────────────────────────────────────────────────────────
export const RenderLagButton = ({ cfg }: { cfg: LagButtonConfig }) => {
  const nav = useNav();
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const press = () => {
    const lag = cfg.lagMs === 'random' ? randomDelay(200, 3200) : cfg.lagMs;
    setLoading(true);
    const start = Date.now();
    setTimeout(() => {
      const actual = Date.now() - start;
      setLog(p => [`${actual}ms response`, ...p.slice(0, 4)]);
      setLoading(false);
      if (cfg.onSuccess) nav.navigate(cfg.onSuccess as any);
    }, lag);
  };

  return (
    <View>
      <TouchableOpacity
        testID={cfg.testID}
        style={[s.lagBtn, loading && s.lagBtnDisabled]}
        onPress={press}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={Colors.white} size="small" />
          : <Text style={s.lagBtnText}>{cfg.label}</Text>
        }
      </TouchableOpacity>
      {log.map((entry, i) => (
        <Text key={i} style={s.lagLog}>{entry}</Text>
      ))}
    </View>
  );
};

// ─── OCR Calibration ───────────────────────────────────────────────────────────
export const RenderOcrCalibration = ({ cfg }: { cfg: OcrCalibrationConfig }) => {
  const nav = useNav();

  const handlePress = (isCorrect: boolean) => {
    if (isCorrect) {
      nav.navigate(cfg.onCorrect as never);
      return;
    }
    Alert.alert('Wrong target', 'Pick the specific CONFIRM variant requested.');
  };

  return (
    <View style={s.calibrationGrid}>
      {cfg.variants.map((variant, index) => (
        <TouchableOpacity
          key={variant.id}
          testID={`${cfg.testIDPrefix}-${index}`}
          style={[s.calibrationBtn, variant.lowContrast && s.calibrationLowContrast, { top: variant.offsetY ?? 0 }]}
          onPress={() => handlePress(Boolean(variant.correct))}
        >
          <Text
            style={[
              s.calibrationText,
              {
                fontFamily: variant.fontFamily,
                fontSize: variant.fontSize,
                fontWeight: variant.fontWeight ?? '600',
                letterSpacing: variant.letterSpacing ?? 0,
                color: variant.lowContrast ? '#9ea3ad' : Colors.textPrimary,
              },
              variant.blur && s.calibrationBlur,
            ]}
          >
            {cfg.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── AOI Focus ────────────────────────────────────────────────────────────────
export const RenderAoiFocus = ({ cfg }: { cfg: AoiFocusConfig }) => {
  const nav = useNav();
  const [selected, setSelected] = useState<number | null>(null);

  const onPress = (index: number) => {
    setSelected(index);
    if (index === cfg.targetIndex) {
      nav.navigate(cfg.onCorrect as never);
    } else {
      Alert.alert('Outside AOI', 'Detect and tap only within the AOI box.');
    }
  };

  return (
    <View>
      <View style={s.aoiCanvas}>
        {Array.from({ length: cfg.total }, (_, i) => (
          <TouchableOpacity
            key={i}
            testID={`${cfg.testIDPrefix}-${i}`}
            style={[
              s.aoiTarget,
              { left: 12 + (i % 3) * 96, top: 12 + Math.floor(i / 3) * 76 },
              selected === i && s.aoiTargetActive,
            ]}
            onPress={() => onPress(i)}
          >
            <Text style={s.aoiTargetText}>{cfg.label}</Text>
          </TouchableOpacity>
        ))}
        <View
          pointerEvents="none"
          style={[
            s.aoiBox,
            {
              left: cfg.aoi.x,
              top: cfg.aoi.y,
              width: cfg.aoi.width,
              height: cfg.aoi.height,
            },
          ]}
        />
      </View>
      <Text style={s.aoiHint}>Tap the instance inside highlighted AOI only.</Text>
    </View>
  );
};

// ─── Combined Vertical + Horizontal Scroll ───────────────────────────────────
export const RenderCombinedScroll = ({ cfg }: { cfg: CombinedScrollConfig }) => {
  const nav = useNav();
  const [done, setDone] = useState(false);

  return (
    <ScrollView style={s.combinedWrap} nestedScrollEnabled>
      {Array.from({ length: cfg.verticalSections }, (_sectionPos, sectionIndex) => (
        <View key={sectionIndex} style={s.combinedSection}>
          <Text style={s.combinedSectionTitle}>Vertical Section {sectionIndex + 1}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.carousel}>
            {Array.from({ length: cfg.carouselSize }, (_itemPos, itemIndex) => {
              const isTarget = sectionIndex === cfg.verticalSections - 1 && itemIndex === cfg.carouselSize - 1;
              return (
                <TouchableOpacity
                  key={`${sectionIndex}-${itemIndex}`}
                  testID={`${cfg.testIDPrefix}-${sectionIndex}-${itemIndex}`}
                  style={[s.carouselCard, isTarget && s.carouselTarget]}
                  onPress={() => {
                    if (isTarget) {
                      setDone(true);
                      if (cfg.onDone) nav.navigate(cfg.onDone as never);
                    }
                  }}
                >
                  <Text style={s.carouselText}>{isTarget ? 'Target' : `Item ${itemIndex + 1}`}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ))}
      {done ? <Text style={s.combinedDone}>Gesture sequence complete.</Text> : null}
    </ScrollView>
  );
};

// ─── DRM / Restricted Simulation ─────────────────────────────────────────────
export const RenderDrmSimulation = ({ cfg }: { cfg: DrmSimulationConfig }) => {
  const nav = useNav();
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisible(false);
      if (cfg.onOverlayGone) {
        nav.navigate(cfg.onOverlayGone as never);
      }
    }, cfg.revealDelayMs);
    return () => clearTimeout(timer);
  }, [cfg.onOverlayGone, cfg.revealDelayMs, nav]);

  return (
    <View style={s.drmWrap}>
      <TouchableOpacity testID={`${cfg.testIDPrefix}-visible-disabled`} style={s.drmBtnDisabled} disabled>
        <Text style={s.drmBtnText}>Visible but disabled</Text>
      </TouchableOpacity>
      <TouchableOpacity testID={`${cfg.testIDPrefix}-masked`} style={s.drmBtnMasked} onPress={() => Alert.alert('Masked', 'Element is partially blocked.')}>
        <Text style={s.drmBtnText}>Partially masked element</Text>
      </TouchableOpacity>
      {overlayVisible ? <View pointerEvents="auto" style={s.drmOverlay}><Text style={s.drmOverlayText}>Security overlay active</Text></View> : null}
    </View>
  );
};

// ─── Input Variations ─────────────────────────────────────────────────────────
export const RenderInputVariations = ({ cfg }: { cfg: InputVariationsConfig }) => {
  const [standard, setStandard] = useState('');
  const [direct, setDirect] = useState('');
  const [numeric, setNumeric] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 10);
    if (digits.length <= 3) return p1;
    if (digits.length <= 6) return `${p1}-${p2}`;
    return `${p1}-${p2}-${p3}`;
  };

  const runValidation = () => {
    if (!cfg.validate) return;
    const nextErrors: string[] = [];
    if (!standard.trim()) nextErrors.push('Standard input is required.');
    if (!direct.trim()) nextErrors.push('Keyboard interaction field is required.');
    if (!/^\d+$/.test(numeric)) nextErrors.push('Numeric field accepts digits only.');
    if (phone.replace(/\D/g, '').length !== 10) nextErrors.push('Phone must be 10 digits.');
    setErrors(nextErrors);
    if (nextErrors.length === 0) Alert.alert('Valid', 'All input mechanisms passed.');
  };

  return (
    <View style={s.inputWrap}>
      <TextInput
        testID={`${cfg.testIDPrefix}-standard`}
        value={standard}
        onChangeText={setStandard}
        style={s.inputField}
        placeholder="Standard input"
      />
      <TextInput
        testID={`${cfg.testIDPrefix}-keyboard`}
        value={direct}
        onChangeText={setDirect}
        style={s.inputField}
        placeholder="Requires keyboard interaction"
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <TextInput
        testID={`${cfg.testIDPrefix}-numeric`}
        value={numeric}
        onChangeText={(v) => setNumeric(v.replace(/\D/g, ''))}
        style={s.inputField}
        placeholder="Numeric-only field"
        keyboardType="number-pad"
      />
      <TextInput
        testID={`${cfg.testIDPrefix}-phone`}
        value={phone}
        onChangeText={(v) => setPhone(formatPhone(v))}
        style={s.inputField}
        placeholder="Auto-format phone"
        keyboardType="phone-pad"
      />
      {cfg.validate ? (
        <TouchableOpacity testID={`${cfg.testIDPrefix}-validate`} style={s.inputValidateBtn} onPress={runValidation}>
          <Text style={s.inputValidateText}>Validate Inputs</Text>
        </TouchableOpacity>
      ) : null}
      {errors.map((err, i) => (
        <Text key={`${err}-${i}`} style={s.inputError}>{err}</Text>
      ))}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // TextBlock
  normal:      { fontSize: FontSize.lg, color: Colors.textPrimary, lineHeight: 24 },
  lowContrast: { color: '#c0c0c0', backgroundColor: '#e8e8e8' },
  rotateWrap:  { height: 80, justifyContent: 'center' },
  narrow:      { width: 120 },

  // TapTarget
  grid:         { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  tapBtn:       { backgroundColor: Colors.border, borderRadius: Radius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  tapBtnCorrect:{ backgroundColor: Colors.primary },
  tapBtnText:   { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },

  // DelayedReveal
  revealList:   { gap: Spacing.md },
  revealRow:    { gap: Spacing.sm },
  revealLabel:  { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary, textTransform: 'uppercase', letterSpacing: 1 },
  triggerBtn:   { backgroundColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  triggerText:  { fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: FontWeight.semibold },
  revealedBtn:  { backgroundColor: Colors.success + '22', borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.success },
  revealedText: { fontSize: FontSize.base, color: Colors.success, fontWeight: FontWeight.semibold },
  waiting:      { fontSize: FontSize.base, color: Colors.textMuted, fontStyle: 'italic' },

  // ValidationList
  valRow:       { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: Spacing.sm },
  dot:          { width: 10, height: 10, borderRadius: 5 },
  valLabel:     { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  valStatus:    { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  valBtnRow:    { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xl },
  valBtn:       { flex: 1, borderRadius: Radius.xl, padding: Spacing.md, alignItems: 'center' },
  valBtnText:   { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
  resultBox:    { marginTop: Spacing.base, backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, padding: Spacing.base, borderWidth: 1, borderColor: Colors.border },
  resultText:   { fontSize: FontSize.sm, color: Colors.textPrimary, lineHeight: 20 },

  // InfiniteList
  infiniteList: { maxHeight: 400 },
  listRow:      { paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  targetRow:    { backgroundColor: Colors.primary + '22', borderRadius: Radius.md, paddingHorizontal: Spacing.md, borderWidth: 1.5, borderColor: Colors.primary },
  listRowText:  { fontSize: FontSize.base, color: Colors.textPrimary },
  targetText:   { fontWeight: FontWeight.bold, color: Colors.primary },
  targetBadge:  { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.bold },
  spinner:      { paddingVertical: Spacing.xl },

  // EditableList
  addRow:       { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  addInput:     { flex: 1, backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, fontSize: FontSize.base, color: Colors.textPrimary, borderWidth: 1, borderColor: Colors.border },
  addBtn:       { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.base, justifyContent: 'center' },
  addBtnText:   { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
  listCount:    { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.sm },
  editListBox:  { height: 260, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  editRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md, paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  editRowText:  { fontSize: FontSize.base, color: Colors.textPrimary },
  editRowNav:   { fontSize: FontSize.lg, color: Colors.primary, fontWeight: FontWeight.bold },

  // ScaledImages
  scaleGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, justifyContent: 'center' },
  scaleCell:    { alignItems: 'center', width: 140, height: 110, justifyContent: 'center' },
  scaleBox:     { backgroundColor: '#dce8f5', borderRadius: Radius.md, paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderWidth: 1, borderColor: '#a0c0e0' },
  scaleText:    { fontSize: FontSize['2xl'], fontWeight: FontWeight.black, color: '#1a3a5c' },
  scaleLabel:   { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.sm },

  // MultiLang
  langGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  langBtn:      { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center', minWidth: 100, borderWidth: 1, borderColor: Colors.border },
  langWord:     { fontSize: FontSize['3xl'], color: Colors.textPrimary, fontWeight: FontWeight.bold },
  langLabel:    { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.xs },

  // Flicker
  flickerRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  flickerLabel: { fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  flickerPill:  { borderRadius: Radius.full, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minWidth: 60, alignItems: 'center' },
  flickerOn:    { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
  flickerOff:   { color: Colors.textMuted, fontWeight: FontWeight.bold, fontSize: FontSize.base },

  // RandomLayout
  randomGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.md },
  randomBtn:    { borderRadius: Radius.xl, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  randomBtnText:{ color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
  shuffleBtn:   { backgroundColor: Colors.border, borderRadius: Radius.xl, padding: Spacing.md, alignItems: 'center' },
  shuffleBtnText:{ fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: FontWeight.semibold },

  // MisleadingButtons
  misleadHint:  { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.md },
  misleadGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  misleadBtn:   { borderRadius: Radius.xl },
  misleadBtnText:{ color: Colors.white, fontWeight: FontWeight.bold },

  // LagButton
  lagBtn:        { backgroundColor: Colors.primary, borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center', minHeight: 52, justifyContent: 'center' },
  lagBtnDisabled:{ opacity: 0.7 },
  lagBtnText:    { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.lg },
  lagLog:        { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },

  // OCR Calibration
  calibrationGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  calibrationBtn: { width: '47%', minHeight: 58, backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', padding: Spacing.sm, position: 'relative' },
  calibrationLowContrast: { backgroundColor: '#eceef2' },
  calibrationText: { color: Colors.textPrimary, textTransform: 'uppercase' },
  calibrationBlur: { textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 },

  // AOI Focus
  aoiCanvas: { height: 250, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border, position: 'relative' },
  aoiTarget: { position: 'absolute', width: 84, height: 46, borderRadius: Radius.md, backgroundColor: '#e6e9f2', alignItems: 'center', justifyContent: 'center' },
  aoiTargetActive: { borderWidth: 2, borderColor: Colors.primary },
  aoiTargetText: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.bold },
  aoiBox: { position: 'absolute', borderWidth: 2, borderColor: Colors.success, backgroundColor: 'rgba(72,187,120,0.12)', borderRadius: Radius.sm },
  aoiHint: { marginTop: Spacing.sm, color: Colors.textSecondary, fontSize: FontSize.sm },

  // Combined scroll
  combinedWrap: { maxHeight: 350 },
  combinedSection: { marginBottom: Spacing.lg },
  combinedSectionTitle: { marginBottom: Spacing.sm, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  carousel: { flexGrow: 0 },
  carouselCard: { width: 120, height: 80, borderRadius: Radius.md, backgroundColor: Colors.border, marginRight: Spacing.sm, alignItems: 'center', justifyContent: 'center' },
  carouselTarget: { backgroundColor: Colors.primary },
  carouselText: { color: Colors.white, fontWeight: FontWeight.bold },
  combinedDone: { marginTop: Spacing.md, color: Colors.success, fontWeight: FontWeight.semibold },

  // DRM simulation
  drmWrap: { minHeight: 170, justifyContent: 'center', gap: Spacing.sm, position: 'relative' },
  drmBtnDisabled: { backgroundColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  drmBtnMasked: { backgroundColor: Colors.primaryDark, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  drmBtnText: { color: Colors.white, fontWeight: FontWeight.bold },
  drmOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,20,20,0.45)', borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  drmOverlayText: { color: Colors.white, fontWeight: FontWeight.bold },

  // Input variations
  inputWrap: { gap: Spacing.sm },
  inputField: { backgroundColor: Colors.backgroundCard, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, color: Colors.textPrimary },
  inputValidateBtn: { marginTop: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  inputValidateText: { color: Colors.white, fontWeight: FontWeight.bold },
  inputError: { color: Colors.error, fontSize: FontSize.sm },
});
