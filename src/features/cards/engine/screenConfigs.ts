/**
 * screenConfigs — all card screens as pure data.
 * No JSX, no logic — just config objects fed into CardScreen.
 *
 * Cards with unique interaction logic (5, 8, 9) keep their own files.
 * Everything else is driven from here.
 */
import { generateWords } from '../../../utils/dataUtils';
import type { ScreenConfig } from './types';

// ─── Card 1 — OCR Chaos ───────────────────────────────────────────────────────
export const card1_s1: ScreenConfig = {
  heading: 'OCR Chaos',
  hint: 'Tap the correct START (button #3 of 4)',
  sections: [
    { label: 'Normal Text',       content: { type: 'text', testID: 'c1-normal',   content: 'The quick brown fox jumps over the lazy dog.' } },
    { label: 'Rotated 90°',       content: { type: 'text', testID: 'c1-rot90',    content: 'ROTATED 90°', rotate: '90deg' } },
    { label: 'Rotated 180°',      content: { type: 'text', testID: 'c1-rot180',   content: 'UPSIDE DOWN', rotate: '180deg' } },
    { label: 'Low Contrast',      content: { type: 'text', testID: 'c1-low',      content: 'This text is hard to read', lowContrast: true } },
    { label: 'Non-selectable',    content: { type: 'text', testID: 'c1-nosel',    content: 'INVOICE #4521\nDate: 2024-03-15\nAmount: $499.00', selectable: false } },
    { label: 'Duplicate Words',   content: { type: 'text', testID: 'c1-dupe',     content: generateWords(8).join('  ') } },
    { label: 'Narrow Wrap',       content: { type: 'text', testID: 'c1-narrow',   content: 'This wraps because the container is very narrow.', narrow: true } },
    { label: 'Tap the correct START', content: { type: 'tap_target', label: 'START', count: 4, correctIndex: 2, testIDPrefix: 'c1-start', onCorrect: 'Card1_S2', wrongMessage: 'That START is a decoy. Find index 3.' } },
  ],
};

export const card1_s2: ScreenConfig = {
  heading: 'Overlapping Text Layers',
  sections: [
    { label: 'Overlapping Layers', content: { type: 'text', testID: 'c1-overlap', content: 'BACKGROUND\n  MIDDLE\n    FOREGROUND' } },
    { label: 'Skewed Left',        content: { type: 'text', testID: 'c1-skew-l',  content: 'Skewed Left',          rotate: '-15deg' } },
    { label: 'Skewed Right',       content: { type: 'text', testID: 'c1-skew-r',  content: 'Skewed Right',         rotate: '90deg'  } },
  ],
  cta: { label: 'Continue →', testID: 'c1-s2-next', route: 'Card1_S3', routeParams: { word: 'START' } },
};

// ─── Card 2 — Image vs OCR ────────────────────────────────────────────────────
export const card2_s1: ScreenConfig = {
  heading: 'Image vs OCR Detection',
  hint: 'Only the image-based label is clickable.',
  sections: [
    { label: 'A — Actual Text (not clickable)',    content: { type: 'text', testID: 'c2-actual', content: 'CONFIRM', selectable: false } },
    { label: 'B — Image of Text ← Tap this',      content: { type: 'tap_target', label: 'CONFIRM', count: 1, correctIndex: 0, testIDPrefix: 'c2-image', onCorrect: 'Card2_S2', wrongMessage: '' } },
    { label: 'C — Blurred / Distorted',           content: { type: 'text', testID: 'c2-blurred', content: 'CONFIRM', lowContrast: true } },
  ],
};

export const card2_s2: ScreenConfig = {
  heading: 'Scaled Image Detection',
  hint: 'Same image at different scales — tap any.',
  sections: [
    { label: 'Scaled Versions', content: { type: 'scaled_images', label: 'CONFIRM', scales: [0.7, 1.0, 1.3, 1.6], onPress: 'Card2_S3', testIDPrefix: 'c2-scale' } },
  ],
};

// ─── Card 3 — Partial Scroll (unique layout — kept as file) ──────────────────
// Card3_S1 stays as its own file (static header + bounded scroll + static footer)

export const card3_s2: ScreenConfig = {
  heading: 'Editable List',
  hint: 'Add items. Tap the first item to navigate.',
  sections: [
    { label: 'List', content: { type: 'editable_list', initialCount: 50, onItemPress: 'Card3_S3', testIDPrefix: 'c3' } },
  ],
};

