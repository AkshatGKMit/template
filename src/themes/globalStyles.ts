import { createStyles, createThemedStyles } from '@config/useStyles';
import { Colors } from './colors';

export const GlobalThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return createStyles({
    screen: {
      flex: 1,
      backgroundColor: Colors.white,
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
