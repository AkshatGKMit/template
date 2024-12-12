import { ICON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { useAppSelector } from '@store';

import IconButtonMain from './IconButtonMain';

const { CONTAINER: CONTAINER_COLOR, ICON: ICON_COLOR } = ICON_BUTTON_CONSTANTS.STANDARD;

const IconButton = (props: IconButtonProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  return (
    <IconButtonMain
      backgroundColor={theme.all[CONTAINER_COLOR]}
      color={theme.all[ICON_COLOR]}
      {...props}
    />
  );
};

export default IconButton;
