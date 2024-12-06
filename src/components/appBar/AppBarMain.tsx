import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';

import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { APP_BAR_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { FontFamily, FontSize } from '@themes';

import ThemedStyles from './styles';

const AppBarMain = ({
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

  const { ICON_SIZE: iconSize } = APP_BAR_CONSTANTS;

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

export default AppBarMain;
