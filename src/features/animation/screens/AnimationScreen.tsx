import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../../navigation/types';

const { width } = Dimensions.get('window');

// ─── Extracted loader components (own hooks — no Rules of Hooks violation) ────

const ProgressRingLoader = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [progressAnim]);
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.progressRing}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              transform: [
                {
                  rotate: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
        <View style={styles.progressCenter} />
      </View>
      <Text style={styles.loaderText}>Progress: 75%</Text>
    </View>
  );
};

const ShimmerLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: width,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.shimmerCard}>
        <Animated.View
          style={[styles.shimmerEffect, { transform: [{ translateX: shimmerAnim }] }]}
        />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerLine} />
          <View style={[styles.shimmerLine, { width: '60%' }]} />
          <View style={[styles.shimmerLine, { width: '40%' }]} />
        </View>
      </View>
      <Text style={styles.loaderText}>Loading content...</Text>
    </View>
  );
};

const AnimationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;
  const waveAnim3 = useRef(new Animated.Value(0)).current;

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startRotateAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const startWaveAnimation = () => {
    const waveSequence = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    waveSequence(waveAnim1, 0).start();
    waveSequence(waveAnim2, 200).start();
    waveSequence(waveAnim3, 400).start();
  };

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -20,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startPulseAnimation();
    startRotateAnimation();
    startWaveAnimation();
    startBounceAnimation();
  }, []);

  const PulseLoader = () => (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.pulseCircle,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <Text style={styles.loaderText}>Loading...</Text>
    </View>
  );

  const SpinnerLoader = () => (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.spinnerRing} />
        <View style={styles.spinnerDot} />
      </Animated.View>
      <Text style={styles.loaderText}>Processing...</Text>
    </View>
  );

  const WaveLoader = () => (
    <View style={styles.loaderContainer}>
      <View style={styles.waveContainer}>
        <Animated.View
          style={[
            styles.waveBar,
            {
              transform: [
                {
                  scaleY: waveAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.waveBar,
            {
              transform: [
                {
                  scaleY: waveAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.waveBar,
            {
              transform: [
                {
                  scaleY: waveAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <Text style={styles.loaderText}>Analyzing...</Text>
    </View>
  );

  const BounceLoader = () => (
    <View style={styles.loaderContainer}>
      <View style={styles.bounceContainer}>
        <Animated.View
          style={[
            styles.bounceDot,
            {
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.bounceDot,
            {
              transform: [{ translateY: Animated.add(translateYAnim, 10) }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.bounceDot,
            {
              transform: [{ translateY: Animated.add(translateYAnim, 20) }],
            },
          ]}
        />
      </View>
      <Text style={styles.loaderText}>Bouncing...</Text>
    </View>
  );


  const animations = [
    {
      name: 'Pulse Loading',
      description: 'Smooth pulsing animation',
      component: <PulseLoader />,
    },
    {
      name: 'Spinner',
      description: 'Rotating loading indicator',
      component: <SpinnerLoader />,
    },
    {
      name: 'Wave Bars',
      description: 'Animated wave bars',
      component: <WaveLoader />,
    },
    {
      name: 'Bounce Dots',
      description: 'Bouncing dots animation',
      component: <BounceLoader />,
    },
    {
      name: 'Progress Ring',
      description: 'Circular progress indicator',
      component: <ProgressRingLoader />,
    },
    {
      name: 'Shimmer',
      description: 'Shimmer loading effect',
      component: <ShimmerLoader />,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradientBackground}>
        <View style={styles.animationContainer}>
          {animations[currentAnimation].component}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              setCurrentAnimation((prev) =>
                prev === 0 ? animations.length - 1 : prev - 1
              )
            }
          >
            <Text style={styles.controlButtonText}>⬅️ Previous</Text>
          </TouchableOpacity>

          <View style={styles.animationInfo}>
            <Text style={styles.animationName}>
              {animations[currentAnimation].name}
            </Text>
            <Text style={styles.animationDescription}>
              {animations[currentAnimation].description}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              setCurrentAnimation((prev) =>
                prev === animations.length - 1 ? 0 : prev + 1
              )
            }
          >
            <Text style={styles.controlButtonText}>Next ➡️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.animationGrid}>
          {animations.map((animation, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.gridItem,
                currentAnimation === index && styles.activeGridItem,
              ]}
              onPress={() => setCurrentAnimation(index)}
            >
              <Text style={styles.gridItemText}>{animation.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  gradientBackground: {
    flex: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  backSlot: {
    width: 70,
  },
  titleSlot: {
    flex: 1,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  pageSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  spinner: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  spinnerRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
  },
  spinnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 20,
  },
  waveBar: {
    width: 8,
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  bounceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    marginBottom: 20,
  },
  bounceDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  progressRing: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressFill: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    borderTopColor: 'transparent',
    position: 'absolute',
  },
  progressCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  shimmerCard: {
    width: 200,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  shimmerEffect: {
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
  },
  shimmerContent: {
    padding: 16,
  },
  shimmerLine: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    marginBottom: 8,
  },
  loaderText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  animationInfo: {
    alignItems: 'center',
    flex: 1,
  },
  animationName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  animationDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  animationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 8,
    minWidth: (width - 60) / 3,
    alignItems: 'center',
  },
  activeGridItem: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'white',
  },
  gridItemText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AnimationScreen;