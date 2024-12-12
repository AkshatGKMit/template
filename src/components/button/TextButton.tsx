import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { colorWithOpacity } from '@utility/helpers';

import ActionButton from './ActionButton';

const { CONTAINER_COLOR, LABEL_COLOR, DISABLED_LABEL_COLOR, DISABLED_LABEL_OPACITY } =
  COMMON_BUTTON_CONSTANTS.TEXT.THEME;

const TextButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const labelColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_LABEL_COLOR], DISABLED_LABEL_OPACITY)
    : theme.all[LABEL_COLOR];

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.all[CONTAINER_COLOR]}
      foregroundColor={labelColor}
      styleDisabledBackground={false}
    />
  );
};

export default TextButton;
