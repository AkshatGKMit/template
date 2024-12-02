import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize } from '@themes';

const ThemedStyles = createThemedStyles((theme) => {
  return createStyles({
    icon: {
      color: theme.text,
      fontSize: FontSize.bodyLarge,
    },
  });
});

export default ThemedStyles;
