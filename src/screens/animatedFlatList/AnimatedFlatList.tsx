import { useNavigation } from '@react-navigation/native';

import AppBarSmall from '@components/appBar/AppBarSmall';
import GridView from '@components/gridView';
import Loader from '@components/loader';
import MovieCard from '@components/movieCard';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useFavorite from '@config/useFavorite';
import useHeader from '@config/useHeader';
import useInfinitePagination from '@config/useInfinitePagination';
import { Icons, QUERY_CONSTANTS, ROUTES } from '@constants';
import { fetchPopularMoviesInfinitely } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { View } from 'react-native';

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

const AnimatedFlatList = () => {
  const { goBack } = useNavigation<PracticeStackNavigation>();

  const { ANIMATED_FLAT_LIST: ANIMATED_FLAT_LIST_ROUTE } = ROUTES.PRACTICE_STACK;
  const { GET_INFINITE_POPULAR_MOVIES } = QUERY_CONSTANTS.KEYS;

  useHeader<PracticeStackNavigation>(
    <AppBarSmall
      title={ANIMATED_FLAT_LIST_ROUTE}
      leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
    />,
  );

  const { colors: theme } = useAppSelector(({ theme }) => theme);
  const { favorite, addOrRemoveFavorite } = useFavorite();

  const { data, fetchNextPage, online } = useInfinitePagination<PaginatedMovies>(
    GET_INFINITE_POPULAR_MOVIES,
    fetchPopularMoviesInfinitely,
    { initialPage: 1 },
  );

  const moviesData = data?.pages.flatMap((page) => page.data.results) ?? [];

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      bottomInset
    >
      {online.showNoConnectionScreenMessage ? <NoInternetScreen /> : <View></View>}
    </Scaffold>
  );
};

export default AnimatedFlatList;
