export type OcrImageLine = {
  text: string;
  bold?: boolean;
  large?: boolean;
};

export type OcrImage = {
  id: number;
  title: string;
  text: string;           // flat text for detail screen
  lines: OcrImageLine[];  // structured lines for card rendering
  backgroundColor: string;
  clickable: boolean;
  orientation: 'horizontal' | 'vertical' | 'diagonal';
};

export type OcrTextBlock = {
  id: number;
  title: string;
  content: string;
  orientation: 'horizontal' | 'vertical';
};

export type OcrResultBlock = {
  text: string;
  confidence: number;
  bounds: { x: number; y: number; width: number; height: number };
};

export type OcrResults = {
  confidence: number;
  language: string;
  textBlocks: OcrResultBlock[];
  processingTime: string;
  totalCharacters: number;
};
