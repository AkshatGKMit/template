import { createStyles, createThemedStyles } from '@utility/styles';
import { Colors, Orientation } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = createThemedStyles((theme, dimensions, orientation, insets) => {
  return createStyles({
    overlay: {
      backgroundColor: colorWithOpacity(theme.inverted.primaryBackground, 0.5),
      flex: 1,
    },
    sheet: {
      position: 'absolute',
      zIndex: 11,
      alignContent: 'center',
      alignSelf: 'center',
      width: orientation === Orientation.portrait ? dimensions.width : dimensions.width / 1.5,
      backgroundColor: theme.primaryBackground,
      paddingBottom: insets.bottom,
    },
    pillView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.transparent,
      paddingVertical: 8,
    },
    pill: {
      height: 8,
      width: dimensions.width / 5,
      backgroundColor: theme.secondaryText,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 'auto',
    },
  });
});

export default ThemedStyles;
