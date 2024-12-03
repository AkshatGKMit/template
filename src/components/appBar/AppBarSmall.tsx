import AppBarMain from './AppBarMain';
import { TrailingContainer } from './TrailingContainer';
import ThemedStyles from './styles';

const AppBarSmall = (props: SmallAppBarProps) => {
  const styles = ThemedStyles();

  const { trailing, iconColor } = props;

  return (
    <AppBarMain
      {...props}
      trailing={TrailingContainer(trailing, iconColor)}
    />
  );
};

export default AppBarSmall;
