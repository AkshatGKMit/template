import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import Icon from '@components/icon';
import IconButton from '@components/iconButton';
import { useAppSelector } from '@config/store';
import { colorWithOpacity } from '@utility/helpers';

import textfieldStyles from './styles';

const TextField = ({
  value,
  onChangeText,
  placeholder,
  label,
  ref,
  autoFocus,
  keyboardType,
  inputMode,
  enterKeyHint,
  onSubmitEditing,
  onEndEditing,
  errorMsg,
  secureText,
  prefixIcon,
  suffixIconButton,
  containerStyle,
  textInputStyle,
  multiline,
  addOns,
}: TextFieldProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  const inputRef = useRef<TextInput>(null);

  const styles = textfieldStyles();
  const [isFocused, setIsFocused] = useState(false);

  const _onFocus = useCallback(() => {
    (ref ?? inputRef).current?.focus();
    setIsFocused(true);
  }, [ref]);

  const _onBlur = useCallback(() => setIsFocused(false), []);

  const getColor = useCallback(
    (isPlaceHolder = false) => {
      const placeholderOpacity = 0.75;

      if (errorMsg)
        return isPlaceHolder ? colorWithOpacity(theme.error, placeholderOpacity) : theme.error;

      if (isFocused)
        return isPlaceHolder ? colorWithOpacity(theme.primary, placeholderOpacity) : theme.primary;

      return isPlaceHolder ? theme.placeholder : theme.text;
    },
    [isFocused, errorMsg, theme],
  );

  const textInputStyles = useMemo(
    () => [styles.textInput, textInputStyle, multiline && { paddingBottom: 5 }],
    [styles, textInputStyle, multiline],
  );

  const Label = () => (
    <Text
      style={[styles.label, { color: getColor() }]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Text>
  );

  const TextInputNode = () => (
    <TextInput
      ref={ref ?? inputRef}
      value={value}
      onChangeText={onChangeText}
      onFocus={_onFocus}
      onBlur={_onBlur}
      keyboardType={keyboardType}
      inputMode={inputMode}
      autoComplete={'off'}
      onEndEditing={onEndEditing}
      enterKeyHint={enterKeyHint}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={getColor(true)}
      secureTextEntry={secureText}
      autoFocus={autoFocus}
      style={textInputStyles}
      autoCapitalize="sentences"
      multiline={multiline}
      {...addOns}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={_onFocus}>
      <View style={[styles.textfieldWrapper, value && styles.filled, containerStyle]}>
        {label && <Label />}

        <View
          style={[styles.textfield, isFocused && styles.focused, errorMsg && styles.errorTextfield]}
        >
          {prefixIcon && (
            <Icon
              style={{ color: getColor() }}
              {...prefixIcon}
            />
          )}

          <TextInputNode />

          {suffixIconButton && (
            <IconButton
              iconStyle={{ color: getColor() }}
              {...suffixIconButton}
            />
          )}
        </View>

        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(TextField);
