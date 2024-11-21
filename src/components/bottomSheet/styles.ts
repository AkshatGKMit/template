import { createStyles, createThemedStyles } from '@config/useStyles';
import { Colors, Orientation } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = createThemedStyles((theme, dimensions, orientation, insets) => {
  const { colors } = theme;

  return createStyles({
    overlay: {
      backgroundColor: colorWithOpacity(colors.inverted.primaryBackground, 0.5),
      flex: 1,
    },
    sheet: {
      position: 'absolute',
      zIndex: 11,
      alignContent: 'center',
      alignSelf: 'center',
      width: orientation === Orientation.portrait ? dimensions.width : dimensions.width / 1.5,
      backgroundColor: theme.colors.primaryBackground,
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
      backgroundColor: theme.colors.secondaryText,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 'auto',
    },
  });
});

export default ThemedStyles;
