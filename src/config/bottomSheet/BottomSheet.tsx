import {
  View,
  Text,
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  ScrollView,
} from 'react-native';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import ThemeContext from '@config/ThemeContext';
import useScalingMetrics from '@config/useScalingMetrics';
import ThemedStyles from './styles';

const BottomSheet = () => {
  const { hp, wp } = useScalingMetrics();

  const { theme, dimensions, orientation, safeAreaInsets: insets } = useContext(ThemeContext);

  const [modalHeight, setModalHeight] = useState(0);

  const originalPositionRef = useRef(dimensions.height);

  const modalSheetRef = useRef<View>(null);

  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;
  const sheetSlideAnim = useRef(new Animated.Value(dimensions.height)).current;

  const styles = ThemedStyles();

  const opacityAnimDuration = 100;
  const sheetAnimDuration = 250;

  const minModalHeight = useMemo(
    () => dimensions.height - insets.top - hp(5),
    [dimensions, insets],
  );
  const sheetFinalPositionY = useMemo(
    () => dimensions.height - modalHeight,
    [modalHeight, dimensions.height],
  );

  function openBottomSheet() {
    sheetSlideAnim.setValue(dimensions.height);
    sheetSlideAnim.flattenOffset();

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 1,
      duration: opacityAnimDuration,
      useNativeDriver: true,
    });

    const slideBottomSheetAnim = Animated.timing(sheetSlideAnim, {
      toValue: sheetFinalPositionY,
      duration: sheetAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([overlayAnim, slideBottomSheetAnim]).start();
  }

  function closeBottomSheet() {
    sheetSlideAnim.flattenOffset();

    const slideBottomSheetAnim = Animated.timing(sheetSlideAnim, {
      toValue: dimensions.height,
      duration: sheetAnimDuration,
      useNativeDriver: true,
    });

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 0,
      duration: opacityAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([slideBottomSheetAnim, overlayAnim]).start();
  }

  useEffect(() => {
    if (modalSheetRef.current) {
      modalSheetRef.current.measureInWindow((_, __, ___, height) => {
        if (height > minModalHeight) setModalHeight(minModalHeight);
        else setModalHeight(height);
      });
    }
  }, [dimensions.height, orientation]);

  useEffect(() => {
    openBottomSheet();
  }, [modalHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => true,
      onPanResponderGrant: () => {
        sheetSlideAnim.extractOffset();
        originalPositionRef.current = sheetSlideAnim.__getValue();
      },
      onPanResponderMove: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
        if (gesture.dy > 0) {
          Animated.event([null, { dy: sheetSlideAnim }], {
            useNativeDriver: false,
          })(event, gesture);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 40) closeBottomSheet();
        else {
          sheetSlideAnim.flattenOffset();
          Animated.timing(sheetSlideAnim, {
            toValue: originalPositionRef.current,
            duration: sheetAnimDuration / 10,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <>
      <Animated.View
        style={[
          styles.overlay,
          { opacity: overlayOpacityAnim, maxHeight: dimensions.height - hp(5) - insets.top },
        ]}
      >
        <Pressable
          onPress={closeBottomSheet}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.View
        ref={modalSheetRef}
        style={[
          styles.sheet,
          {
            transform: [{ translateY: sheetSlideAnim }],
            maxHeight: minModalHeight,
          },
        ]}
      >
        <View
          style={[styles.pillView, { height: hp(3) }]}
          {...panResponder.panHandlers}
        >
          <View style={[styles.pill, { width: wp(100) / 5 }]} />
        </View>
        <ScrollView style={{ backgroundColor: 'red', width: '100%' }}>
          {Array.from({ length: 10 }).map((_: unknown, i) => (
            <Text
              key={i}
              style={{ color: theme.colors.text }}
            >
              {i}
            </Text>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default BottomSheet;
