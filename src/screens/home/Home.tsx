import { useNavigation } from '@react-navigation/native';

import AppBar from '@components/appBar';
import { ElevatedButton } from '@components/button';
import Loader from '@components/loader';
import Scaffold from '@components/scaffold';
import TextBlock from '@components/textBlock';
import { Icons, ROUTES } from '@constants';
import { globalStyles } from '@themes/globalStyles';

const ScreenAppBar = () => {
  const { navigate } = useNavigation<StackNavigation>();

  return (
    <AppBar.Extended
      title={'Template'}
      leading={{ icon: Icons.materialIcons.menu, onPress: () => navigate('Cache') }}
      trailing={[
        { icon: Icons.materialIcons.settings, label: 'Filter' },
        { icon: Icons.materialIcons.search, label: 'Filter' },
        { icon: Icons.materialIcons.mood, label: 'Filter' },
        { icon: Icons.materialIcons.favorite, label: 'Filter' },
        { icon: Icons.materialIcons.numbers, label: 'Filter' },
      ]}
    />
  );
};

const Footer = <T,>(data: T | undefined, isConnected: boolean, theme: ThemeColors) => {
  if (data && !isConnected) {
    return (
      <TextBlock
        color={theme.error}
        style={{ textAlign: 'center' }}
      >
        No Internet Connection
      </TextBlock>
    );
  }

  if (data) {
    return <Loader size={'large'} />;
  }
};

const Home = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const {
    PAGINATION: PAGINATION_ROUTE,
    INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE,
    FAVORITES: FAVORITES_ROUTE,
  } = ROUTES.STACK;

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1, ...globalStyles.columnCenter }}
      appBar={<ScreenAppBar />}
    >
      <ElevatedButton
        label={PAGINATION_ROUTE}
        onPress={() => navigate(PAGINATION_ROUTE)}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <ElevatedButton
        label={INFINITE_PAGINATION_ROUTE}
        onPress={() => navigate(INFINITE_PAGINATION_ROUTE)}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <ElevatedButton
        label={FAVORITES_ROUTE}
        onPress={() => navigate(FAVORITES_ROUTE)}
        leadingIcon={Icons.materialIcons.favorite}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
    </Scaffold>
  );
};

export default Home;
