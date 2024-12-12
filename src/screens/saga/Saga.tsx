import { useNavigation } from '@react-navigation/native';

import Scaffold from '@components/scaffold';
import useHeader from '@config/useHeader';
import { ROUTES, Icons } from '@constants';
import AppBar from '@components/appBar';

const Saga = () => {
  const { goBack } = useNavigation<StackNavigation>();

  const { PAGINATION: PAGINATION_ROUTE } = ROUTES.STACK;

  useHeader<StackNavigation>(
    <AppBar.Small
      title={PAGINATION_ROUTE}
      leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
    />,
  );

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      bottomInset
    ></Scaffold>
  );
};

export default Saga;
