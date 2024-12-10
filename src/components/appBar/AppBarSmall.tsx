import AppBarMain from './AppBarMain';
import { TrailingContainer } from './TrailingContainer';

const AppBarSmall = (props: SmallAppBarProps) => {
  const { trailing, iconColor } = props;

  return (
    <AppBarMain
      {...props}
      trailing={trailing && TrailingContainer({ iconColor, trailing })}
    />
  );
};

export default AppBarSmall;