// ─── Card 4 — Infinite Scroll ─────────────────────────────────────────────────
export const card4_s1: ScreenConfig = {
  heading: 'Infinite Scroll',
  hint: 'Scroll down. Find Row 73 and tap it.',
  sections: [
    { label: 'List', content: { type: 'infinite_list', pageSize: 20, targetId: 73, onTargetPress: 'Card4_S2', testIDPrefix: 'c4-row' } },
  ],
};

export const card4_s2: ScreenConfig = {
  heading: 'Delayed Element',
  hint: 'Target appears after 3s.',
  sections: [
    { label: 'Delayed Button', content: {
      type: 'delayed_reveal',
      items: [{ id: 'target', label: 'Delayed Button', trigger: 'timer', delayMs: 3000, testID: 'c4-delayed-btn', onRevealNavigate: 'Card4_S3' }],
    }},
  ],
};

// ─── Card 5 — Animation Interference (unique — kept as file) ─────────────────
// Card5_S1, Card5_S2 stay as their own files (Animated API, PanResponder)

// ─── Card 6 — Hidden / Delayed ────────────────────────────────────────────────
export const card6_s1: ScreenConfig = {
  heading: 'Hidden / Delayed Elements',
  hint: 'Elements appear via delay, tap, or scroll.',
  sections: [
    { label: 'Reveal Triggers', content: {
      type: 'delayed_reveal',
      items: [
        { id: 'timer',  label: '1. After 3s delay',    trigger: 'timer', delayMs: 3000, testID: 'c6-delay-btn',  onRevealNavigate: 'Card6_S2' },
        { id: 'tap',    label: '2. After tap trigger',  trigger: 'tap',                  testID: 'c6-tap-btn'   },
      ],
    }},
  ],
};

export const card6_s2: ScreenConfig = {
  heading: 'Multiple Delayed Elements',
  hint: 'Each appears at a different time.',
  sections: [
    { label: 'Timed Elements', content: {
      type: 'delayed_reveal',
      items: [
        { id: 'a', label: 'Element A (1s)',   trigger: 'timer', delayMs: 1000, testID: 'c6-a' },
        { id: 'b', label: 'Element B (2.5s)', trigger: 'timer', delayMs: 2500, testID: 'c6-b' },
        { id: 'c', label: 'Element C (4s)',   trigger: 'timer', delayMs: 4000, testID: 'c6-c' },
        { id: 'd', label: 'Element D (6s)',   trigger: 'timer', delayMs: 6000, testID: 'c6-d' },
      ],
    }},
  ],
};

// ─── Card 7 — Multi-Element Validation ───────────────────────────────────────
export const card7_s1: ScreenConfig = {
  heading: 'Multi-Element Validation',
  hint: 'Some elements are intentionally absent.',
  sections: [
    { label: 'Elements', content: {
      type: 'validation_list',
      testIDPrefix: 'c7',
      elements: [
        { id: 'btn_submit',  label: 'Submit Button', present: true  },
        { id: 'btn_cancel',  label: 'Cancel Button', present: true  },
        { id: 'txt_title',   label: 'Title Text',    present: true  },
        { id: 'img_logo',    label: 'Logo Image',    present: false },
        { id: 'input_email', label: 'Email Input',   present: true  },
        { id: 'lbl_error',   label: 'Error Label',   present: false },
      ],
    }},
  ],
};

// ─── Card 8 — Resizable Box (unique — kept as file) ───────────────────────────
// Card8_S1, Card8_S2, Card8_S3 stay as their own files (PanResponder)

// ─── Card 9 — Nested Gesture (unique — kept as file) ─────────────────────────
// Card9_S1, Card9_S2 stay as their own files (nested ScrollViews)

// ─── Card 10 — Randomized Layout ─────────────────────────────────────────────
export const card10_s1: ScreenConfig = {
  heading: 'Randomized Layout',
  hint: 'Elements reorder on every shuffle. testIDs stay constant.',
  sections: [
    { label: 'Buttons', content: {
      type: 'random_layout',
      testIDPrefix: 'c10',
      onPress: 'Card10_S2',
      buttons: [
        { id: 'btn-a', label: 'Button A', color: '#667eea' },
        { id: 'btn-b', label: 'Button B', color: '#48bb78' },
        { id: 'btn-c', label: 'Button C', color: '#f5576c' },
        { id: 'btn-d', label: 'Button D', color: '#ed8936' },
        { id: 'btn-e', label: 'Button E', color: '#764ba2' },
      ],
    }},
  ],
};

