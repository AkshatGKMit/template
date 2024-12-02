import { FontSize } from '@themes';
import { createStyles, createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme) => {
  return createStyles({
    icon: {
      color: theme.text,
      fontSize: FontSize.bodyLarge,
    },
  });
});

export default ThemedStyles;
