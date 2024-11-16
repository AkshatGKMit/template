import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@config/useStyles';
import { colorWithOpacity } from '@utility/helpers';
import { FontSize, FontWeight, StyleValues } from '@themes';

const styles = createThemedStyles((theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    textfieldWrapper: {
      flexDirection: 'column',
      gap: 3,
      marginBottom: 5,
    },
    label: {
      color: colors.text,
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
      borderColor: colorWithOpacity(colors.text, 0.75),
      borderRadius: 6,
    },
    textInput: {
      flex: 1,
      color: colors.text,
      fontSize: FontSize.bodyLarge,
    },
    error: {
      color: colors.error,
      fontSize: FontSize.bodyMedium,
    },
    errorTextfield: {
      borderColor: colors.error,
    },
    errorLabel: {
      color: colors.error,
    },
    filled: {
      borderColor: colors.text,
    },
    focused: {
      color: colors.primary,
      borderColor: colors.primary,
    },
  });
});
export default styles;