export const card10_s2: ScreenConfig = {
  heading: 'Size & Spacing Variations',
  hint: 'Same elements, slight layout differences.',
  sections: [
    { label: 'Varied Buttons', content: {
      type: 'random_layout',
      testIDPrefix: 'c10-s2',
      buttons: [
        { id: 'x1', label: 'Alpha',   color: '#667eea' },
        { id: 'x2', label: 'Beta',    color: '#48bb78' },
        { id: 'x3', label: 'Gamma',   color: '#f5576c' },
        { id: 'x4', label: 'Delta',   color: '#ed8936' },
        { id: 'x5', label: 'Epsilon', color: '#764ba2' },
      ],
    }},
  ],
};

// ─── Card 11 — Flicker UI ─────────────────────────────────────────────────────
export const card11_s1: ScreenConfig = {
  heading: 'Flicker / Unstable UI',
  hint: 'Elements flicker. Wait for stable state.',
  sections: [
    { label: 'Flickering Elements', content: {
      type: 'flicker',
      items: [
        { id: 'c11-fast',   label: 'Fast (200ms)',   intervalMs: 200,  color: '#f5576c' },
        { id: 'c11-medium', label: 'Medium (600ms)', intervalMs: 600,  color: '#ed8936' },
        { id: 'c11-slow',   label: 'Slow (1200ms)',  intervalMs: 1200, color: '#48bb78' },
      ],
    }},
  ],
  cta: { label: 'Next →', testID: 'c11-next', route: 'Card11_S2' },
};

export const card11_s2: ScreenConfig = {
  heading: 'Multiple Flicker Rates',
  hint: 'Each element flickers at a different rate.',
  sections: [
    { label: 'All Rates', content: {
      type: 'flicker',
      items: [
        { id: 'c11-s2-a', label: 'Rate A (300ms)',  intervalMs: 300,  color: '#667eea' },
        { id: 'c11-s2-b', label: 'Rate B (700ms)',  intervalMs: 700,  color: '#f093fb' },
        { id: 'c11-s2-c', label: 'Rate C (1500ms)', intervalMs: 1500, color: '#43e97b' },
        { id: 'c11-s2-d', label: 'Rate D (2500ms)', intervalMs: 2500, color: '#fee140' },
      ],
    }},
  ],
};

// ─── Card 12 — Multi-Language OCR ────────────────────────────────────────────
export const card12_s1: ScreenConfig = {
  heading: 'Multi-Language OCR',
  hint: 'Tap the Hindi word: "नमस्ते"',
  sections: [
    { label: 'Words', content: {
      type: 'multi_lang',
      testIDPrefix: 'c12',
      onCorrect: 'Card12_S2',
      words: [
        { text: 'Hello',   lang: 'English', correct: false },
        { text: 'नमस्ते',  lang: 'Hindi',   correct: true  },
        { text: 'Bonjour', lang: 'French',  correct: false },
        { text: 'مرحبا',   lang: 'Arabic',  correct: false },
        { text: '你好',     lang: 'Chinese', correct: false },
        { text: 'Привет',  lang: 'Russian', correct: false },
      ],
    }},
    { label: 'Mixed Symbols', content: { type: 'text', testID: 'c12-symbols', content: 'α β γ δ ε ζ  ①②③④⑤  ★☆♠♣♥♦  ✓✗✦' } },
  ],
};

export const card12_s2: ScreenConfig = {
  heading: 'Mixed Scripts',
  hint: 'Same sentence, multiple scripts.',
  sections: [
    { label: 'Line 1', content: { type: 'text', testID: 'c12-l1', content: 'Hello नमस्ते Bonjour مرحبا 你好' } },
    { label: 'Line 2', content: { type: 'text', testID: 'c12-l2', content: 'Price: ₹500 or $6.50 or €5.99' } },
    { label: 'Line 3', content: { type: 'text', testID: 'c12-l3', content: 'Status: ✓ Active | ✗ Inactive | ⚠ Pending' } },
    { label: 'Line 4', content: { type: 'text', testID: 'c12-l4', content: 'Math: α + β = γ, π ≈ 3.14159' } },
  ],
};

