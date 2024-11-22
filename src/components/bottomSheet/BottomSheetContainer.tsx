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
import { View, Animated, PanResponder, Pressable, BackHandler, Modal } from 'react-native';

import ThemeContext from '@config/ThemeContext';
import useScalingMetrics from '@config/useScalingMetrics';
import { BottomSheetConstants } from '@constants';
import { Animation } from '@utility/helpers';

import ThemedStyles from './styles';
import { GlobalThemedStyles } from '@themes/globalStyles';
import { Orientation } from '@themes';

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

  const modalOpacityAnimation = useRef(new Animated.Value(0)).current;
  const sheetPositionYAnimation = useRef(new Animated.Value(dimensions.height)).current;

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const { child, backgroundColor, borderRadius, isDismissible, snap, onHide, onShow } = data;

  const maxSheetHeight = useMemo(
    () => dimensions.height - insets.top - hp(5),
    [dimensions, insets],
  );
  const finalSheetPosY = useMemo(
    () => dimensions.height - sheetHeight,
    [sheetHeight, dimensions.height],
  );

  function showModal(params: BottomSheetParams) {
    const { isDismissible = true, backgroundColor = theme.colors.primaryBackground } = params;
    setData({ ...params, isDismissible, backgroundColor });
    setVisible(true);
  }

  function hideModal() {
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
        show: (params: BottomSheetParams) => showModal(params),
        hide: hideModal,
      }),
      [],
    ),
  );

  function openBottomSheetAnimation() {
    sheetPositionYAnimation.setValue(dimensions.height);
    sheetPositionYAnimation.flattenOffset();

    Animated.parallel([
      Animation.timing(modalOpacityAnimation, 1, overlayOpacityAnimDuration),
      Animation.timing(sheetPositionYAnimation, finalSheetPosY, sheetSlideAnimDuration),
    ]).start();
  }

  function closeBottomSheetAnimation(duration?: number) {
    sheetPositionYAnimation.flattenOffset();

    Animated.parallel([
      Animation.timing(
        sheetPositionYAnimation,
        dimensions.height,
        duration ?? sheetSlideAnimDuration,
      ),
      Animation.timing(modalOpacityAnimation, 0, duration ?? overlayOpacityAnimDuration),
    ]).start(() => hideModal());
  }

  useEffect(() => {
    sheetOriginalPositionRef.current =
      dimensions.height - (sheetHeight > dimensions.height ? maxSheetHeight : sheetHeight);
  }, [sheetHeight, dimensions.height, orientation]);

  useEffect(() => {
    if (isVisible) openBottomSheetAnimation();
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
  }, [snap, sheetHeight]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt) => true,
        onPanResponderGrant: () => {
          sheetPositionYAnimation.extractOffset();
        },
        onPanResponderMove: (_, gesture) => {
          const newY = Animation.getAnimatedValue(sheetPositionYAnimation) + gesture.dy;

          if (newY > sheetOriginalPositionRef.current!) {
            Animated.event([null, { dy: sheetPositionYAnimation }], { useNativeDriver: false })(
              _,
              gesture,
            );
          }
        },
        onPanResponderRelease: (_, { dy, moveY, vy }) => {
          if (vy > 1) {
            closeBottomSheetAnimation(vy * 10);
            return;
          }

          let snapPoint = sheetOriginalPositionRef.current!;
          if (snapPointsRef.current && closingSnapPoint.current) {
            const points = snapPointsRef.current;
            const pointsPos = points.map((point) => hp(point * 100));
            const closePointPos = hp(closingSnapPoint.current * 100);

            if (moveY > closePointPos) {
              closeBottomSheetAnimation();
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
            closeBottomSheetAnimation();
            return;
          }

          sheetPositionYAnimation.flattenOffset();
          Animation.timing(sheetPositionYAnimation, snapPoint, sheetSlideAnimDuration / 10).start();
        },
      }),
    [dimensions.height],
  );

  const overlayStyles = useMemo(
    () => [styles.overlay, { opacity: modalOpacityAnimation }],
    [styles, modalOpacityAnimation],
  );

  const sheetStyles = useMemo(
    () => [
      styles.sheet,
      {
        transform: [{ translateY: sheetPositionYAnimation }],
        maxHeight: maxSheetHeight,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        backgroundColor,
      },
    ],
    [sheetPositionYAnimation, maxSheetHeight, borderRadius, backgroundColor],
  );

  const _renderOverlay = useCallback(
    () => (
      <Animated.View style={overlayStyles}>
        {isDismissible && (
          <Pressable
            onPress={() => closeBottomSheetAnimation()}
            style={globalStyles.flex1}
          />
        )}
      </Animated.View>
    ),
    [isDismissible, overlayStyles, modalOpacityAnimation],
  );

  const _renderSheet = useCallback(
    () => (
      <Animated.View
        onLayout={(e) => {
          const { height, y } = e.nativeEvent.layout;
          setSheetHeight(height);
        }}
        style={sheetStyles}
      >
        <View
          style={styles.pillView}
          {...panResponder.panHandlers}
        >
          <View style={styles.pill} />
        </View>
        {child}
      </Animated.View>
    ),
    [sheetStyles, styles, panResponder, child],
  );

  return (
    <Modal
      transparent
      statusBarTranslucent
      onRequestClose={() => closeBottomSheetAnimation()}
      visible={isVisible}
      supportedOrientations={[Orientation.landscape, Orientation.portrait]}
    >
      {_renderOverlay()}
      {_renderSheet()}
    </Modal>
  );
});

export default BottomSheetContainer;
