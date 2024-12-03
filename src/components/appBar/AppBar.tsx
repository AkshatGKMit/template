import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import React from 'react';
import { createStyles, createThemedStyles } from '@utility/styles';
import { AppBarConstants } from '@constants';
import { useAppSelector } from '@config/store';
import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock/TextBlock';
import { globalStyles } from '@themes/globalStyles';
import { FontFamily, FontSize } from '@themes';

export namespace AppBar {
  export const Small = ({ backgroundColor }: { backgroundColor?: string }) => {
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
          <IconButton
            family="Entypo"
            name="menu"
            size={iconSize}
          />
        </View>
        <TextBlock
          style={styles.title}
          fontFamily={FontFamily.normal.heavy}
          fontSize={FontSize.titleLarge}
        >
          App Bar
        </TextBlock>
        <View style={styles.targetContainer}>
          <IconButton
            family="FontAwesome"
            name="filter"
            size={iconSize}
          />
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
