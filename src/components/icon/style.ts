import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize } from '@themes';

const ThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return createStyles({
    icon: {
      color: colors.defaultIcon,
      fontSize: FontSize.bodyLarge,
    },
  });
});

export default ThemedStyles;
