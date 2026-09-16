import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const useDetailAnimations = (
  isLoading: boolean,
  hasData: boolean,
  goBack: () => void,
) => {
  const screenTranslateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const imageScale = useRef(new Animated.Value(0.3)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(screenTranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [screenTranslateX]);

  useEffect(() => {
    if (!isLoading && hasData) {
      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(cardTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLoading, hasData, imageScale, imageOpacity, cardTranslateY]);

  const animateExitAndGoBack = () => {
    Animated.timing(screenTranslateX, {
      toValue: SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      goBack();
    });
  };

  return {
    screenTranslateX,
    imageScale,
    imageOpacity,
    cardTranslateY,
    animateExitAndGoBack,
  };
};
