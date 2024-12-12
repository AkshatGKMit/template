import { ICON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { colorWithOpacity } from '@utility/helpers';

import IconButtonMain from './IconButtonMain';

const { THEME, MEASUREMENTS } = ICON_BUTTON_CONSTANTS.OUTLINED;

const { OUTLINE_WIDTH } = MEASUREMENTS;

const {
  CONTAINER_COLOR,
  ICON_COLOR,
  OUTLINE_COLOR,
  DISABLED_OUTLINE_COLOR,
  DISABLED_OUTLINE_OPACITY,
} = THEME;

const OutlinedIconButton = (props: IconButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const outlineColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_OUTLINE_COLOR], DISABLED_OUTLINE_OPACITY)
    : theme.all[OUTLINE_COLOR];

  return (
    <IconButtonMain
      backgroundColor={theme.all[CONTAINER_COLOR]}
      color={theme.all[ICON_COLOR]}
      borderColor={outlineColor}
      borderWidth={OUTLINE_WIDTH}
      {...props}
    />
  );
};

export default OutlinedIconButton;
