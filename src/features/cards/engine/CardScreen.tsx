/**
 * CardScreen — universal screen renderer.
 * Pass a ScreenConfig and it renders the full screen.
 * No per-card screen files needed for config-driven cards.
 */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import SectionBlock from '../../../components/common/SectionBlock';
import ActionButton from '../../../components/common/ActionButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Spacing, FontSize, FontWeight } from '../../../theme';
import type { ScreenConfig, ContentConfig } from './types';
import {
  RenderTextBlock, RenderTapTarget, RenderDelayedReveal,
  RenderValidationList, RenderInfiniteList, RenderEditableList,
  RenderScaledImages, RenderMultiLang, RenderFlicker,
  RenderRandomLayout, RenderMisleadingButtons, RenderLagButton,
  RenderOcrCalibration, RenderAoiFocus, RenderCombinedScroll,
  RenderDrmSimulation, RenderInputVariations,
} from './renderers';

// ─── Content dispatcher ───────────────────────────────────────────────────────
const Content = ({ cfg }: { cfg: ContentConfig }) => {
  switch (cfg.type) {
    case 'text':              return <RenderTextBlock cfg={cfg} />;
    case 'tap_target':        return <RenderTapTarget cfg={cfg} />;
    case 'delayed_reveal':    return <RenderDelayedReveal cfg={cfg} />;
    case 'validation_list':   return <RenderValidationList cfg={cfg} />;
    case 'infinite_list':     return <RenderInfiniteList cfg={cfg} />;
    case 'editable_list':     return <RenderEditableList cfg={cfg} />;
    case 'scaled_images':     return <RenderScaledImages cfg={cfg} />;
    case 'multi_lang':        return <RenderMultiLang cfg={cfg} />;
    case 'flicker':           return <RenderFlicker cfg={cfg} />;
    case 'random_layout':     return <RenderRandomLayout cfg={cfg} />;
    case 'misleading_buttons':return <RenderMisleadingButtons cfg={cfg} />;
    case 'lag_button':        return <RenderLagButton cfg={cfg} />;
    case 'ocr_calibration':   return <RenderOcrCalibration cfg={cfg} />;
    case 'aoi_focus':         return <RenderAoiFocus cfg={cfg} />;
    case 'combined_scroll':   return <RenderCombinedScroll cfg={cfg} />;
    case 'drm_simulation':    return <RenderDrmSimulation cfg={cfg} />;
    case 'input_variations':  return <RenderInputVariations cfg={cfg} />;
    default:                  return null;
  }
};

// ─── Main engine ──────────────────────────────────────────────────────────────
type Props = { config: ScreenConfig };

const CardScreen = ({ config }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper>
      <Text style={s.heading}>{config.heading}</Text>
      {config.hint ? <Text style={s.hint}>{config.hint}</Text> : null}

      {config.sections.map((section, i) => (
        <SectionBlock key={i} label={section.label}>
          <Content cfg={section.content} />
        </SectionBlock>
      ))}

      {config.cta && (
        <ActionButton
          label={config.cta.label}
          testID={config.cta.testID}
          onPress={() => navigation.navigate(config.cta!.route as any, config.cta!.routeParams as any)}
        />
      )}
    </ScreenWrapper>
  );
};

const s = StyleSheet.create({
  heading: { fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.xs },
  hint:    { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: Spacing.xl },
});

export default CardScreen;
