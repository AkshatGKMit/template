import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';

import ActionButton from './ActionButton';

const { CONTAINER_COLOR, LABEL_COLOR } = COMMON_BUTTON_CONSTANTS.FILLED.THEME;

const FilledButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.all[CONTAINER_COLOR]}
      foregroundColor={theme.all[LABEL_COLOR]}
    />
  );
};

export default FilledButton;
