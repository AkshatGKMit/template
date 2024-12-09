import { createStyles, createThemedStyles } from '@utility/styles';
import { FontWeight, StyleValues, Typography } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const styles = createThemedStyles((theme) => {
  return createStyles({
    textfieldWrapper: {
      flexDirection: 'column',
      gap: 3,
      marginBottom: 5,
    },
    label: {
      ...Typography.titleSmall,
      color: theme.text,
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
      ...Typography.bodyLarge,
    },
    error: {
      color: theme.error,
      ...Typography.bodyMedium,
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
