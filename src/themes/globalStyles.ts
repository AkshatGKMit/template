import { createStyles, createThemedStyles } from '@utility/styles';

export const GlobalThemedStyles = createThemedStyles((theme) => {
  return createStyles({
    screen: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },
  });
});

export const globalStyles = createStyles({
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
