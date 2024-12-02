import { Orientation } from '@themes';
import { useCallback } from 'react';
import { PixelRatio, useWindowDimensions } from 'react-native';

const useScalingMetrics = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Determine the smaller and larger of the two dimensions (portrait vs. landscape)
  // screenWidth contains smaller dimension of screen (It contains width in portrait and height in landscape)
  const screenWidth = Math.min(windowWidth, windowHeight);
  const screenHeight = Math.max(windowWidth, windowHeight);

  // Base screen dimensions for scaling(typically used for iPhone 6/7/8 width and height)
  const baseWidth = 375;
  const baseHeight = 812;

  // Scale based on screen width and height
  const horizontalScale = (size: number) => (screenWidth / baseWidth) * size;
  const verticalScale = (size: number) => (screenHeight / baseHeight) * size;

  // Moderate scale, factors in width scaling
  const moderateScale = (size: number, factor = 0.5) =>
    size + (horizontalScale(size) - size) * factor;
  // Use when you need to scale UI elements like fonts(fontSizes,etc.), maintaining consistency across devices

  // Scale based on both dimensions (width and height)
  const scaleSize = (size: number, factor = 0.5) => {
    const scaledWidth = horizontalScale(size);
    const scaledHeight = verticalScale(size);
    return scaledWidth + (scaledHeight - scaledWidth) * factor;
  };
  // Use when you need to scale elements considering both width and height (e.g., padding, margins, icons)

  const dp = useCallback((value: number) => PixelRatio.roundToNearestPixel(value), []);

  // Convert width percentage to pixels
  const wp = (widthPercent: number | string) => {
    const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return dp((screenWidth * elemWidth) / 100);
  };
  // Use when you want to set the width of elements as a percentage of the screen width (e.g., boxes, layouts, images, views, button widths)

  // Convert height percentage to pixels
  const hp = useCallback(
    (heightPercent: number | string) => {
      const elemHeight =
        typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
      return dp((screenHeight * elemHeight) / 100);
    },
    [screenHeight],
  );
  // Use when you want to set the height of elements as a percentage of the screen height(e.g., boxes, layouts, images, views, button heights)

  const landscape = windowWidth > windowHeight;
  const portrait = windowWidth < windowHeight;

  const orientation = landscape ? Orientation.landscape : Orientation.portrait;

  return {
    hs: horizontalScale,
    vs: verticalScale,
    ms: moderateScale,
    ss: scaleSize,
    WH: windowHeight,
    WW: windowWidth,
    wp,
    hp,
    dp,
    orientation,
    landscape,
    portrait,
  };
};

export default useScalingMetrics;
