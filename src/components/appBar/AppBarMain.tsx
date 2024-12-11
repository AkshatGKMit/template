import { View, StyleProp, ViewStyle, TextStyle, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { APP_BAR_CONSTANTS, isIos } from '@constants';
import { useAppSelector } from '@store';
import { FontFamily, Typography } from '@themes';

import ThemedStyles from './styles';

const AppBarMain = (props: AppBarProps) => {
  const { top: topInsets } = useSafeAreaInsets();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const {
    title,
    titleColor,
    centerTitle,
    iconColor,
    leading,
    trailing,
    backgroundColor = theme.appBar.background,
  } = props;

  const styles = ThemedStyles();

  const containerStyles: StyleProp<ViewStyle> = [styles.container, { backgroundColor }];

  const { ICON_TYPOGRAPHY: iconSize } = APP_BAR_CONSTANTS;

  const titleStyles: StyleProp<TextStyle> = [
    styles.title,
    centerTitle ? styles.centerAlignedTitle : null,
  ];

  return (
    <>
      <View style={{ height: topInsets, backgroundColor }} />
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
          family={FontFamily.normal.heavy}
          typography={Typography.titleLarge}
          color={titleColor}
          numberOfLines={1}
          ellipsizeMode="tail"
          children={title}
        />
        {trailing}
      </View>
    </>
  );
};

export default AppBarMain;
