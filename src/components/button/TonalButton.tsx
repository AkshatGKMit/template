import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';

import ActionButton from './ActionButton';

const { CONTAINER_COLOR, LABEL_COLOR, ICON_COLOR } = COMMON_BUTTON_CONSTANTS.TONAL.THEME;

const TonalButton = (props: ActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActionButton
      backgroundColor={theme.all[CONTAINER_COLOR]}
      labelColor={theme.all[LABEL_COLOR]}
      iconColor={theme.all[ICON_COLOR]}
      {...props}
    />
  );
};

export default TonalButton;
