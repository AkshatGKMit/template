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
  flexGrow1: {
    flexGrow: 1,
  },
  positionRelative: {
    position: 'relative',
  },
  fullPositionAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullDimensions: {
    height: '100%',
    width: '100%',
  },
});