// ─── Card 13 — Resolution / Scaling ──────────────────────────────────────────
export const card13_s1: ScreenConfig = {
  heading: 'Resolution & Scaling',
  hint: 'Elements at different sizes.',
  sections: [
    { label: 'Tiny (8px)',    content: { type: 'text', testID: 'c13-tiny',   content: 'Tiny text at 8px',    rotate: undefined } },
    { label: 'Small (12px)',  content: { type: 'text', testID: 'c13-small',  content: 'Small text at 12px'  } },
    { label: 'Normal (16px)', content: { type: 'text', testID: 'c13-normal', content: 'Normal text at 16px' } },
    { label: 'Large (24px)',  content: { type: 'text', testID: 'c13-large',  content: 'Large text at 24px'  } },
    { label: 'XL (32px)',     content: { type: 'text', testID: 'c13-xl',     content: 'XL text at 32px'     } },
  ],
  cta: { label: 'Next →', testID: 'c13-next', route: 'Card13_S2' },
};

export const card13_s2: ScreenConfig = {
  heading: 'Density Variations',
  hint: 'Same label at different scales.',
  sections: [
    { label: 'Scaled Versions', content: { type: 'scaled_images', label: 'TAP', scales: [0.6, 1.0, 1.4, 1.8], onPress: 'Card13_S2', testIDPrefix: 'c13-density' } },
  ],
};

// ─── Card 14 — Misleading UI ──────────────────────────────────────────────────
export const card14_s1: ScreenConfig = {
  heading: 'Misleading UI',
  hint: 'One button is real. Others differ in color, size, or spacing.',
  sections: [
    { label: 'Find the real SUBMIT', content: { type: 'misleading_buttons', label: 'SUBMIT', count: 5, correctIndex: 3, testIDPrefix: 'c14' } },
  ],
};

// ─── Card 15 — Lag / Performance ─────────────────────────────────────────────
export const card15_s1: ScreenConfig = {
  heading: 'Lag Simulation',
  hint: 'Content renders with delay. Button responds slowly.',
  sections: [
    { label: 'Delayed Render (2s)', content: {
      type: 'delayed_reveal',
      items: [{ id: 'content', label: 'Delayed Content', trigger: 'timer', delayMs: 2000, testID: 'c15-content' }],
    }},
    { label: 'Slow Button (1.5s)', content: { type: 'lag_button', label: 'Tap Me (slow)', lagMs: 1500, testID: 'c15-slow-btn', onSuccess: 'Card15_S2' } },
  ],
};

export const card15_s2: ScreenConfig = {
  heading: 'Random Lag Spikes',
  hint: 'Each tap triggers a random delay (200ms–3200ms).',
  sections: [
    { label: 'Random Lag', content: { type: 'lag_button', label: 'Trigger Random Lag', lagMs: 'random', testID: 'c15-lag-btn' } },
  ],
};

// ─── Card 16 — OCR Calibration ────────────────────────────────────────────────
export const card16_s1: ScreenConfig = {
  heading: 'OCR Calibration',
  hint: 'Find and tap the correct CONFIRM variant.',
  sections: [
    {
      label: 'Font + Size + Weight + Kerning',
      content: {
        type: 'ocr_calibration',
        label: 'CONFIRM',
        testIDPrefix: 'c16-s1',
        onCorrect: 'Card16_S2',
        variants: [
          { id: 'v1', fontFamily: 'serif', fontSize: 14, fontWeight: '400', letterSpacing: 0.2, offsetY: 0 },
          { id: 'v2', fontSize: 22, fontWeight: '800', letterSpacing: 3, offsetY: -2 },
          { id: 'v3', fontSize: 18, fontWeight: '300', letterSpacing: -0.3, offsetY: 3 },
          { id: 'v4', fontSize: 20, fontWeight: '700', letterSpacing: 1.5, offsetY: 0, correct: true },
          { id: 'v5', fontFamily: 'sans-serif-condensed', fontSize: 24, fontWeight: '500', letterSpacing: 2.2, offsetY: 2 },
          { id: 'v6', fontSize: 12, fontWeight: '700', letterSpacing: 0.6, offsetY: -3 },
        ],
      },
    },
  ],
};

export const card16_s2: ScreenConfig = {
  heading: 'Calibration Under Blur & Contrast Shift',
  hint: 'Same label with blur-like and low-contrast variants.',
  sections: [
    {
      label: 'Blur + Lighting Simulation',
      content: {
        type: 'ocr_calibration',
        label: 'CONFIRM',
        testIDPrefix: 'c16-s2',
        onCorrect: 'Card16_S2',
        variants: [
          { id: 'b1', fontSize: 20, fontWeight: '700', lowContrast: true, blur: true, correct: true },
          { id: 'b2', fontSize: 18, fontWeight: '400', lowContrast: true },
          { id: 'b3', fontSize: 22, fontWeight: '700', blur: true },
          { id: 'b4', fontSize: 16, fontWeight: '500', lowContrast: true, blur: true },
        ],
      },
    },
  ],
};

