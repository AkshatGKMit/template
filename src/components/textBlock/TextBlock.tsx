import { Text, StyleProp, TextStyle } from 'react-native';

import { useAppSelector } from '@store';
import { FontFamily, Typography } from '@themes';

const TextBlock = (props: TextBlockProps) => {
  const theme = useAppSelector(({ theme }) => theme);
  const { family: fontFamily, typography, style, children, color } = props;

  const textStyles: StyleProp<TextStyle> = [
    style,
    {
      ...(typography ?? Typography.bodyMedium),
      color: color ?? theme.colors.text,
      fontFamily,
    },
  ];

  return (
    <Text
      {...props}
      style={textStyles}
    >
      {children}
    </Text>
  );
};

export default TextBlock;
