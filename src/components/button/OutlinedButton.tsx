import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import ActionButton from './ActionButton';
import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';

const OutlinedButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const { COLOR, MEASUREMENTS } = COMMON_BUTTON_CONSTANTS.OUTLINED;

  const { DISABLED_OUTLINE_OPACITY, OUTLINE_WIDTH } = MEASUREMENTS;
  const { CONTAINER_COLOR, DISABLED_OUTLINE_COLOR, LABEL_COLOR, OUTLINE_COLOR } = COLOR;

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
