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
import { BottomSheetConstants } from '@constants';

import ThemedStyles from './styles';

const BottomSheetContainer = forwardRef<BottomSheetRef>((_, ref) => {
  const { hp, wp } = useScalingMetrics();
  const { show, hide, isVisible, data } = useBottomSheet();

  const { dimensions, orientation, safeAreaInsets: insets } = useContext(ThemeContext);

  const [modalHeight, setModalHeight] = useState(0);

  const {
    sheetSlideAnimDuration,
    overlayOpacityAnimDuration,
    maxClosingSnapPointThreshold,
    minClosingSnapPointThreshold,
    maxSnapPointThreshold,
    minSnapPointThreshold,
  } = BottomSheetConstants;

  const snapPointsRef = useRef<number[] | null>(null);
  const closingSnapPoint = useRef<number>(maxClosingSnapPointThreshold);

  const isOriginalPositionSet = useRef<boolean>(false);
  const modalOriginalPositionRef = useRef(dimensions.height);
  const modalSheetRef = useRef<View | null>(null);

  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;
  const slideSheetAnim = useRef(new Animated.Value(dimensions.height)).current;

  const styles = ThemedStyles();

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

  function resetRef() {
    snapPointsRef.current = null;
    closingSnapPoint.current = maxClosingSnapPointThreshold;
    modalOriginalPositionRef.current = dimensions.height;
    modalSheetRef.current = null;
  }

  function openBottomSheetAnim() {
    slideSheetAnim.setValue(dimensions.height);
    slideSheetAnim.flattenOffset();

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 1,
      duration: overlayOpacityAnimDuration,
      useNativeDriver: true,
    });

    const slideBottomSheetAnim = Animated.timing(slideSheetAnim, {
      toValue: sheetFinalPositionY,
      duration: sheetSlideAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([overlayAnim, slideBottomSheetAnim]).start();
  }

  function closeBottomSheetAnim(duration?: number) {
    slideSheetAnim.flattenOffset();

    const slideBottomSheetAnim = Animated.timing(slideSheetAnim, {
      toValue: dimensions.height,
      duration: duration ?? sheetSlideAnimDuration,
      useNativeDriver: true,
    });

    const overlayAnim = Animated.timing(overlayOpacityAnim, {
      toValue: 0,
      duration: duration ?? overlayOpacityAnimDuration,
      useNativeDriver: true,
    });

    Animated.parallel([slideBottomSheetAnim, overlayAnim]).start(() => {
      resetRef();
      hide();
    });
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
    const { snap } = data;
    if (snap) {
      const { closingPoint, points } = snap;

      const originalSnapPoint = (dimensions.height - modalHeight) / dimensions.height;
      points.push(originalSnapPoint);

      const validSnapPoints = points.filter(
        (point) => originalSnapPoint <= point && point < maxSnapPointThreshold,
      );
      snapPointsRef.current = validSnapPoints.sort();

      if (
        minClosingSnapPointThreshold <= closingPoint &&
        closingPoint <= maxClosingSnapPointThreshold
      ) {
        closingSnapPoint.current = closingPoint;
      }
    }
  }, [data.snap, modalHeight]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => true,
      onPanResponderGrant: () => {
        slideSheetAnim.extractOffset();
        if (!isOriginalPositionSet.current) {
          modalOriginalPositionRef.current = slideSheetAnim.__getValue();
          isOriginalPositionSet.current = true;
        }
      },
      onPanResponderMove: (_, gesture) => {
        const newY = slideSheetAnim.__getValue() + gesture.dy;

        if (newY > modalOriginalPositionRef.current) {
          Animated.event([null, { dy: slideSheetAnim }], {
            useNativeDriver: false,
          })(_, gesture);
        }
      },
      onPanResponderRelease: (_, { dy, moveY, vy }) => {
        if (vy > 1) {
          closeBottomSheetAnim(vy * 10);
          return;
        }

        let snapPoint = modalOriginalPositionRef.current;
        if (snapPointsRef.current && closingSnapPoint.current) {
          const points = snapPointsRef.current;
          const pointsPos = points.map((point) => hp(point * 100));
          const closePointPos = hp(closingSnapPoint.current * 100);

          if (moveY > closePointPos) {
            closeBottomSheetAnim();
            return;
          }

          let targetSnapPoint;

          if (dy > 0) {
            targetSnapPoint = pointsPos.find((point) => point >= moveY);
            if (!targetSnapPoint) {
              targetSnapPoint = pointsPos[pointsPos.length - 1];
            }
          } else {
            targetSnapPoint = [...pointsPos].reverse().find((point) => point <= moveY);
            if (!targetSnapPoint) {
              targetSnapPoint = pointsPos[0];
            }
          }

          snapPoint = targetSnapPoint;
        } else if (moveY > hp(80)) {
          closeBottomSheetAnim();
          return;
        }

        slideSheetAnim.flattenOffset();
        Animated.timing(slideSheetAnim, {
          toValue: snapPoint,
          duration: sheetSlideAnimDuration / 10,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  if (!isVisible) return <></>;

  return (
    <>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacityAnim }]}>
        <Pressable
          onPress={() => closeBottomSheetAnim()}
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
