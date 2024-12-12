import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { useAppSelector } from '@store';

import ActionButton from './ActionButton';

const TonalButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { CONTAINER_COLOR, LABEL_COLOR } = COMMON_BUTTON_CONSTANTS.TONAL.COLOR;

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.all[CONTAINER_COLOR]}
      foregroundColor={theme.all[LABEL_COLOR]}
    />
  );
};

export default TonalButton;
