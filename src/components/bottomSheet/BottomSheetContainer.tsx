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
import useScalingMetrics from '@config/useScalingMetrics';
import { BottomSheetConstants } from '@constants';
import { Animation } from '@utility/helpers';

import ThemedStyles from './styles';

const defaultData: BottomSheetParams = {
  child: null,
};

const BottomSheetContainer = forwardRef<BottomSheetRef>((_, ref) => {
  const {
    sheetSlideAnimDuration,
    overlayOpacityAnimDuration,
    maxClosingSnapPointThreshold,
    minClosingSnapPointThreshold,
    maxSnapPointThreshold,
  } = BottomSheetConstants;

  const { hp, wp } = useScalingMetrics();

  const { theme, dimensions, orientation, safeAreaInsets: insets } = useContext(ThemeContext);

  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<BottomSheetParams>(defaultData);
  const [sheetHeight, setSheetHeight] = useState(0);

  const snapPointsRef = useRef<number[] | null>(null);
  const closingSnapPoint = useRef<number>(maxClosingSnapPointThreshold);

  const sheetOriginalPositionRef = useRef<number | null>(null);

  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;
  const sheetPosYAnim = useRef(new Animated.Value(dimensions.height)).current;

  const styles = ThemedStyles();

  const maxSheetHeight = useMemo(
    () => dimensions.height - insets.top - hp(5),
    [dimensions, insets],
  );
  const finalSheetPosY = useMemo(
    () => dimensions.height - sheetHeight,
    [sheetHeight, dimensions.height],
  );

  function onShow(params: BottomSheetParams) {
    const { isDismissible = true, backgroundColor = theme.colors.primaryBackground } = params;
    setData({ ...params, isDismissible, backgroundColor });
    setVisible(true);
  }

  function onHide() {
    setVisible(false);
    snapPointsRef.current = null;
    closingSnapPoint.current = maxClosingSnapPointThreshold;
    sheetOriginalPositionRef.current = dimensions.height;
    setSheetHeight(0);
  }

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show: (params: BottomSheetParams) => onShow(params),
        hide: () => onHide(),
      }),
      [],
    ),
  );

  function resetValues() {}

  function openBottomSheetAnim() {
    sheetPosYAnim.setValue(dimensions.height);
    sheetPosYAnim.flattenOffset();

    Animated.parallel([
      Animation.timing(overlayOpacityAnim, 1, overlayOpacityAnimDuration),
      Animation.timing(sheetPosYAnim, finalSheetPosY, sheetSlideAnimDuration),
    ]).start();
  }

  function closeBottomSheetAnim(duration?: number) {
    sheetPosYAnim.flattenOffset();

    Animated.parallel([
      Animation.timing(sheetPosYAnim, dimensions.height, duration ?? sheetSlideAnimDuration),
      Animation.timing(overlayOpacityAnim, 0, duration ?? overlayOpacityAnimDuration),
    ]).start(() => {
      resetValues();
      onHide();
    });
  }

  const handleHardwareBackPress = () => {
    if (data.isDismissible) closeBottomSheetAnim();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
  }, []);

  useEffect(() => {
    sheetOriginalPositionRef.current =
      dimensions.height - (sheetHeight > dimensions.height ? maxSheetHeight : sheetHeight);
  }, [sheetHeight, dimensions.height, orientation]);

  useEffect(() => {
    if (isVisible) openBottomSheetAnim();
  }, [sheetHeight, isVisible]);

  useEffect(() => {
    const { snap } = data;
    if (snap) {
      const { closingPoint, points } = snap;

      const originalSnapPoint = (dimensions.height - sheetHeight) / dimensions.height;
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
  }, [data.snap, sheetHeight]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt) => true,
        onPanResponderGrant: () => {
          sheetPosYAnim.extractOffset();
        },
        onPanResponderMove: (_, gesture) => {
          const newY = Animation.getAnimatedValue(sheetPosYAnim) + gesture.dy;

          if (newY > sheetOriginalPositionRef.current!) {
            Animated.event([null, { dy: sheetPosYAnim }], { useNativeDriver: false })(_, gesture);
          }
        },
        onPanResponderRelease: (_, { dy, moveY, vy }) => {
          if (vy > 1) {
            closeBottomSheetAnim(vy * 10);
            return;
          }

          let snapPoint = sheetOriginalPositionRef.current!;
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

          sheetPosYAnim.flattenOffset();
          Animation.timing(sheetPosYAnim, snapPoint, sheetSlideAnimDuration / 10).start();
        },
      }),
    [dimensions.height],
  );

  if (!isVisible) return null;

  return (
    <>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacityAnim,
          },
        ]}
      >
        {data.isDismissible && (
          <Pressable
            onPress={() => closeBottomSheetAnim()}
            style={{ flex: 1 }}
          />
        )}
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          const { height, y } = e.nativeEvent.layout;
          setSheetHeight(height);
        }}
        style={[
          styles.sheet,
          {
            transform: [{ translateY: sheetPosYAnim }],
            maxHeight: maxSheetHeight,
            borderTopLeftRadius: data.borderRadius,
            borderTopRightRadius: data.borderRadius,
            backgroundColor: data.backgroundColor,
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
