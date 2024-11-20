import { memo, useContext } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';

import styles from './styles';

const IconButton = (props: IconButtonProps) => {
  const { family, name, onPress, containerStyle, iconStyle, underlayColor } = props;
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const highlightUnderlayColor = underlayColor ?? colors.underlay();

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, containerStyle]}
      underlayColor={highlightUnderlayColor}
      {...props}
    >
      <Icon
        family={family}
        name={name}
        style={iconStyle}
      />
    </TouchableHighlight>
  );
};

export default memo(IconButton);
