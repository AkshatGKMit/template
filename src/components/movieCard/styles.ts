import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  movie: {
    flex: 1,
    gap: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageView: {
    borderWidth: 1,
    borderRadius: 4,
  },
  image: {
    flex: 1,
    borderRadius: 3,
  },
  adult: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  adultText: { fontWeight: '700' },
  favorite: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 2,
    borderRadius: 20,
  },
});

export default styles;
