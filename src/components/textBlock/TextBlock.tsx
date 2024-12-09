import { Text, StyleProp, TextStyle } from 'react-native';

import { useAppSelector } from '@store';
import { FontFamily, Typography } from '@themes';

const TextBlock = (props: TextBlockProps) => {
  const theme = useAppSelector(({ theme }) => theme);
  const { family: fontFamily, typography, style, children, color } = props;

  const textStyles: StyleProp<TextStyle> = [
    style,
    {
      fontFamily: fontFamily ?? FontFamily.normal.regular,
      color: color ?? theme.colors.text,
      ...(typography ?? Typography.bodyMedium),
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
