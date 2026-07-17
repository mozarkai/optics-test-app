import type { OcrImage, OcrTextBlock, OcrResults } from './types';

// ─── Text blocks shown as readable content ────────────────────────────────────
export const textBlocks: OcrTextBlock[] = [
  {
    id: 1,
    title: 'Horizontal Text',
    content:
      'This is a sample of horizontal text that can be detected by optical character recognition systems. The quick brown fox jumps over the lazy dog.',
    orientation: 'horizontal',
  },
  {
    id: 2,
    title: 'Vertical Text',
    content: 'V·E·R·T·I·C·A·L   T·E·X·T   C·A·N   B·E   R·E·A·D   I·N   D·I·F·F·E·R·E·N·T   O·R·I·E·N·T·A·T·I·O·N·S',
    orientation: 'vertical',
  },
  {
    id: 3,
    title: 'Mixed Content',
    content:
      'Text recognition systems handle various fonts, sizes, and styles — including bold, italic, and multilingual content like español, français, and русский.',
    orientation: 'horizontal',
  },
];

// ─── Document image cards ─────────────────────────────────────────────────────
// Each image simulates a scanned document with text in a specific orientation.
// Only the first (Invoice) is clickable and leads to the detail screen.
export const images: OcrImage[] = [
  {
    id: 1,
    title: 'Invoice',
    text: 'INVOICE\nDate: 2024-01-15\nAmount: $299.99\nThank you for your business!',
    lines: [
      { text: 'INVOICE', bold: true, large: true },
      { text: 'Date: 2024-01-15' },
      { text: 'Amount: $299.99', bold: true },
      { text: 'Thank you!' },
    ],
    backgroundColor: '#e8f4f8',
    clickable: true,
    orientation: 'horizontal',
  },
  {
    id: 2,
    title: 'Business Card',
    text: 'John Doe\nCEO & Founder\nTech Innovations Inc.\njohn@techinnovations.com\n+1 (555) 123-4567',
    lines: [
      { text: 'J', bold: true },
      { text: 'O', bold: true },
      { text: 'H', bold: true },
      { text: 'N', bold: true },
      { text: ' ' },
      { text: 'D', bold: true },
      { text: 'O', bold: true },
      { text: 'E', bold: true },
    ],
    backgroundColor: '#f0e8ff',
    clickable: false,
    orientation: 'vertical',
  },
  {
    id: 3,
    title: 'Receipt',
    text: 'RECEIPT #12345\nCoffee Shop\nLatte - $4.50\nCroissant - $3.25\nTotal: $7.75',
    lines: [
      { text: 'RECEIPT #12345', bold: true },
      { text: 'Coffee Shop' },
      { text: 'Latte    $4.50' },
      { text: 'Croissant $3.25' },
      { text: 'Total: $7.75', bold: true },
    ],
    backgroundColor: '#fff8e8',
    clickable: false,
    orientation: 'diagonal',
  },
];

// ─── Mock OCR analysis result ─────────────────────────────────────────────────
export const ocrResults: OcrResults = {
  confidence: 98.7,
  language: 'English',
  textBlocks: [
    { text: 'INVOICE',                    confidence: 99.2, bounds: { x: 50, y: 20, width: 100, height: 30 } },
    { text: 'Date: 2024-01-15',           confidence: 97.8, bounds: { x: 50, y: 60, width: 150, height: 20 } },
    { text: 'Amount: $299.99',            confidence: 98.5, bounds: { x: 50, y: 90, width: 130, height: 20 } },
    { text: 'Thank you for your business!', confidence: 96.3, bounds: { x: 30, y: 130, width: 200, height: 25 } },
  ],
  processingTime: '0.23s',
  totalCharacters: 67,
};
