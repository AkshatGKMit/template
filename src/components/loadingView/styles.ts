import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = createThemedStyles((theme) => {
  return createStyles({
    loaderView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colorWithOpacity(theme.inverted.primaryBackground, 0.6),
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    processInfo: {
      color: theme.primaryBackground,
      fontSize: FontSize.labelMedium,
    },
    invertedView: {
      backgroundColor: colorWithOpacity(theme.primaryBackground, 0.6),
    },
  });
});

export default ThemedStyles;
