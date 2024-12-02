import { useContext } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { ComponentsConstants, FabBorderRadius, FabSize } from '@constants';
import { GlobalThemedStyles } from '@themes/globalStyles';

import styles from './styles';

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles();

  const { marginFromScreen } = ComponentsConstants.fab;

  const {
    icon,
    onPress,
    zIndex,
    style,
    onLayout,
    iconColor = theme.colors.text,
    borderRadius = FabBorderRadius.auto,
    size = FabSize.normal,
    backgroundColor = theme.colors.primary,
  } = props;

  const fabStyles = [
    style,
    styles.fab,
    globalStyles.columnCenter,
    {
      margin: marginFromScreen,
      height: size,
      width: size,
      backgroundColor,
      borderRadius,
      shadowColor: theme.colors.inverted.main,
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        onLayout={onLayout}
        style={fabStyles}
      >
        <Icon
          {...icon}
          style={[styles.fabIcon, { color: iconColor }]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FloatingActionButton;
