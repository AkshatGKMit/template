import { View, Text, TouchableHighlight } from 'react-native';
import React, { useContext } from 'react';
import { Colors } from '@themes';
import ThemeContext from '@config/ThemeContext';

const TextButton = (props: TextButtonProps) => {
  const { text, onPress, style, color = Colors.blue } = props;

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.underlay(0.01)}
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
