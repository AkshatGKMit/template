import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { useAppSelector } from '@config/store';
import { AppBarConstants } from '@constants';
import { FontFamily, FontSize } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { createThemedStyles } from '@utility/styles';

export namespace AppBar {
  export const Small = ({
    title,
    titleColor,
    backgroundColor,
    iconColor,
    leading,
    trailing,
  }: SmallAppBarProps) => {
    const theme = useAppSelector(({ theme }) => theme.colors);

    const styles = ThemedStyles();

    const containerStyles: StyleProp<ViewStyle> = [
      styles.container,
      { backgroundColor: backgroundColor ?? theme.primary },
    ];

    const { iconSize } = AppBarConstants;

    return (
      <View style={containerStyles}>
        <View style={styles.targetContainer}>
          {leading && (
            <IconButton
              color={iconColor}
              {...leading}
              size={iconSize}
            />
          )}
        </View>
        <TextBlock
          style={styles.title}
          fontFamily={FontFamily.normal.heavy}
          fontSize={FontSize.titleLarge}
          color={titleColor}
          numberOfLines={1}
          ellipsizeMode="tail"
          children={title}
        />
        <View style={styles.targetContainer}>
          {trailing && (
            <IconButton
              color={iconColor}
              {...trailing}
              size={iconSize}
            />
          )}
        </View>
      </View>
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
    targetContainer: {
      ...globalStyles.columnCenter,
      height: targetSize,
      width: targetSize,
    },
    title: {
      ...globalStyles.flex1,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });
});
