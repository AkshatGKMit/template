import { createStyles, createThemedStyles } from '@config/useStyles';

const ThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return createStyles({
    item: {
      flexDirection: 'row',
      gap: 10,
      paddingLeft: 12,
      paddingVertical: 10,
      paddingRight: 30,
    },
    itemLabel: {},
    listSeparator: {
      width: 'auto',
      height: 0.75,
      backgroundColor: colors.divider(),
      marginHorizontal: 12,
      marginVertical: 1,
    },
    listView: {
      shadowColor: colors.inverted.main,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 3,
    },
    list: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: colors.secondaryBackground,
      paddingVertical: 4,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: colors.secondaryBackground,
      padding: 12,
      gap: 10,
      borderWidth: 1,
    },
    buttonText: {
      marginRight: 'auto',
    },
  });
});

export default ThemedStyles;
