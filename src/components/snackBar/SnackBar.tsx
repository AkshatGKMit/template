import { View, Text, LayoutChangeEvent, Animated } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import ThemeContext from '@config/ThemeContext';
import { Animation } from '@utility/helpers';
import IconButton from '@components/iconButton';
import { IconFamily } from '@constants';

const defaultData: SnackbarParams = {
  child: null,
};

const SnackBarRoot = forwardRef<SnackbarRef>((_, ref) => {
  const { safeAreaInsets: insets, dimensions } = useContext(ThemeContext);

  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<SnackbarParams>(defaultData);
  const [height, setHeight] = useState<number>(0);

  const positionAnim = useRef(new Animated.Value(0)).current;

  function onShow(params: SnackbarParams) {
    const { animationDuration = 200, delay = 3000, dismissible = true } = params;
    setData({ ...params, animationDuration, delay, dismissible });
    setVisible(true);
  }

  function onHide() {
    setVisible(false);
    setHeight(0);
    positionAnim.resetAnimation();
  }

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show: (params: SnackbarParams) => onShow(params),
        hide: () => onHide(),
      }),
      [],
    ),
  );

  function _measure(e: LayoutChangeEvent): void {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  }

  const animate = () => {
    const showAnim = Animation.timing(positionAnim, 1, 200);
    const delayAnim = Animation.delay(3000);
    const hideAnim = Animation.timing(positionAnim, 0, 200);

    Animated.sequence([showAnim, delayAnim, hideAnim]).start();
  };

  useEffect(() => {
    if (isVisible) animate();
  }, [isVisible, height]);

  const translateY = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [dimensions.height, dimensions.height - height],
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      onLayout={_measure}
      style={{
        position: 'absolute',
        backgroundColor: 'grey',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: insets.bottom,
        transform: [{ translateY }],
        paddingVertical: 8,
        paddingHorizontal: 15,
      }}
    >
      <Text>{data.child}</Text>
      <IconButton
        family={IconFamily.antDesign}
        name="closecircle"
        style={{ marginLeft: 'auto' }}
      />
    </Animated.View>
  );
});

export default SnackBarRoot;
