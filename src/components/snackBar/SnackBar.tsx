import { View, Text, LayoutChangeEvent, Animated, PanResponder, Modal } from 'react-native';
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
import { Animation } from '@utility/helpers';

import ThemedStyles from './styles';

const defaultData: SnackbarParams = { text: '' };

const SnackBarRoot = forwardRef<SnackbarRef>((_, ref) => {
  const { safeAreaInsets: insets, dimensions, theme } = useContext(ThemeContext);

  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<SnackbarParams>(defaultData);
  const [height, setHeight] = useState<number>(0);

  const isIndefinite = useRef(false);
  const positionAnim = useRef(new Animated.Value(0)).current;

  const styles = ThemedStyles();

  function show(params: SnackbarParams) {
    const { duration = 3000, indefinite = false } = params;

    setData({ ...params, duration });
    setVisible(true);

    isIndefinite.current = indefinite;
    data.onShow?.();
  }

  function hide() {
    setVisible(false);
    setHeight(0);

    positionAnim.extractOffset();
    positionAnim.flattenOffset();
    positionAnim.resetAnimation();
    data.onHide?.();
  }

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show: (params: SnackbarParams) => show(params),
        hide: () => hide(),
      }),
      [],
    ),
  );

  const hidingAnimation = Animation.timing(positionAnim, 0, 300);

  const animate = useCallback(() => {
    const showingAnimation = Animation.timing(positionAnim, 1, 300);
    const delayingAnimAnimation = Animation.delay(data.duration!);

    const sequenceAnimations = [showingAnimation, delayingAnimAnimation];

    if (!isIndefinite.current) sequenceAnimations.push(hidingAnimation);

    Animated.sequence(sequenceAnimations).start(({ finished }) => {
      if (finished && !isIndefinite.current) hide();
    });
  }, [positionAnim, isIndefinite, hide]);

  useEffect(() => {
    if (isVisible) animate();
  }, [isVisible, height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isIndefinite.current,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 2) {
          hidingAnimation.start(({ finished }) => {
            if (finished) hide();
          });
        }
      },
    }),
  ).current;

  const { text, action, heading, containerStyle, headingStyle, textStyle } = data;

  const translateY = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [dimensions.height, dimensions.height - height],
  });

  const containerStyles = useMemo(
    () => [styles.paddedBar, containerStyle, styles.bar, { transform: [{ translateY }] }],
    [styles, containerStyle, translateY],
  );

  const _renderTitle = useCallback(
    () => (
      <Text
        style={[styles.heading, headingStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {heading}
      </Text>
    ),
    [heading, headingStyle],
  );

  const _renderText = useCallback(
    () => (
      <Text
        style={[styles.text, textStyle]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    ),
    [text, textStyle],
  );

  if (!isVisible) return null;

  return (
    <Animated.View
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      style={containerStyles}
      {...panResponder.panHandlers}
    >
      <View style={styles.content}>
        {heading && _renderTitle()}
        {_renderText()}
      </View>
      {action}
    </Animated.View>
  );
});

export default SnackBarRoot;
