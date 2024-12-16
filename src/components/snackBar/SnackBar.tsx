import { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import { Icons, SNACKBAR_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import styles from './styles';

const defaultData: SnackbarParams = { message: '' };

const { MEASUREMENTS, THEME } = SNACKBAR_CONSTANTS;

const { CONTAINER_COLOR, ICON_COLOR, LABEL_COLOR, LABEL_TYPOGRAPHY, TEXT_COLOR, TEXT_TYPOGRAPHY } =
  THEME;

const { ICON_SIZE } = MEASUREMENTS;

const snackbarAnimation = () => {
  const translateYAnimatedValue = Animation.newValue(0);
  const opacityAnimatedValue = Animation.newValue(0);
  const scaleAnimatedValue = Animation.newValue(0);

  const show = useCallback(() => {
    translateYAnimatedValue.setOffset(0);
    scaleAnimatedValue.setOffset(0);
    opacityAnimatedValue.setOffset(0);

    return Animated.parallel([
      Animation.timing(translateYAnimatedValue, 1, 200),
      Animation.timing(opacityAnimatedValue, 1, 200),
      Animation.timing(scaleAnimatedValue, 1, 200),
    ]);
  }, []);

  const hide = useCallback(() => {
    return Animated.parallel([
      Animation.timing(translateYAnimatedValue, 0, 200),
      Animation.timing(opacityAnimatedValue, 0, 200),
      Animation.timing(scaleAnimatedValue, 0, 200),
    ]);
  }, []);

  const onHide = useCallback(() => {
    translateYAnimatedValue.flattenOffset();
    scaleAnimatedValue.flattenOffset();
    opacityAnimatedValue.flattenOffset();
  }, []);

  const animate = useCallback(async (delay: number = 3000) => {
    Animated.sequence([show(), Animated.delay(delay), hide()]).start(onHide);
  }, []);

  const interpolateTranslateY = translateYAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return {
    animate,
    hide,
    onHide,
    translateY: interpolateTranslateY,
    opacity: opacityAnimatedValue,
    scale: scaleAnimatedValue,
  };
};

const SnackBarRoot = forwardRef<SnackbarRef>((_, ref) => {
  const { bottom: bottomInsets } = useSafeAreaInsets();

  const { colors: theme } = useAppSelector(({ theme }) => theme);

  const [data, setData] = useState<SnackbarParams>(defaultData);

  const { animate, opacity, scale, translateY, hide, onHide } = snackbarAnimation();

  function show(params: SnackbarParams) {
    const { duration } = params;

    setData(params);
    animate(duration);
  }

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show: (params: SnackbarParams) => show(params),
        hide: () => hide().start(onHide),
      }),
      [],
    ),
  );

  const { message, actionText, onAction } = data;

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      bottom: bottomInsets + 10,
      backgroundColor: theme.all[CONTAINER_COLOR],
      transform: [{ translateY }, { scale }],
      opacity,
    },
  ];

  return (
    <Animated.View style={containerStyles}>
      <TextBlock
        typography={TEXT_TYPOGRAPHY}
        color={theme.all[TEXT_COLOR]}
        style={globalStyles.flex1}
      >
        {message}
      </TextBlock>
      <Pressable onPress={onAction}>
        <TextBlock
          typography={LABEL_TYPOGRAPHY}
          color={theme.all[LABEL_COLOR]}
        >
          {actionText}
        </TextBlock>
      </Pressable>
      <Pressable onPress={() => hide().start(onHide)}>
        <Icon
          icon={Icons.materialIcons.close}
          color={theme.all[ICON_COLOR]}
          size={ICON_SIZE}
        />
      </Pressable>
    </Animated.View>
  );
});

export default memo(SnackBarRoot);
