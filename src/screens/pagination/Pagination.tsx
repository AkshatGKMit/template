import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBarSmall from '@components/appBar/AppBarSmall';
import { OutlinedButton, TonalButton } from '@components/button';
import GridView from '@components/gridView';
import MovieCard from '@components/movieCard';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useFavorite from '@config/useFavorite';
import useHeader from '@config/useHeader';
import usePagination from '@config/usePagination';
import { Icons, QUERY_CONSTANTS, ROUTES } from '@constants';
import { fetchPopularMovie } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';

const Footer = (
  currentPage: number,
  fetchPrevious: () => void,
  fetchNext: () => void,
  showPrevious: boolean,
  showNext: boolean,
) => {
  return (
    <View
      style={
        (globalStyles.fullWidth,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
        })
      }
    >
      <OutlinedButton
        label="Back"
        leadingIcon={Icons.ionicons.arrowBack}
        onPress={fetchPrevious}
        disabled={!showPrevious}
      />

      <TextBlock>Page {currentPage}</TextBlock>

      <TonalButton
        label="Next"
        trailingIcon={Icons.ionicons.arrowForward}
        onPress={fetchNext}
        disabled={!showNext}
      />
    </View>
  );
};

const Pagination = () => {
  const { goBack } = useNavigation<StackNavigation>();

  const { PAGINATION: PAGINATION_ROUTE } = ROUTES.STACK;

  useHeader<StackNavigation>(
    <AppBarSmall
      title={PAGINATION_ROUTE}
      leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
    />,
  );

  const { GET_POPULAR_MOVIES } = QUERY_CONSTANTS.KEYS;

  const { colors: theme } = useAppSelector(({ theme }) => theme);
  const { favorite, addOrRemoveFavorite } = useFavorite();

  const [page, setPage] = useState(1);

  const { data, fetchNextPage, fetchPreviousPage, isSuccess, online, canGoBack, canGoForward } =
    usePagination(GET_POPULAR_MOVIES(page), () => fetchPopularMovie(page), page, setPage);

  const onPressFavorite = (movie: Movie, isFavorite: boolean) => {
    let newFavorites: number[] = JSON.parse(JSON.stringify(favorite));

    if (isFavorite) {
      newFavorites = newFavorites.filter((favId) => favId !== movie.id);
    } else {
      newFavorites.push(movie.id);
    }

    addOrRemoveFavorite({ movie, favorite: !isFavorite });
  };

  const productsData: Movies = data?.data.results ?? [];

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      bottomInset
    >
      {online.showNoConnectionScreenMessage ? (
        <NoInternetScreen />
      ) : (
        <GridView
          data={productsData}
          renderItem={({ item: movie }) => {
            const { id } = movie;

            return (
              <MovieCard
                movie={movie}
                isFavorite={favorite.includes(id)}
                setFavorite={(isFavorite) => onPressFavorite(movie, isFavorite)}
              />
            );
          }}
          itemStyle={{
            backgroundColor: theme.cardColor,
            borderRadius: 12,
            padding: 10,
            gap: 10,
          }}
          childAspectRatio={2 / 3}
          columnSpacing={10}
          rowSpacing={10}
          numOfColumns={2}
          emptyItemsCount={5}
          emptyComponent={
            <Shimmer style={{ flex: 1, backgroundColor: Colors.black, borderRadius: 12 }} />
          }
          Footer={
            isSuccess && data
              ? Footer(data.data.page, fetchPreviousPage, fetchNextPage, canGoBack, canGoForward)
              : undefined
          }
        />
      )}
    </Scaffold>
  );
};

export default Pagination;
