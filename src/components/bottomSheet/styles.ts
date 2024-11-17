import { createStyles, createThemedStyles } from '@config/useStyles';
import { Colors, Orientation } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = createThemedStyles((theme, dimensions, orientation, insets) => {
  const { colors } = theme;

  return createStyles({
    overlay: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: colorWithOpacity(colors.inverted.primaryBackground, 0.5),
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    sheet: {
      width: orientation === Orientation.portrait ? dimensions.width : dimensions.width / 1.5,
      backgroundColor: theme.colors.primaryBackground,
      position: 'absolute',
      alignSelf: 'center',
      paddingBottom: insets.bottom,
      zIndex: 11,
      alignContent: 'center',
    },
    pillView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.transparent,
    },
    pill: {
      height: 8,

      backgroundColor: theme.colors.secondaryText,
      borderRadius: 20,
      marginVertical: 8,
      alignItems: 'center',
      marginHorizontal: 'auto',
    },
  });
});

export default ThemedStyles;
