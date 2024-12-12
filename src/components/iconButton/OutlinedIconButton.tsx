import { ICON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { useAppSelector } from '@store';
import { colorWithOpacity } from '@utility/helpers';

import IconButtonMain from './IconButtonMain';

const { COLOR, MEASUREMENTS } = ICON_BUTTON_CONSTANTS.OUTLINED;

const {
  CONTAINER: CONTAINER_COLOR,
  ICON: ICON_COLOR,
  OUTLINE: OUTLINE_COLOR,
  DISABLED_OUTLINE: DISABLED_OUTLINE_COLOR,
} = COLOR;
const { OUTLINE_WIDTH, DISABLED_OUTLINE_OPACITY } = MEASUREMENTS;

const OutlinedIconButton = (props: IconButtonProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

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
