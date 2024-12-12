import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IconButton } from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { Icons, IMAGES } from '@constants';
import { Colors, Typography } from '@themes';
import ApiConstants from '@network/apiConstants';

import styles from './styles';
import ImageOverlay from '@components/imageOverlay';

const MovieCard = ({
  movie,
  isFavorite,
  setFavorite,
}: {
  movie: Movie;
  isFavorite: boolean;
  setFavorite: (favorite: boolean) => void;
}) => {
  const { title, poster_path, adult, release_date } = movie;

  const year = release_date.split('-')[0];
  const {
    imageSecureBaseUrl,
    imageSizes: { poster: PosterSizes },
  } = ApiConstants;

  return (
    <>
      <ImageOverlay
        style={styles.image}
        resizeMode="cover"
        defaultSource={IMAGES.FILM_LOADER}
        source={{
          uri: `${imageSecureBaseUrl}${PosterSizes.w342}${poster_path}`,
          priority: FastImage.priority.normal,
        }}
      >
        {adult ? (
          <View style={styles.adult}>
            <Text style={styles.adultText}>Adult</Text>
          </View>
        ) : null}

        <View style={styles.favorite}>
          <IconButton
            icon={isFavorite ? Icons.materialIcons.favorite : Icons.materialIcons.favoriteOutline}
            color={isFavorite ? Colors.red : Colors.white}
            size={20}
            onPress={() => setFavorite(isFavorite)}
          />
        </View>
      </ImageOverlay>

      {year ? <TextBlock>{year}</TextBlock> : null}

      <TextBlock
        typography={Typography.titleMedium}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {title}
      </TextBlock>
    </>
  );
};

export default MovieCard;
