import AppBarMain from './AppBarMain';
import { TrailingContainer } from './TrailingContainer';

const AppBarSmall = (props: SmallAppBarProps) => {
  const { trailing, iconColor } = props;

  return (
    <AppBarMain
      {...props}
      trailing={TrailingContainer({ trailing, iconColor })}
    />
  );
};

export default AppBarSmall;
