import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionButton from '../../../components/common/ActionButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../../../theme';

const OPTIONS = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

const Card22_S1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const selectOption = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.heading}>Long Dropdown</Text>
        <Text style={s.hint}>{`Open the dropdown and swipe through all ${OPTIONS.length} options.`}</Text>
      </View>

      <TouchableOpacity
        testID="c22-dropdown"
        style={s.field}
        onPress={() => setOpen(o => !o)}
        activeOpacity={0.8}
      >
        <Text style={selected ? s.fieldValue : s.fieldPlaceholder}>
          {selected ?? 'Select an option…'}
        </Text>
        <Text style={s.chevron}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open ? (
        <View testID="c22-banner" style={s.banner}>
          <Text style={s.bannerText}>{`📋 ${OPTIONS.length} options loaded — swipe to explore`}</Text>
        </View>
      ) : null}

      {open ? (
        <View style={s.listBox}>
          <FlatList
            testID="c22-options"
            data={OPTIONS}
            keyExtractor={o => o}
            showsVerticalScrollIndicator
            renderItem={({ item, index }) => (
              <TouchableOpacity
                testID={`c22-option-${index + 1}`}
                style={s.option}
                onPress={() => selectOption(item)}
                activeOpacity={0.7}
              >
                <Text style={[s.optionText, item === selected && s.optionSelected]}>{item}</Text>
                {item === selected ? <Text style={s.check}>✓</Text> : null}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={s.footer}>
          {selected ? (
            <ActionButton
              label="Continue →"
              testID="c22-continue"
              onPress={() => navigation.navigate('Card22_S2', { option: selected })}
            />
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container:        { flex: 1, backgroundColor: Colors.background },
  header:           { padding: Spacing.base },
  heading:          { fontSize: FontSize['2xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary },
  hint:             { fontSize: FontSize.base, color: Colors.textSecondary, marginTop: Spacing.xs },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    ...Shadows.md,
  },
  fieldValue:       { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  fieldPlaceholder: { fontSize: FontSize.lg, color: Colors.textSecondary },
  chevron:          { fontSize: FontSize.base, color: Colors.textSecondary, marginLeft: Spacing.sm },
  banner: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 132, // 3× the natural single-line banner height (~44px)
    marginHorizontal: Spacing.base,
    marginTop: Spacing.md,
    justifyContent: 'center',
  },
  bannerText:       { fontSize: FontSize.base, color: Colors.white, fontWeight: FontWeight.bold, textAlign: 'center' },
  listBox: {
    flex: 1,
    margin: Spacing.base,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionText:       { fontSize: FontSize.base, color: Colors.textPrimary },
  optionSelected:   { fontWeight: FontWeight.bold, color: Colors.primary },
  check:            { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.bold },
  footer:           { padding: Spacing.base },
});

export default Card22_S1;
