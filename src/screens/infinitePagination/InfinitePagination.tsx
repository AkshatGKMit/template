import GridView from '@components/gridView';
import Loader from '@components/loader';
import MovieCard from '@components/movieCard';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useInfinitePagination from '@config/useInfinitePagination';
import { QUERY_CONSTANTS } from '@constants';
import { fetchPopularMoviesInfinitely } from '@network/apiCalls';
import { useAppDispatch, useAppSelector } from '@store';
import { saveFavoriteToStorage } from '@store/actions/favoriteActions';
import { Colors } from '@themes';

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

  const dispatch = useAppDispatch();
  const { colors: theme } = useAppSelector(({ theme }) => theme);
  const favorite = useAppSelector(({ favorite }) => favorite);

  const { data, fetchNextPage, online } = useInfinitePagination<PaginatedMovies>(
    GET_ALL_INFINITE_PRODUCTS,
    fetchPopularMoviesInfinitely,
    { initialPage: 1 },
  );

  const onPressFavorite = (id: number, isFavorite: boolean) => {
    let newFavorites: number[] = JSON.parse(JSON.stringify(favorite.movies));

    if (isFavorite) {
      newFavorites = newFavorites.filter((favId) => favId !== id);
    } else {
      newFavorites.push(id);
    }

    dispatch(saveFavoriteToStorage(newFavorites));
    mutate({ id, favorite: !isFavorite });
  };

  const moviesData = data?.pages.flatMap((page) => page.data.results) ?? [];

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
                setFavorite={(isFavorite) => onPressFavorite(id, isFavorite)}
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

export default InfinitePagination;
function mutate(arg0: { id: number; favorite: boolean }) {
  throw new Error('Function not implemented.');
}
