import { Animated, Text, TouchableWithoutFeedback } from 'react-native';

import Icon from '@components/icon';
import { useAppSelector } from '@config/store';
import { ComponentsConstants, FabBorderRadius, FabSize } from '@constants';
import { globalStyles } from '@themes/globalStyles';

import styles from './styles';

const FloatingActionButton = (props: FabProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  const { marginFromScreen } = ComponentsConstants.fab;

  const {
    onPress,
    style,
    onLayout,
    children,
    borderRadius = FabBorderRadius.auto,
    size = FabSize.normal,
    backgroundColor = theme.primary,
  } = props;

  const fabStyles = [
    style,
    styles.fab,
    globalStyles.rowCenter,
    {
      margin: marginFromScreen,
      height: size,
      width: size,
      backgroundColor,
      borderRadius,
      shadowColor: theme.inverted.main,
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
  const theme = useAppSelector((state) => state.theme.colors);

  const { icon, color = theme.text } = props;

  return (
    <FloatingActionButton {...props}>
      <Icon
        {...icon}
        style={[styles.fabIcon, { color: color }]}
      />
    </FloatingActionButton>
  );
};

FloatingActionButton.Expanded = (props: FabExpandedProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  const { text, icon, color = theme.text } = props;

  return (
    <FloatingActionButton
      {...props}
      style={styles.extendedFab}
    >
      {icon && (
        <Icon
          {...icon}
          style={[styles.fabIcon, { color }]}
        />
      )}
      <Text style={[styles.fabText, { color }]}>{text}</Text>
    </FloatingActionButton>
  );
};

export default FloatingActionButton;
