import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBar from '@components/appBar';
import { TonalIconButton } from '@components/iconButton';
import Scaffold from '@components/scaffold';
import TextBlock from '@components/textBlock';
import useHeader from '@config/useHeader';
import { ROUTES, Icons, Typography } from '@constants';
import { globalStyles } from '@themes/globalStyles';
import { TonalButton } from '@components/button';
import GridView from '@components/gridView';
import { useAppDispatch, useAppSelector } from '@store';
import { getPopularMovies } from '@store/actions/movies';
import MovieCard from '@components/movieCard';
import useFavorite from '@config/useFavorite';

const Saga = () => {
  const { goBack } = useNavigation<StackNavigation>();
  const dispatch = useAppDispatch();

  const { movies } = useAppSelector(({ movie }) => movie);
  const { favorite, addOrRemoveFavorite } = useFavorite();

  const { SAGA: SAGA_ROUTE } = ROUTES.STACK;

  useHeader<StackNavigation>(
    <AppBar.Small
      title={SAGA_ROUTE}
      leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
    />,
  );

  return (
    <Scaffold
      style={{ paddingTop: 12, gap: 10, flex: 1 }}
      bottomInset
    >
      <GridView
        data={movies}
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
        childAspectRatio={2 / 3}
        columnSpacing={10}
        numOfColumns={2}
        rowSpacing={10}
      />
      <View style={{ padding: 5 }}>
        <TonalButton
          label="Get Products"
          leadingIcon={Icons.materialIcons.shoppingCart}
          onPress={() => dispatch(getPopularMovies())}
        />
      </View>
    </Scaffold>
  );
};

export default Saga;
