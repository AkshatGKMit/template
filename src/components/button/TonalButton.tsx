import { useAppSelector } from '@store';

import ActionButton from './ActionButton';

const TonalButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.all.secondaryContainer}
      foregroundColor={theme.all.onSecondaryContainer}
    />
  );
};

export default TonalButton;
