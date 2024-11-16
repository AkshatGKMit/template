import { createStyles, createThemedStyles } from '@config/useStyles';

const ThemedStyles = createThemedStyles((theme, _, __, insets) => {
  const { colors } = theme;

  return createStyles({
    statusBar: {
      height: insets.top,
      width: '100%',
      backgroundColor: colors.statusBar,
    },
  });
});
export default ThemedStyles;
