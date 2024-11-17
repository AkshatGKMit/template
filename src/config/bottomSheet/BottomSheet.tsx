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
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import ThemeContext from '@config/ThemeContext';
import useScalingMetrics from '@config/useScalingMetrics';
import ThemedStyles from './styles';
import { useBottomSheet } from '@config/useBottomSheet';

let refs: BottomSheetRefObj[] = [];

function addNewRef(newRef: BottomSheetRef) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef: BottomSheetRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

const BottomSheet = React.forwardRef((props: any, ref: any) => {
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

  const { show, hide, isVisible, data } = useBottomSheet();

  console.log('Visible: ', isVisible);

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

    Animated.parallel([slideBottomSheetAnim, overlayAnim]).start(() => hide());
  }

  useEffect(() => {
    if (modalSheetRef.current) {
      modalSheetRef.current.measureInWindow((_, __, ___, height) => {
        setModalHeight(Math.min(height, minModalHeight));
      });
    }
  }, [dimensions.height, orientation, data.child]);

  useEffect(() => {
    openBottomSheet();
  }, [modalHeight, isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => true,
      onPanResponderGrant: () => {
        sheetSlideAnim.extractOffset();
        originalPositionRef.current = sheetSlideAnim.__getValue();
      },
      onPanResponderMove: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
        // if (gesture.dy > 0) {
        Animated.event([null, { dy: sheetSlideAnim }], {
          useNativeDriver: false,
        })(event, gesture);
        // }
      },
      // onPanResponderRelease: (_, gesture) => {
      //   if (gesture.dy > 40) closeBottomSheet();
      //   else {
      //     sheetSlideAnim.flattenOffset();
      //     Animated.timing(sheetSlideAnim, {
      //       toValue: originalPositionRef.current,
      //       duration: sheetAnimDuration / 10,
      //       useNativeDriver: true,
      //     }).start();
      //   }
      // },
    }),
  ).current;

  if (!isVisible) return <Text>Bottom Sheet is not visible</Text>;

  return (
    <>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacityAnim }]}>
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
        {/* <ScrollView style={{ backgroundColor: 'red', width: '100%' }}>
          {Array.from({ length: 10 }).map((_: unknown, i) => (
            <Text
              key={i}
              style={{ color: theme.colors.text }}
            >
              {i}
            </Text>
          ))}
        </ScrollView> */}
        {data.child}
      </Animated.View>
    </>
  );
});

export function BottomSheetRoot(props: any) {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null);

  const setRef = useCallback((ref: BottomSheetRef | null) => {
    if (ref) {
      bottomSheetRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(bottomSheetRef.current);
    }
  }, []);

  console.log('Root Props: ', props);

  return (
    <BottomSheet
      ref={setRef}
      {...props}
    />
  );
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  console.log('Active Ref:', activeRef);
  return activeRef ? activeRef.current : null;
}

BottomSheetRoot.show = (params: any) => {
  console.log('Params: ', params);

  getRef()?.show(params);
};
BottomSheetRoot.hide = (params: any) => {
  getRef()?.hide(params);
};

export default BottomSheet;
