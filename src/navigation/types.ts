import type { RouteProp } from '@react-navigation/native';
import type { OcrImage } from '../features/ocr/types';

export type RootStackParamList = {
  // ── App root ───────────────────────────────────────────────────────────────
  Home: undefined;

  // ── Legacy screens ────────────────────────────────────────────────────────
  TextIdentification: undefined;
  TextDetail: { image: OcrImage };
  ScrollSwipe: undefined;
  Animation: undefined;

  // ── Card 1 — OCR Chaos ────────────────────────────────────────────────────
  Card1_S1: undefined;
  Card1_S2: undefined;
  Card1_S3: { word: string };

  // ── Card 2 — Image vs OCR ─────────────────────────────────────────────────
  Card2_S1: undefined;
  Card2_S2: undefined;
  Card2_S3: undefined;

  // ── Card 3 — Partial Scroll ───────────────────────────────────────────────
  Card3_S1: undefined;
  Card3_S2: undefined;
  Card3_S3: undefined;

  // ── Card 4 — Infinite Scroll ──────────────────────────────────────────────
  Card4_S1: undefined;
  Card4_S2: undefined;
  Card4_S3: undefined;

  // ── Card 5 — Animation Interference ──────────────────────────────────────
  Card5_S1: undefined;
  Card5_S2: undefined;
  Card5_S3: undefined;

  // ── Card 6 — Hidden / Delayed ─────────────────────────────────────────────
  Card6_S1: undefined;
  Card6_S2: undefined;

  // ── Card 7 — Multi-Element Validation ────────────────────────────────────
  Card7_S1: undefined;

  // ── Card 8 — Resizable Box ────────────────────────────────────────────────
  Card8_S1: undefined;
  Card8_S2: { size: number };
  Card8_S3: { size: number };

  // ── Card 9 — Nested Gesture ───────────────────────────────────────────────
  Card9_S1: undefined;
  Card9_S2: undefined;

  // ── Card 10 — Randomized Layout ───────────────────────────────────────────
  Card10_S1: undefined;
  Card10_S2: undefined;

  // ── Card 11 — Flicker UI ──────────────────────────────────────────────────
  Card11_S1: undefined;
  Card11_S2: undefined;

  // ── Card 12 — Multi-Language ──────────────────────────────────────────────
  Card12_S1: undefined;
  Card12_S2: undefined;

  // ── Card 13 — Resolution / Scaling ───────────────────────────────────────
  Card13_S1: undefined;
  Card13_S2: undefined;

  // ── Card 14 — Misleading UI ───────────────────────────────────────────────
  Card14_S1: undefined;

  // ── Card 15 — Lag / Performance ───────────────────────────────────────────
  Card15_S1: undefined;
  Card15_S2: undefined;

  // ── Card 16 — OCR Calibration ─────────────────────────────────────────────
  Card16_S1: undefined;
  Card16_S2: undefined;

  // ── Card 17 — Same Text, Multiple Buttons ────────────────────────────────
  Card17_S1: undefined;
  Card17_S2: undefined;

  // ── Card 18 — AOI Focus ──────────────────────────────────────────────────
  Card18_S1: undefined;
  Card18_S2: undefined;

  // ── Card 19 — Combined Scroll Directions ─────────────────────────────────
  Card19_S1: undefined;
  Card19_S2: undefined;

  // ── Card 20 — DRM / Restricted Simulation ────────────────────────────────
  Card20_S1: undefined;
  Card20_S2: undefined;

  // ── Card 21 — Input Variations ───────────────────────────────────────────
  Card21_S1: undefined;
  Card21_S2: undefined;
};

// ── Route prop helpers ────────────────────────────────────────────────────────
export type TextDetailRouteProp = RouteProp<RootStackParamList, 'TextDetail'>;
export type Card1S3RouteProp    = RouteProp<RootStackParamList, 'Card1_S3'>;
export type Card8S2RouteProp    = RouteProp<RootStackParamList, 'Card8_S2'>;
export type Card8S3RouteProp    = RouteProp<RootStackParamList, 'Card8_S3'>;
