import { Text, StyleProp, TextStyle } from 'react-native';

import { useAppSelector } from '@store';
import { FontFamily, FontSize } from '@themes';

const TextBlock = (props: TextBlockProps) => {
  const theme = useAppSelector(({ theme }) => theme);
  const { fontFamily, fontSize, style, children, color } = props;

  const textStyles: StyleProp<TextStyle> = [
    style,
    {
      fontFamily: fontFamily ?? FontFamily.normal.regular,
      fontSize: fontSize ?? FontSize.labelMedium,
      color: color ?? theme.colors.text,
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
