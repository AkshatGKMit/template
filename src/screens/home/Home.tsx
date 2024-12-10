import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import AppBar from '@components/appBar';
import GridView from '@components/gridView';
import Loader from '@components/loader';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import { QUERY_CONSTANTS, IMAGES, Icons, ROUTES } from '@constants';
import { fetchAllProducts } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import NoInternetScreen from '@components/noInternetScreen';
import useInfinitePagination from '@config/useInfinitePagination';
import { ElevatedButton } from '@components/button';

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

  const { INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE } = ROUTES.STACK;

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1, ...globalStyles.columnCenter }}
      appBar={<ScreenAppBar />}
    >
      <ElevatedButton
        label={INFINITE_PAGINATION_ROUTE}
        onPress={() => navigate(INFINITE_PAGINATION_ROUTE)}
      />
    </Scaffold>
  );
};

export default Home;
