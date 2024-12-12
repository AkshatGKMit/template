import { useAppSelector } from '@store';

import ActionButton from './ActionButton';
import { Colors } from '@themes';
import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { colorWithOpacity } from '@utility/helpers';

const TextButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const { CONTAINER_COLOR, LABEL_COLOR, DISABLED_LABEL_COLOR, DISABLED_LABEL_OPACITY } =
    COMMON_BUTTON_CONSTANTS.TEXT.COLOR;

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
