import TextBlock from '@components/textBlock';
import { APP_NAME, SPLASH_SCREEN_DURATION, Typography } from '@constants';
import { useAppSelector } from '@store';
import { FONT_WEIGHT } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';
import { useEffect, useState } from 'react';
import { Animated, Easing, useWindowDimensions, View } from 'react-native';

const SplashAnimation = () => {
  const totalDuration = SPLASH_SCREEN_DURATION - 500;

  const { height, width } = useWindowDimensions();

  const dropTranslateYAnimValue = Animation.newValue(-0.1);
  const dropScaleAnimValue = Animation.newValue(1);
  const horizontalLinesTranslateAnimValue = Animation.newValue(0);
  const verticalLinesTranslateAnimValue = Animation.newValue(0);
  const logoOpacityAnimValue = Animation.newValue(0);

  const dropAnimation = () => {
    const dropDuration = totalDuration / 2;

    return Animation.sequence([
      Animation.timing(dropTranslateYAnimValue, 0.75, dropDuration * 0.45, Easing.in(Easing.ease)),
      Animation.timing(dropTranslateYAnimValue, 0.5, dropDuration * 0.2, Easing.out(Easing.ease)),
      Animation.timing(dropScaleAnimValue, 20, dropDuration * 0.35),
    ]);
  };

  const logoAnimation = () => {
    const logoDuration = totalDuration / 2;

    return Animated.stagger(logoDuration * 0.15, [
      Animation.parallel([
        Animation.timing(horizontalLinesTranslateAnimValue, 1, logoDuration * 0.4, Easing.linear),
        Animation.timing(verticalLinesTranslateAnimValue, 1, logoDuration * 0.4, Easing.linear),
      ]),
      Animation.timing(logoOpacityAnimValue, 1, logoDuration * 0.05),
    ]);
  };

  useEffect(() => {
    Animation.sequence([dropAnimation(), logoAnimation()]).start();
  }, []);

  const interpolateDropTranslateY = dropTranslateYAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const interpolateVerticalLinesTranslateY = verticalLinesTranslateAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, height],
  });

  const interpolateHorizontalLinesTranslateX = horizontalLinesTranslateAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return {
    dropTranslateY: interpolateDropTranslateY,
    dropScale: dropScaleAnimValue,
    horizontalLinesTranslate: interpolateHorizontalLinesTranslateX,
    verticalLinesTranslate: interpolateVerticalLinesTranslateY,
    logoOpacity: logoOpacityAnimValue,
  };
};

const Splash = () => {
  const { width } = useWindowDimensions();
  const { colors: theme } = useAppSelector(({ theme }) => theme);

  const {
    dropTranslateY,
    dropScale,
    horizontalLinesTranslate,
    verticalLinesTranslate,
    logoOpacity,
  } = SplashAnimation();

  const [textWidth, setTextWidth] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primaryBackground,
        ...globalStyles.columnCenter,
      }}
    >
      <Animated.View
        style={{
          height: 50,
          width: 50,
          backgroundColor: theme.primary,
          borderRadius: 25,
          alignSelf: 'center',
          position: 'absolute',
          top: 0,
          transform: [{ translateY: dropTranslateY }, { scale: dropScale }],
        }}
      />
      <Animated.View
        style={{
          ...globalStyles.fullPositionAbsolute,
          ...globalStyles.columnCenter,
          gap: textWidth + 20,
          transform: [{ translateX: horizontalLinesTranslate }],
        }}
      >
        <View
          style={{
            height: 1,
            width: width / 1.5,
            backgroundColor: theme.all.surface,
            borderRadius: 1,
          }}
        />
        <View
          style={{
            height: 1,
            width: width / 1.5,
            backgroundColor: theme.all.surface,
            borderRadius: 1,
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...globalStyles.fullPositionAbsolute,
          ...globalStyles.rowCenter,
          gap: textWidth + 20,
          transform: [{ translateY: verticalLinesTranslate }],
        }}
      >
        <View
          style={{
            height: width / 1.5,
            width: 1,
            backgroundColor: theme.all.surface,
            borderRadius: 1,
          }}
        />
        <View
          style={{
            height: width / 1.5,
            width: 1,
            backgroundColor: theme.all.surface,
            borderRadius: 1,
          }}
        />
      </Animated.View>
      <Animated.View style={{ width: 'auto', opacity: logoOpacity }}>
        <TextBlock
          onLayout={({ nativeEvent }) => setTextWidth(nativeEvent.layout.width)}
          typography={Typography.displayLarge}
          fontWeight={FONT_WEIGHT.BLACK}
          color={theme.all.secondaryContainer}
          style={{ textTransform: 'capitalize', textAlign: 'center' }}
        >
          {APP_NAME}
        </TextBlock>
      </Animated.View>
    </View>
  );
};

export default Splash;
