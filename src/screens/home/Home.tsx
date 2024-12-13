import { useNavigation } from '@react-navigation/native';

import AppBar from '@components/appBar';
import {
  ElevatedButton,
  FilledButton,
  OutlinedButton,
  TextButton,
  TonalButton,
} from '@components/button';
import Scaffold from '@components/scaffold';
import useHeader from '@config/useHeader';
import { Icons, ROUTES } from '@constants';
import { globalStyles } from '@themes/globalStyles';

const ScreenAppBar = () => (
  <AppBar.Extended
    title={'Template'}
    leading={{ icon: Icons.materialIcons.menu }}
    trailing={[
      { icon: Icons.materialIcons.settings, label: 'Filter' },
      { icon: Icons.materialIcons.search, label: 'Filter' },
      { icon: Icons.materialIcons.mood, label: 'Filter' },
      { icon: Icons.materialIcons.favorite, label: 'Filter' },
      { icon: Icons.materialIcons.numbers, label: 'Filter' },
    ]}
  />
);

const Home = () => {
  const { navigate } = useNavigation<PracticeStackNavigation>();

  useHeader<PracticeStackNavigation>(<ScreenAppBar />);

  const {
    PAGINATION: PAGINATION_ROUTE,
    INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE,
    FAVORITES: FAVORITES_ROUTE,
    SAGA: SAGA_ROUTE,
    ANIMATED_FLAT_LIST: ANIMATED_FLAT_LIST_ROUTE,
  } = ROUTES.PRACTICE_STACK;

  return (
    <Scaffold style={{ padding: 12, gap: 10, flex: 1, ...globalStyles.columnCenter }}>
      <ElevatedButton
        label={PAGINATION_ROUTE}
        onPress={() => navigate(PAGINATION_ROUTE)}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <FilledButton
        label={INFINITE_PAGINATION_ROUTE}
        onPress={() => navigate(INFINITE_PAGINATION_ROUTE)}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <TonalButton
        label={FAVORITES_ROUTE}
        onPress={() => navigate(FAVORITES_ROUTE)}
        leadingIcon={Icons.materialIcons.favorite}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <OutlinedButton
        label={SAGA_ROUTE}
        onPress={() => navigate(SAGA_ROUTE)}
        leadingIcon={Icons.fontisto.shoppingStore}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
      <TextButton
        label={'Nothing'}
        onPress={() => {}}
        trailingIcon={Icons.materialIcons.lock}
      />
      <ElevatedButton
        label={ANIMATED_FLAT_LIST_ROUTE}
        onPress={() => navigate(ANIMATED_FLAT_LIST_ROUTE)}
        leadingIcon={Icons.materialIcons.formatListBulleted}
        trailingIcon={Icons.materialIcons.keyboardArrowRight}
      />
    </Scaffold>
  );
};

export default Home;
