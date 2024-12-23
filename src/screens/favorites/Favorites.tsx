import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { InfiniteData } from '@tanstack/react-query';

import AppBarSmall from '@components/appBar/AppBarSmall';
import GridView from '@components/gridView';
import Loader from '@components/loader';
import MovieCard from '@components/movieCard';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useHeader from '@config/useHeader';
import useInfinitePagination from '@config/useInfinitePagination';
import { Icons, QUERY_CONSTANTS, ROUTES } from '@constants';
import { fetchFavoritesInfinitely } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import useFavorite from '@config/useFavorite';

const Footer = <T,>(
  data: InfiniteData<AxiosResponse<PaginatedMovies>> | undefined,
  isConnected: boolean,
  theme: ThemeColors,
) => {
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
    const lastPageIndex = (data.pages.length ?? 1) - 1;
    const currentPageData = data?.pages[lastPageIndex].data;

    const { page, total_pages } = currentPageData;

    if (page !== total_pages) {
      return <Loader size={'large'} />;
    }
  }
};

const Favorites = () => {
  const { goBack } = useNavigation<PracticeStackNavigation>();

  const { FAVORITES: FAVORITES_ROUTE } = ROUTES.PRACTICE_STACK;
  const { GET_FAVORITES } = QUERY_CONSTANTS.KEYS;

  useHeader<PracticeStackNavigation>(
    <AppBarSmall
      title={FAVORITES_ROUTE}
      leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
    />,
  );

  const { colors: theme } = useAppSelector(({ theme }) => theme);
  const { favorite, addOrRemoveFavorite, saveNewValues } = useFavorite();

  const { data, fetchNextPage, online } = useInfinitePagination<PaginatedMovies>(
    GET_FAVORITES,
    fetchFavoritesInfinitely,
    { initialPage: 1, staleTime: Infinity },
  );

  const moviesData = data?.pages.flatMap((page) => page.data.results) ?? [];

  useEffect(() => {
    const newIds = new Set(moviesData.map(({ id }) => id));
    saveNewValues([...newIds]);
  }, [moviesData]);

  return (
    <Scaffold style={{ padding: 12, gap: 10, flex: 1 }}>
      {online.showNoConnectionScreenMessage ? (
        <NoInternetScreen />
      ) : (
        <GridView
          data={moviesData}
          renderItem={({ item: movie }) => {
            const { id } = movie;

            return (
              <MovieCard
                movie={movie}
                isFavorite={favorite.includes(id)}
                setFavorite={(isCurrentFavorite) =>
                  addOrRemoveFavorite({ movie, favorite: !isCurrentFavorite })
                }
              />
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

export default Favorites;
