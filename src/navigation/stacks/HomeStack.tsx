import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors, FontSize, Shadows } from '../../theme';
import BackButton from '../../components/common/BackButton';
import { CARD_CONFIG } from '../../features/cards/cardConfig';
import HomeScreen from '../../screens/HomeScreen';

// Legacy screens
import { OcrScreen, OcrDetailScreen } from '../../features/ocr';
import { ScrollSwipeScreen } from '../../features/scrollSwipe';
import { AnimationScreen } from '../../features/animation';

// Centralized card screen registry from the engine barrel
import { CARD_SCREEN_COMPONENTS } from '../../features/cards/engine/AllCardScreens';

const Stack = createStackNavigator<RootStackParamList>();

const H = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.backgroundCard, ...Shadows.header },
  headerTitleStyle: { fontSize: FontSize.xl, fontWeight: '600' as const, color: Colors.textPrimary },
  headerLeft: () => <BackButton color={Colors.textPrimary} />,
};
const WhiteHeaderBackButton = () => <BackButton color={Colors.white} />;

type CardRouteName = Extract<keyof RootStackParamList, `Card${number}_S${number}`>;
type CardScreenEntry = [CardRouteName, (typeof CARD_SCREEN_COMPONENTS)[CardRouteName]];

const CARD_TITLE_BY_NUMBER = new Map<number, string>(
  CARD_CONFIG.map((card) => [card.num, card.title]),
);

const parseCardRoute = (route: CardRouteName): { cardNumber: number; stage: number } | null => {
  const match = /^Card(\d+)_S(\d+)$/.exec(route);
  if (!match) {
    return null;
  }
  return { cardNumber: Number(match[1]), stage: Number(match[2]) };
};

const getCardHeaderTitle = (route: CardRouteName): string => {
  const parsed = parseCardRoute(route);
  if (!parsed) {
    return route;
  }
  const baseTitle = CARD_TITLE_BY_NUMBER.get(parsed.cardNumber) ?? `Card ${parsed.cardNumber}`;
  const stageLabel = parsed.stage === 3 ? 'Done' : `S${parsed.stage}`;
  return `${baseTitle} - ${stageLabel}`;
};

const cardScreens: CardScreenEntry[] = (Object.entries(CARD_SCREEN_COMPONENTS) as CardScreenEntry[])
  .sort(([left], [right]) => {
    const l = parseCardRoute(left);
    const r = parseCardRoute(right);
    if (!l || !r) {
      return left.localeCompare(right);
    }
    if (l.cardNumber !== r.cardNumber) {
      return l.cardNumber - r.cardNumber;
    }
    return l.stage - r.stage;
  });

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />

    {/* Legacy */}
    <Stack.Screen name="TextIdentification" component={OcrScreen}        options={{ ...H, title: 'Text Identification' }} />
    <Stack.Screen name="TextDetail"         component={OcrDetailScreen}   options={{ ...H, title: 'OCR Analysis' }} />
    <Stack.Screen name="ScrollSwipe"        component={ScrollSwipeScreen} options={{ ...H, title: 'Scroll & Swipe' }} />
    <Stack.Screen name="Animation"          component={AnimationScreen}   options={{ ...H, title: 'Animation Gallery', headerStyle: { backgroundColor: Colors.primary }, headerTitleStyle: { ...H.headerTitleStyle, color: Colors.white }, headerLeft: WhiteHeaderBackButton }} />
    {cardScreens.map(([name, component]) => (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={{ ...H, title: getCardHeaderTitle(name) }}
      />
    ))}
  </Stack.Navigator>
);

export default HomeStack;
