import { memo } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from '@components/icon';
import { useAppSelector } from '@config/store';

import styles from './styles';

const IconButton = (props: IconButtonProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  const {
    family,
    name,
    onPress,
    containerStyle,
    iconStyle,
    underlayColor = theme.underlay,
  } = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, containerStyle]}
      underlayColor={underlayColor}
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
