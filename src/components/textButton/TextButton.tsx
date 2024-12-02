import { Text, TouchableHighlight } from 'react-native';

import { useAppSelector } from '@config/store';
import { Colors } from '@themes';

const TextButton = (props: TextButtonProps) => {
  const { text, onPress, style, color = Colors.blue } = props;

  const theme = useAppSelector((state) => state.theme.colors);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={theme.underlay}
    >
      <Text
        style={[style, { color }]}
        {...props}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default TextButton;
