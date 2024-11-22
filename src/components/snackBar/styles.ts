import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize, FontWeight } from '@themes';

const ThemedStyles = createThemedStyles((theme, _, __, insets) => {
  const { inverted } = theme.colors;
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
      fontSize: FontSize.labelMedium,
      color: inverted.text,
    },
    heading: {
      fontWeight: FontWeight.bold,
      fontSize: FontSize.bodyLarge,
      color: inverted.text,
    },
  });
});

export default ThemedStyles;
