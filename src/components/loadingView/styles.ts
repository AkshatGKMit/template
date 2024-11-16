import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return createStyles({
    loaderView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colorWithOpacity(colors.inverted.primaryBackground, 0.6),
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    processInfo: {
      color: colors.primaryBackground,
      fontSize: FontSize.labelMedium,
    },
    invertedView: {
      backgroundColor: colorWithOpacity(colors.primaryBackground, 0.6),
    },
  });
});

export default ThemedStyles;
