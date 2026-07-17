/**
 * AllCardScreens — exports every config-driven card screen.
 * Each is a one-liner: CardScreen with its config.
 * Unique screens (Card3_S1, Card5, Card8, Card9) are imported from their files.
 */
import React from 'react';
import CardScreen from './CardScreen';
import SuccessScreen from '../../../components/common/SuccessScreen';
import { useRoute } from '@react-navigation/native';
import { Card1S3RouteProp, Card8S3RouteProp } from '../../../navigation/types';
import * as cfg from './screenConfigs';
import Card3_S1 from '../card3/Card3_S1';
import Card5_S1 from '../card5/Card5_S1';
import Card5_S2 from '../card5/Card5_S2';
import Card8_S1 from '../card8/Card8_S1';
import Card8_S2 from '../card8/Card8_S2';

const createConfigScreen = (config: typeof cfg[keyof typeof cfg]) => () => <CardScreen config={config} />;
const createSuccessScreen = (title: string, message: string) => () => (
  <SuccessScreen title={title} message={message} />
);

// ── Card 1 ────────────────────────────────────────────────────────────────────
export const Card1_S1 = createConfigScreen(cfg.card1_s1);
export const Card1_S2 = createConfigScreen(cfg.card1_s2);
export const Card1_S3 = () => {
  const { word } = useRoute<Card1S3RouteProp>().params;
  return <SuccessScreen title="OCR Confirmed!" message={`You correctly identified "${word}".`} />;
};

// ── Card 2 ────────────────────────────────────────────────────────────────────
export const Card2_S1 = createConfigScreen(cfg.card2_s1);
export const Card2_S2 = createConfigScreen(cfg.card2_s2);
export const Card2_S3 = createSuccessScreen('Image Detected!', 'You identified the image-based label across all scales.');

// ── Card 3 ────────────────────────────────────────────────────────────────────
// Card3_S1 is unique (static header + bounded scroll + static footer) — imported from file
export { Card3_S1 };
export const Card3_S2 = createConfigScreen(cfg.card3_s2);
export const Card3_S3 = createSuccessScreen('Navigation Triggered!', 'You navigated from inside the scroll container.');

// ── Card 4 ────────────────────────────────────────────────────────────────────
export const Card4_S1 = createConfigScreen(cfg.card4_s1);
export const Card4_S2 = createConfigScreen(cfg.card4_s2);
export const Card4_S3 = createSuccessScreen('Target Found!', 'You scrolled to the target and tapped the delayed element.');

// ── Card 5 — unique (Animated API) ───────────────────────────────────────────
export { Card5_S1, Card5_S2 };
export const Card5_S3 = createSuccessScreen('Target Hit!', 'You detected and pressed the moving target.');

// ── Card 6 ────────────────────────────────────────────────────────────────────
export const Card6_S1 = createConfigScreen(cfg.card6_s1);
export const Card6_S2 = createConfigScreen(cfg.card6_s2);

// ── Card 7 ────────────────────────────────────────────────────────────────────
export const Card7_S1 = createConfigScreen(cfg.card7_s1);

// ── Card 8 — unique (PanResponder) ───────────────────────────────────────────
export { Card8_S1, Card8_S2 };
export const Card8_S3 = () => {
  const { size } = useRoute<Card8S3RouteProp>().params;
  return <SuccessScreen title="Layout Validated!" message={`Final box: ${Math.round(size)}×${Math.round(size)}px.`} />;
};

// ── Card 9 — unique (nested ScrollViews) ─────────────────────────────────────


// ── Card 10 ───────────────────────────────────────────────────────────────────
export const Card10_S1 = createConfigScreen(cfg.card10_s1);
export const Card10_S2 = createConfigScreen(cfg.card10_s2);

// ── Card 11 ───────────────────────────────────────────────────────────────────
export const Card11_S1 = createConfigScreen(cfg.card11_s1);
export const Card11_S2 = createConfigScreen(cfg.card11_s2);

// ── Card 12 ───────────────────────────────────────────────────────────────────
export const Card12_S1 = createConfigScreen(cfg.card12_s1);
export const Card12_S2 = createConfigScreen(cfg.card12_s2);

// ── Card 13 ───────────────────────────────────────────────────────────────────
export const Card13_S1 = createConfigScreen(cfg.card13_s1);
export const Card13_S2 = createConfigScreen(cfg.card13_s2);

// ── Card 14 ───────────────────────────────────────────────────────────────────
export const Card14_S1 = createConfigScreen(cfg.card14_s1);

// ── Card 15 ───────────────────────────────────────────────────────────────────
export const Card15_S1 = createConfigScreen(cfg.card15_s1);
export const Card15_S2 = createConfigScreen(cfg.card15_s2);

// ── Card 16 ───────────────────────────────────────────────────────────────────
export const Card16_S1 = createConfigScreen(cfg.card16_s1);
export const Card16_S2 = createConfigScreen(cfg.card16_s2);

// ── Card 17 ───────────────────────────────────────────────────────────────────
export const Card17_S1 = createConfigScreen(cfg.card17_s1);
export const Card17_S2 = createConfigScreen(cfg.card17_s2);

// ── Card 18 ───────────────────────────────────────────────────────────────────
export const Card18_S1 = createConfigScreen(cfg.card18_s1);
export const Card18_S2 = createConfigScreen(cfg.card18_s2);

// ── Card 19 ───────────────────────────────────────────────────────────────────
export const Card19_S1 = createConfigScreen(cfg.card19_s1);
export const Card19_S2 = createConfigScreen(cfg.card19_s2);

// ── Card 20 ───────────────────────────────────────────────────────────────────
export const Card20_S1 = createConfigScreen(cfg.card20_s1);
export const Card20_S2 = createConfigScreen(cfg.card20_s2);

// ── Card 21 ───────────────────────────────────────────────────────────────────
export const Card21_S1 = createConfigScreen(cfg.card21_s1);
export const Card21_S2 = createConfigScreen(cfg.card21_s2);

export const CARD_SCREEN_COMPONENTS = {
  Card1_S1,
  Card1_S2,
  Card1_S3,
  Card2_S1,
  Card2_S2,
  Card2_S3,
  Card3_S1,
  Card3_S2,
  Card3_S3,
  Card4_S1,
  Card4_S2,
  Card4_S3,
  Card5_S1,
  Card5_S2,
  Card5_S3,
  Card6_S1,
  Card6_S2,
  Card7_S1,
  Card8_S1,
  Card8_S2,
  Card8_S3,
  Card10_S1,
  Card10_S2,
  Card11_S1,
  Card11_S2,
  Card12_S1,
  Card12_S2,
  Card13_S1,
  Card13_S2,
  Card14_S1,
  Card15_S1,
  Card15_S2,
  Card16_S1,
  Card16_S2,
  Card17_S1,
  Card17_S2,
  Card18_S1,
  Card18_S2,
  Card19_S1,
  Card19_S2,
  Card20_S1,
  Card20_S2,
  Card21_S1,
  Card21_S2,
} as const;
