import { createStyles, createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme) => {
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
      backgroundColor: theme.divider,
      marginHorizontal: 12,
      marginVertical: 1,
    },
    listView: {
      shadowColor: theme.inverted.main,
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
      backgroundColor: theme.secondaryBackground,
      paddingVertical: 4,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryBackground,
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
