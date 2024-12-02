import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 4,
  },
  fabIcon: { fontSize: 40 },
});

export default styles;
