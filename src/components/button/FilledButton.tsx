import { useAppSelector } from '@store';

import ActionButton from './ActionButton';
import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';

const FilledButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { CONTAINER_COLOR, LABEL_COLOR } = COMMON_BUTTON_CONSTANTS.FILLED.COLOR;

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.all[CONTAINER_COLOR]}
      foregroundColor={theme.all[LABEL_COLOR]}
    />
  );
};

export default FilledButton;
