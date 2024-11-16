import { useContext } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { colorWithOpacity } from '@utility/helpers';

import styles from './styles';

const IconButton = ({
  family,
  name,
  onPress,
  containerStyle,
  iconStyle,
  underlayColor,
}: IconBtnProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const highlightUnderlayColor = underlayColor ?? colors.underlay;

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, containerStyle]}
      underlayColor={highlightUnderlayColor}
    >
      <Icon
        family={family}
        name={name}
        style={iconStyle}
      />
    </TouchableHighlight>
  );
};

export default IconButton;
