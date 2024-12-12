import { createStyles, createThemedStyles } from '@utility/styles';
import { FONT_WEIGHT, Typography } from '@themes';

const ThemedStyles = createThemedStyles((theme, _, __, insets) => {
  const { inverted } = theme;
  const { bottom } = insets;

  return createStyles({
    bar: {
      position: 'absolute',
      zIndex: 30,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: inverted.secondaryBackground,
      paddingBottom: bottom ? bottom : 10,
      gap: 8,
    },
    paddedBar: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      gap: 2,
    },
    text: {
      ...Typography.labelMedium,
      color: inverted.text,
    },
    heading: {
      ...Typography.bodyLarge,
      fontWeight: FONT_WEIGHT.BOLD,
      color: inverted.text,
    },
  });
});

export default ThemedStyles;
