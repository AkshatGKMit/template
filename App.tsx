import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Button,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  Switch,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';
import useScalingMetrics from '@config/useScalingMetrics';
import { colorWithOpacity } from '@utility/helpers';
import { Colors, Orientation } from '@themes';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const animDuration = 1000;

const Main = () => {
  const { hp, wp } = useScalingMetrics();

  const {
    theme,
    switchThemeMode,
    dimensions,
    orientation,
    safeAreaInsets: insets,
  } = useContext(ThemeContext);

  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const modalHeightRef = useRef(0);
  const originalPositionRef = useRef(dimensions.height);

  const modalSheetRef = useRef<View>(null);

  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;
  const sheetSlideAnim = useRef(new Animated.Value(dimensions.height)).current;

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  function openBottomSheet() {
    setShowBottomSheet(true);
    sheetSlideAnim.flattenOffset();

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    });

    const slideBottomSheetAnim = Animated.timing(sheetSlideAnim, {
      toValue: dimensions.height - modalHeightRef.current,
      duration: animDuration,
      useNativeDriver: true,
    });

    Animated.parallel([overlayAnim, slideBottomSheetAnim]).start();
  }

  function closeBottomSheet() {
    sheetSlideAnim.flattenOffset();

    const slideBottomSheetAnim = Animated.timing(sheetSlideAnim, {
      toValue: dimensions.height,
      duration: animDuration,
      useNativeDriver: true,
    });

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    });

    Animated.parallel([slideBottomSheetAnim, overlayAnim]).start(() => setShowBottomSheet(false));
  }

  useEffect(() => {
    if (modalSheetRef.current) {
      modalSheetRef.current.measureInWindow((_, __, ___, height) => {
        const minModalHeight = dimensions.height - insets.top - hp(5);
        if (height > minModalHeight) modalHeightRef.current = minModalHeight;
        else modalHeightRef.current = height;
      });
    }
  }, [dimensions.height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
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
          console.log('Snapping to: ', originalPositionRef.current);
          sheetSlideAnim.flattenOffset();
          Animated.timing(sheetSlideAnim, {
            toValue: originalPositionRef.current,
            duration: animDuration / 10,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <GradientScreen style={{ padding: 20 }}>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />

      <Button
        title="Show Bottom Sheet"
        onPress={openBottomSheet}
      />

      {showBottomSheet && (
        <>
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 10,
              backgroundColor: colorWithOpacity(theme.colors.inverted.primaryBackground, 0.5),
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: overlayOpacityAnim,
            }}
          >
            <Pressable
              onPress={closeBottomSheet}
              style={{ flex: 1 }}
            />
          </Animated.View>
          <Animated.View
            ref={modalSheetRef}
            style={{
              maxHeight: dimensions.height - hp(5) - insets.top,
              width:
                orientation === Orientation.portrait ? dimensions.width : dimensions.width / 1.5,
              backgroundColor: theme.colors.primaryBackground,
              position: 'absolute',
              alignSelf: 'center',
              transform: [{ translateY: sheetSlideAnim }],
              paddingHorizontal: 5,
              paddingBottom: insets.bottom,
              zIndex: 11,
              alignContent: 'center',
              alignItems: 'center',
            }}
            {...panResponder.panHandlers}
          >
            <View
              style={{
                height: 8,
                width: wp(100) / 7,
                backgroundColor: theme.colors.secondaryText,
                borderRadius: 20,
                marginVertical: 8,
                alignItems: 'center',
              }}
            />
            <Pressable style={{ width: '100%' }}>
              <Text>{modalHeightRef.current}</Text>
              <ScrollView
                scrollEnabled
                nestedScrollEnabled
                style={{ backgroundColor: 'red', width: '100%' }}
              >
                {Array.from({ length: 100 }).map((_: unknown, i) => (
                  <Text
                    key={i}
                    style={{ color: theme.colors.text }}
                  >
                    {i}
                  </Text>
                ))}
              </ScrollView>
            </Pressable>
          </Animated.View>
        </>
      )}
    </GradientScreen>
  );
};

export default App;
