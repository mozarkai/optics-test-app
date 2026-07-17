import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import OcrImageCard from '../components/OcrImageCard';
import { images, textBlocks } from '../data';
import type { OcrImage } from '../types';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from '../../../theme';

const OcrScreen = memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleImagePress = (image: OcrImage) => {
    if (image.clickable) {
      navigation.navigate('TextDetail', { image });
    } else {
      Alert.alert('Info', 'This image is not interactive in this demo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Recognition Samples</Text>
          {textBlocks.map(block => (
            <View key={block.id} style={styles.card}>
              <Text style={styles.cardTitle}>{block.title}</Text>
              <Text style={[styles.cardBody, block.orientation === 'vertical' && styles.vertical]}>
                {block.content}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Images</Text>
          <Text style={styles.sectionSubtitle}>Tap the invoice image to see detailed text extraction</Text>
          <View style={styles.grid}>
            {images.map(image => (
              <OcrImageCard key={image.id} image={image} onPress={handleImagePress} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Recognition</Text>
          <View style={styles.card}>
            {[
              { label: 'Bold Text Recognition',          style: { fontWeight: FontWeight.bold } },
              { label: 'Italic Text Recognition',        style: { fontStyle: 'italic' as const } },
              { label: 'Underlined Text Recognition',    style: { textDecorationLine: 'underline' as const } },
              { label: 'Strikethrough Text Recognition', style: { textDecorationLine: 'line-through' as const } },
            ].map(item => (
              <Text key={item.label} style={[styles.cardBody, item.style, { marginBottom: Spacing.md }]}>
                {item.label}
              </Text>
            ))}
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
  sectionTitle:    { fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  sectionSubtitle: { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: Spacing.md, lineHeight: 20 },
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  cardTitle: { fontSize: FontSize['2xl'], fontWeight: FontWeight.semibold, color: Colors.textSecondary, marginBottom: Spacing.sm + 2 },
  cardBody:  { fontSize: FontSize.lg, color: Colors.textPrimary, lineHeight: 24 },
  vertical:  { writingDirection: 'ltr', textAlign: 'left' },
  grid:      { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});

export default OcrScreen;
