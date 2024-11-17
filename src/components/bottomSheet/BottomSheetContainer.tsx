import {
  useContext,
  useState,
  useRef,
  useMemo,
  useImperativeHandle,
  useCallback,
  useEffect,
  forwardRef,
} from 'react';
import { View, Animated, PanResponder, Pressable, BackHandler } from 'react-native';

import ThemeContext from '@config/ThemeContext';
import useBottomSheet from '@config/useBottomSheet';
import useScalingMetrics from '@config/useScalingMetrics';

import ThemedStyles from './styles';

const BottomSheetContainer = forwardRef<BottomSheetRef>((_, ref) => {
  const { hp, wp } = useScalingMetrics();
  const { show, hide, isVisible, data } = useBottomSheet();

  const { dimensions, orientation, safeAreaInsets: insets } = useContext(ThemeContext);

  const [modalHeight, setModalHeight] = useState(0);

  const modalOriginalPositionRef = useRef(dimensions.height);
  const modalSheetRef = useRef<View>(null);

  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;
  const slideSheetAnim = useRef(new Animated.Value(dimensions.height)).current;

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

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show],
    ),
  );

  function openBottomSheetAnim() {
    slideSheetAnim.setValue(dimensions.height);
    slideSheetAnim.flattenOffset();

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 1,
      duration: opacityAnimDuration,
      useNativeDriver: true,
    });

    const slideBottomSheetAnim = Animated.timing(slideSheetAnim, {
      toValue: sheetFinalPositionY,
      duration: sheetAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([overlayAnim, slideBottomSheetAnim]).start();
  }

  function closeBottomSheetAnim() {
    slideSheetAnim.flattenOffset();

    const slideBottomSheetAnim = Animated.timing(slideSheetAnim, {
      toValue: dimensions.height,
      duration: sheetAnimDuration,
      useNativeDriver: true,
    });

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 0,
      duration: opacityAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([slideBottomSheetAnim, overlayAnim]).start(() => hide());
  }

  useEffect(() => {
    if (modalSheetRef.current) {
      modalSheetRef.current.measureInWindow((_, __, ___, height) => {
        setModalHeight(Math.min(height, minModalHeight));
      });
    }
  }, [dimensions.height, orientation, data.child]);

  const handleHardwareBackPress = () => {
    closeBottomSheetAnim();
    return true;
  };

  useEffect(() => {
    openBottomSheetAnim();
  }, [modalHeight, isVisible]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => true,
      onPanResponderGrant: () => {
        slideSheetAnim.extractOffset();
        modalOriginalPositionRef.current = slideSheetAnim.__getValue();
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          Animated.event([null, { dy: slideSheetAnim }], {
            useNativeDriver: false,
          })(_, gesture);
        }
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy > 40) closeBottomSheetAnim();
        else {
          slideSheetAnim.flattenOffset();
          Animated.timing(slideSheetAnim, {
            toValue: modalOriginalPositionRef.current,
            duration: sheetAnimDuration / 10,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!isVisible) return <></>;

  return (
    <>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacityAnim }]}>
        <Pressable
          onPress={closeBottomSheetAnim}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.View
        ref={modalSheetRef}
        style={[
          styles.sheet,
          {
            transform: [{ translateY: slideSheetAnim }],
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
        {data.child}
      </Animated.View>
    </>
  );
});

export default BottomSheetContainer;
