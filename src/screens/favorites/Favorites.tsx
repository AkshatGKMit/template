import GridView from '@components/gridView';
import Loader from '@components/loader';
import MovieCard from '@components/movieCard';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useFavoriteMutation from '@config/useFavoriteMutation';
import useInfinitePagination from '@config/useInfinitePagination';
import { QUERY_CONSTANTS } from '@constants';
import { fetchFavoritesInfinitely, fetchPopularMoviesInfinitely } from '@network/apiCalls';
import { useAppDispatch, useAppSelector } from '@store';
import { saveFavoriteToStorage } from '@store/actions/favoriteActions';
import { InfiniteData } from '@tanstack/react-query';
import { Colors } from '@themes';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

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
  const { GET_FAVORITES } = QUERY_CONSTANTS.KEYS;

  const dispatch = useAppDispatch();
  const { colors: theme } = useAppSelector(({ theme }) => theme);
  const favorite = useAppSelector(({ favorite }) => favorite);

  const { data, fetchNextPage, online } = useInfinitePagination<PaginatedMovies>(
    GET_FAVORITES,
    fetchFavoritesInfinitely,
    { initialPage: 1, staleTime: Infinity },
  );
  const { mutate } = useFavoriteMutation();

  const moviesData = data?.pages.flatMap((page) => page.data.results) ?? [];

  useEffect(() => {
    dispatch(saveFavoriteToStorage(moviesData.map(({ id }) => id)));
  }, [moviesData]);

  const onPressFavorite = (movie: Movie, isFavorite: boolean) => {
    const { id } = movie;

    let newFavorites: number[] = JSON.parse(JSON.stringify(favorite.movies));

    if (isFavorite) {
      newFavorites = newFavorites.filter((favId) => favId !== id);
    } else {
      newFavorites.push(id);
    }

    dispatch(saveFavoriteToStorage(newFavorites));
    mutate({ movie, favorite: !isFavorite });
  };

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
                isFavorite={favorite.movies.includes(id)}
                setFavorite={(isFavorite) => onPressFavorite(movie, isFavorite)}
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
