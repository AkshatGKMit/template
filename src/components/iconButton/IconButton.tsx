import { memo } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from '@components/icon';
import { useAppSelector } from '@config/store';

import styles from './styles';

const IconButton = (props: IconButtonProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  const { family, name, color, size, style, onPress, underlayColor = theme.underlay } = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={underlayColor}
      {...props}
    >
      <Icon
        family={family}
        name={name}
        color={color}
        size={size}
      />
    </TouchableHighlight>
  );
};

export default memo(IconButton);
