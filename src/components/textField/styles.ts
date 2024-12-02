import { createStyles, createThemedStyles } from '@config/useStyles';
import { FontSize, FontWeight, StyleValues } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const styles = createThemedStyles((theme) => {
  return createStyles({
    textfieldWrapper: {
      flexDirection: 'column',
      gap: 3,
      marginBottom: 5,
    },
    label: {
      color: theme.text,
      fontSize: FontSize.titleSmall,
      fontWeight: FontWeight.bold,
      textTransform: 'capitalize',
    },
    textfield: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      minHeight: StyleValues.textfieldHeight,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderWidth: 0.5,
      borderColor: colorWithOpacity(theme.text, 0.75),
      borderRadius: 6,
    },
    textInput: {
      flex: 1,
      color: theme.text,
      fontSize: FontSize.bodyLarge,
    },
    error: {
      color: theme.error,
      fontSize: FontSize.bodyMedium,
    },
    errorTextfield: {
      borderColor: theme.error,
    },
    errorLabel: {
      color: theme.error,
    },
    filled: {
      borderColor: theme.text,
    },
    focused: {
      color: theme.primary,
      borderColor: theme.primary,
    },
  });
});
export default styles;
