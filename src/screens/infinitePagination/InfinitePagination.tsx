import FastImage from 'react-native-fast-image';

import GridView from '@components/gridView';
import Loader from '@components/loader';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useInfinitePagination from '@config/useInfinitePagination';
import { QUERY_CONSTANTS } from '@constants';
import { fetchPopularMoviesInfinitely } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';

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

const InfinitePagination = () => {
  const { GET_INFINITE_POPULAR_MOVIES: GET_ALL_INFINITE_PRODUCTS } = QUERY_CONSTANTS.KEYS;

  const theme = useAppSelector(({ theme }) => theme.colors);

  const { data, fetchNextPage, online } = useInfinitePagination<PaginatedMovies>(
    GET_ALL_INFINITE_PRODUCTS,
    fetchPopularMoviesInfinitely,
    { initialPage: 1 },
  );

  const moviesData = data?.pages.flatMap((page) => page.data.results) ?? [];

  return (
    <Scaffold style={{ padding: 12, gap: 10, flex: 1 }}>
      {online.showNoConnectionScreenMessage ? (
        <NoInternetScreen />
      ) : (
        <GridView
          data={moviesData}
          renderItem={({ item }) => {
            const { title, poster_path } = item;

            const image = 'https://image.tmdb.org/t/p/w500/' + poster_path;

            return (
              <>
                <FastImage
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={globalStyles.flex1}
                />
                <TextBlock>{title}</TextBlock>
              </>
            );
          }}
          itemStyle={{ backgroundColor: theme.cardColor, borderRadius: 12, padding: 10, gap: 10 }}
          childAspectRatio={2 / 3}
          columnSpacing={10}
          rowSpacing={10}
          numOfColumns={2}
          emptyItemsCount={5}
          emptyComponent={
            <Shimmer style={{ flex: 1, backgroundColor: Colors.black, borderRadius: 12 }} />
          }
          Footer={Footer(data, online.isConnected, theme)}
          endThreshold={1.5}
          onEndReached={fetchNextPage}
        />
      )}
    </Scaffold>
  );
};

export default InfinitePagination;
