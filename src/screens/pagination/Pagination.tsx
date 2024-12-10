import GridView from '@components/gridView';
import Loader from '@components/loader';
import NoInternetScreen from '@components/noInternetScreen';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import TextBlock from '@components/textBlock';
import useInfinitePagination from '@config/useInfinitePagination';
import { QUERY_CONSTANTS } from '@constants';
import { fetchAllProducts } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

const Footer = <T,>(theme: ThemeColors) => {
  return (
    <TextBlock
      color={theme.error}
      style={{ textAlign: 'center' }}
    >
      No Internet Connection
    </TextBlock>
  );
};

const Pagination = () => {
  const { GET_ALL_PRODUCTS } = QUERY_CONSTANTS.KEYS;

  const theme = useAppSelector(({ theme }) => theme.colors);

  const productsData: Products = [];

  return (
    <Scaffold style={{ padding: 12, gap: 10, flex: 1 }}>
      {online.showNoConnectionScreenMessage ? (
        <NoInternetScreen />
      ) : (
        <GridView
          data={productsData}
          renderItem={({ item }) => {
            const { images, title } = item;

            return (
              <>
                <FastImage
                  source={{ uri: images[0] }}
                  resizeMode="cover"
                  style={globalStyles.flex1}
                />
                <TextBlock>{title}</TextBlock>
              </>
            );
          }}
          itemStyle={{ backgroundColor: theme.cardColor, borderRadius: 12, padding: 10, gap: 10 }}
          childAspectRatio={1}
          columnSpacing={10}
          rowSpacing={10}
          numOfColumns={2}
          emptyItemsCount={5}
          emptyComponent={
            <Shimmer style={{ flex: 1, backgroundColor: Colors.black, borderRadius: 12 }} />
          }
          Footer={Footer(theme)}
        />
      )}
    </Scaffold>
  );
};

export default Pagination;
