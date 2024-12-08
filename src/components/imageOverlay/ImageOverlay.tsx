import { View, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

import { globalStyles } from '@themes/globalStyles';
import { colorWithOpacity } from '@utility/helpers';

const ImageOverlay = (props: ImageOverlayProps) => {
  const { overlayOpacity, overlayColor, style, children, containerStyle } = props;

  const overlayStyles: StyleProp<ViewStyle> = [
    globalStyles.flex1,
    { backgroundColor: colorWithOpacity(overlayColor, overlayOpacity) },
  ];

  const childrenStyle = [containerStyle, globalStyles.flex1, globalStyles.fullPositionAbsolute];

  return (
    <FastImage
      {...props}
      style={[style, { position: 'relative' }]}
    >
      <View style={overlayStyles} />
      <View style={childrenStyle}>{children}</View>
    </FastImage>
  );
};

export default ImageOverlay;
