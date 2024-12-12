import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { colorWithOpacity } from '@utility/helpers';

import ActionButton from './ActionButton';

const { THEME, MEASUREMENTS } = COMMON_BUTTON_CONSTANTS.OUTLINED;

const { OUTLINE_WIDTH } = MEASUREMENTS;

const {
  CONTAINER_COLOR,
  DISABLED_OUTLINE_COLOR,
  LABEL_COLOR,
  OUTLINE_COLOR,
  DISABLED_OUTLINE_OPACITY,
} = THEME;

const OutlinedButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const outlineColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_OUTLINE_COLOR], DISABLED_OUTLINE_OPACITY)
    : theme.all[OUTLINE_COLOR];

  return (
    <ActionButton
      {...props}
      borderColor={outlineColor}
      borderWidth={OUTLINE_WIDTH}
      backgroundColor={theme.all[CONTAINER_COLOR]}
      foregroundColor={theme.all[LABEL_COLOR]}
    />
  );
};

export default OutlinedButton;
