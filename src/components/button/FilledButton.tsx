import { useAppSelector } from '@store';

import ActionButton from './ActionButton';

const FilledButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActionButton
      {...props}
      backgroundColor={theme.primary}
      foregroundColor={theme.all.onPrimary}
    />
  );
};

export default FilledButton;
