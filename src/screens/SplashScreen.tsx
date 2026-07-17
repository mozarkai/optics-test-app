import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients, Colors, FontSize, FontWeight } from '../theme';

type Props = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: Props) => {
  // Animation values
  const logoScale   = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth   = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo pops in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      // 2. Accent line draws across
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // 3. Tagline fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // 4. Hold
      Animated.delay(700),
      // 5. Whole screen fades out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, [lineWidth, logoOpacity, logoScale, onFinish, screenOpacity, textOpacity]);

  const lineScaleX = lineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.root, { opacity: screenOpacity }]}>
      <LinearGradient
        colors={Gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Logo mark */}
        <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <View style={styles.logoBox}>
            <Image
              source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* App name */}
        <Animated.Text style={[styles.appName, { opacity: logoOpacity }]}>
          QuickTest
        </Animated.Text>

        {/* Accent line */}
        <View style={styles.lineTrack}>
          <Animated.View style={[styles.line, { transform: [{ scaleX: lineScaleX }] }]} />
        </View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>
          Framework · Test · Automate
        </Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    marginBottom: 20,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 54,
    height: 54,
  },
  appName: {
    fontSize: FontSize['7xl'],
    fontWeight: FontWeight.black,
    color: Colors.white,
    letterSpacing: 6,
    marginBottom: 16,
  },
  lineTrack: {
    width: 120,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  line: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 1,
    transformOrigin: 'left',
  },
  tagline: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;
