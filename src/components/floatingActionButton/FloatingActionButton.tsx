import { useContext } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { ComponentsConstants, FabBorderRadius, FabSize } from '@constants';
import { GlobalThemedStyles } from '@themes/globalStyles';

import styles from './styles';

const FloatingActionButton = (props: FabProps) => {
  const { theme } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles();

  const { marginFromScreen } = ComponentsConstants.fab;

  const {
    onPress,
    style,
    onLayout,
    children,
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
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

FloatingActionButton.Shrink = (props: FabShrinkProps) => {
  const { theme } = useContext(ThemeContext);

  const { icon, color = theme.colors.text } = props;

  return (
    <FloatingActionButton {...props}>
      <Icon
        {...icon}
        style={[styles.fabIcon, { color: color }]}
      />
    </FloatingActionButton>
  );
};

export default FloatingActionButton;
