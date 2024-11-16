import { createStyles, createThemedStyles } from '@config/useStyles';

export const GlobalThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return createStyles({
    screen: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    rowCenter: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    columnCenter: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    flex1: {
      flex: 1,
    },
  });
});
