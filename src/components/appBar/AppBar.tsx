import { View, Text, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native';

import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { useAppSelector } from '@config/store';
import { AppBarConstants } from '@constants';
import { FontFamily, FontSize } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { createThemedStyles } from '@utility/styles';
import useScalingMetrics from '@config/useScalingMetrics';

export namespace AppBar {
  const Main = ({
    title,
    titleColor,
    centerTitle,
    backgroundColor,
    iconColor,
    leading,
    trailing,
  }: AppBarProps) => {
    const theme = useAppSelector(({ theme }) => theme.colors);

    const styles = ThemedStyles();

    const containerStyles: StyleProp<ViewStyle> = [
      styles.container,
      { backgroundColor: backgroundColor ?? theme.primary },
    ];

    const { iconSize } = AppBarConstants;

    const titleStyles: StyleProp<TextStyle> = [
      styles.title,
      centerTitle ? styles.centerAlignedTitle : null,
    ];

    return (
      <View style={containerStyles}>
        <View style={styles.trailingContainer}>
          {leading && (
            <IconButton
              color={iconColor}
              {...leading}
              size={iconSize}
            />
          )}
        </View>
        <TextBlock
          style={titleStyles}
          fontFamily={FontFamily.normal.heavy}
          fontSize={FontSize.titleLarge}
          color={titleColor}
          numberOfLines={1}
          ellipsizeMode="tail"
          children={title}
        />
        {trailing}
      </View>
    );
  };

  const TrailingContainer = (trailing?: IconButtonProps, iconColor?: string) => {
    const styles = ThemedStyles();

    const { iconSize } = AppBarConstants;

    return (
      <View style={styles.trailingContainer}>
        {trailing && (
          <IconButton
            color={iconColor}
            {...trailing}
            size={iconSize}
          />
        )}
      </View>
    );
  };

  export const Small = (props: SmallAppBarProps) => {
    const styles = ThemedStyles();

    const { trailing, iconColor } = props;

    return (
      <Main
        {...props}
        trailing={TrailingContainer(trailing, iconColor)}
      />
    );
  };

  export const Extended = (props: ExtendedAppBarProps) => {
    const {} = useScalingMetrics();

    const styles = ThemedStyles();

    const { trailing, iconColor } = props;
    const { targetSize, gap, maxExtendedTrailing } = AppBarConstants;

    const trailingLength = Math.min(trailing?.length ?? 0, maxExtendedTrailing);

    const trailingSize = trailingLength * targetSize + gap;

    return (
      <Main
        {...props}
        trailing={<View style={[styles.extendedTrailingContainer, { width: trailingSize }]}></View>}
      />
    );
  };
}

export default AppBar;

const ThemedStyles = createThemedStyles((theme) => {
  const { height, gap, paddingHorizontal, targetSize } = AppBarConstants;

  return StyleSheet.create({
    container: {
      ...globalStyles.rowCenter,
      height,
      width: '100%',
      gap,
      paddingHorizontal,
    },
    extendedTrailingContainer: {
      ...globalStyles.columnCenter,
      height: targetSize,
      backgroundColor: 'yellow',
    },
    trailingContainer: {
      ...globalStyles.columnCenter,
      height: targetSize,
      width: targetSize,
      backgroundColor: 'red',
    },
    title: {
      ...globalStyles.flex1,
      textAlignVertical: 'center',
    },
    centerAlignedTitle: {
      textAlign: 'center',
    },
  });
});
