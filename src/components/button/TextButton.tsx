import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { colorWithOpacity } from '@utility/helpers';

import ActionButton from './ActionButton';

const {
  CONTAINER_COLOR,
  LABEL_COLOR,
  ICON_COLOR,
  DISABLED_LABEL_COLOR,
  DISABLED_ICON_COLOR,
  DISABLED_LABEL_OPACITY,
  DISABLED_ICON_OPACITY,
} = COMMON_BUTTON_CONSTANTS.TEXT.THEME;

const TextButton = (props: ActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const labelColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_LABEL_COLOR], DISABLED_LABEL_OPACITY)
    : theme.all[LABEL_COLOR];

  const iconColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_ICON_COLOR], DISABLED_ICON_OPACITY)
    : theme.all[ICON_COLOR];

  return (
    <ActionButton
      backgroundColor={theme.all[CONTAINER_COLOR]}
      labelColor={labelColor}
      iconColor={iconColor}
      styleDisabledBackground={false}
      {...props}
    />
  );
};

export default TextButton;