// ─── Card 17 — Same Text Multiple Buttons ────────────────────────────────────
export const card17_s1: ScreenConfig = {
  heading: 'Same Text, Multiple Buttons',
  hint: 'Tap the 3rd NEXT button (index 3).',
  sections: [
    { label: 'Precision Selection', content: { type: 'tap_target', label: 'NEXT', count: 10, correctIndex: 2, testIDPrefix: 'c17-s1-next', onCorrect: 'Card17_S2', wrongMessage: 'Not this one. Select the 3rd NEXT.' } },
  ],
};

export const card17_s2: ScreenConfig = {
  heading: 'Shuffled Layout Precision',
  hint: 'Layout changed. Tap the 7th NEXT button.',
  sections: [
    { label: 'Shuffled Buttons', content: { type: 'tap_target', label: 'NEXT', count: 10, correctIndex: 6, testIDPrefix: 'c17-s2-next', onCorrect: 'Card17_S2', wrongMessage: 'Incorrect index after shuffle.' } },
  ],
};

// ─── Card 18 — Area of Interest Focus ────────────────────────────────────────
export const card18_s1: ScreenConfig = {
  heading: 'AOI Focus Test',
  hint: 'Tap the TARGET only inside AOI.',
  sections: [
    { label: 'AOI Region', content: { type: 'aoi_focus', label: 'TARGET', testIDPrefix: 'c18-s1', total: 9, targetIndex: 4, aoi: { x: 98, y: 88, width: 92, height: 64 }, onCorrect: 'Card18_S2' } },
  ],
};

export const card18_s2: ScreenConfig = {
  heading: 'Shifted AOI Region',
  hint: 'AOI is smaller and moved.',
  sections: [
    { label: 'Shifted AOI', content: { type: 'aoi_focus', label: 'TARGET', testIDPrefix: 'c18-s2', total: 9, targetIndex: 8, aoi: { x: 194, y: 164, width: 82, height: 56 }, onCorrect: 'Card18_S2' } },
  ],
};

// ─── Card 19 — Partial Scroll Combined ───────────────────────────────────────
export const card19_s1: ScreenConfig = {
  heading: 'Vertical + Horizontal Combined Scroll',
  hint: 'Scroll vertically, then swipe horizontally in carousels.',
  sections: [
    { label: 'Mixed Scroll Areas', content: { type: 'combined_scroll', testIDPrefix: 'c19-s1', verticalSections: 4, carouselSize: 8, onDone: 'Card19_S2' } },
  ],
};

export const card19_s2: ScreenConfig = {
  heading: 'Dense Mixed Gesture Layout',
  hint: 'More items in both directions.',
  sections: [
    { label: 'Advanced Gesture Mix', content: { type: 'combined_scroll', testIDPrefix: 'c19-s2', verticalSections: 5, carouselSize: 10 } },
  ],
};

// ─── Card 20 — DRM / Restricted Screen ───────────────────────────────────────
export const card20_s1: ScreenConfig = {
  heading: 'DRM / Restricted Simulation',
  hint: 'Some visible elements are not interactable.',
  sections: [
    { label: 'Restricted Elements', content: { type: 'drm_simulation', testIDPrefix: 'c20-s1', revealDelayMs: 3000, onOverlayGone: 'Card20_S2' } },
  ],
};

export const card20_s2: ScreenConfig = {
  heading: 'Overlay Cleared',
  hint: 'Overlay disappeared after delay. Re-test accessibility.',
  sections: [
    { label: 'Post-Overlay State', content: { type: 'drm_simulation', testIDPrefix: 'c20-s2', revealDelayMs: 1500 } },
  ],
};

// ─── Card 21 — Input Variations ──────────────────────────────────────────────
export const card21_s1: ScreenConfig = {
  heading: 'Input Box Variations',
  hint: 'Fill standard, keyboard, numeric and auto-format fields.',
  sections: [
    { label: 'Input Mechanisms', content: { type: 'input_variations', testIDPrefix: 'c21-s1' } },
  ],
  cta: { label: 'Run Validation →', testID: 'c21-s1-next', route: 'Card21_S2' },
};

export const card21_s2: ScreenConfig = {
  heading: 'Input Validation States',
  hint: 'Validation errors appear for wrong types/format.',
  sections: [
    { label: 'Validation Pass/Fail', content: { type: 'input_variations', testIDPrefix: 'c21-s2', validate: true } },
  ],
};
