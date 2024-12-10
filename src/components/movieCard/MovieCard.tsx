import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import IconButton from '@components/iconButton';
import TextBlock from '@components/textBlock';
import { Icons, IMAGES } from '@constants';
import { Colors, Typography } from '@themes';
import ApiConstants from '@network/apiConstants';

import styles from './styles';

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
    <View style={styles.movie}>
      <View style={styles.imageView}>
        <FastImage
          style={styles.image}
          defaultSource={IMAGES.FILM_LOADER}
          source={{
            uri: `${imageSecureBaseUrl}${PosterSizes.w342}${poster_path}`,
            priority: FastImage.priority.normal,
          }}
        />

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
            onPress={() => setFavorite(!isFavorite)}
          />
        </View>
      </View>

      {year ? <TextBlock>{year}</TextBlock> : null}

      <TextBlock
        typography={Typography.titleMedium}
        ellipsizeMode="tail"
        numberOfLines={3}
      >
        {title}
      </TextBlock>
    </View>
  );
};

export default MovieCard;
