import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import type { OcrImage } from '../types';
import { Colors, Radius, FontSize, FontWeight, Shadows, Spacing } from '../../../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 2 - Spacing.md) / 2;

type Props = {
  image: OcrImage;
  onPress: (image: OcrImage) => void;
};

// Renders text visually styled to simulate a scanned document image
// with text in different orientations
const OcrImageCard = ({ image, onPress }: Props) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: image.backgroundColor }, image.clickable && styles.clickable]}
    onPress={() => onPress(image)}
    activeOpacity={image.clickable ? 0.75 : 1}
  >
    {/* Simulated document header bar */}
    <View style={[styles.docHeader, { backgroundColor: image.clickable ? Colors.primary : Colors.textSecondary }]}>
      <Text style={styles.docHeaderText}>{image.title.toUpperCase()}</Text>
    </View>

    {/* Text content rendered to simulate orientation */}
    <View style={[styles.textArea, image.orientation === 'vertical' && styles.textAreaVertical]}>
      {image.lines.map((line, i) => (
        <Text
          key={i}
          style={[
            styles.docText,
            image.orientation === 'diagonal' && { transform: [{ rotate: '-15deg' }] },
            image.orientation === 'vertical' && styles.verticalChar,
            line.bold && { fontWeight: FontWeight.bold },
            line.large && { fontSize: FontSize.lg },
          ]}
          numberOfLines={image.orientation === 'horizontal' ? 1 : undefined}
        >
          {line.text}
        </Text>
      ))}
    </View>

    {/* Clickable badge */}
    {image.clickable && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>TAP TO ANALYZE →</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    minHeight: 160,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  clickable: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  docHeader: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  docHeaderText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 1,
  },
  textArea: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'center',
  },
  textAreaVertical: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  docText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 18,
    marginBottom: 2,
  },
  verticalChar: {
    fontSize: FontSize.md,
    marginRight: 1,
    lineHeight: 16,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

export default OcrImageCard;
