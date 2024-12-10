import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query';

import AppBar from '@components/appBar';
import GridView from '@components/gridView';
import Loader from '@components/loader';
import Scaffold from '@components/scaffold';
import Shimmer from '@components/shimmer';
import Snackbar from '@components/snackBar';
import TextBlock from '@components/textBlock';
import { QUERY_CONSTANTS, IMAGES, Icons } from '@constants';
import { fetchAllProducts } from '@network/apiCalls';
import { useAppSelector } from '@store';
import { FontFamily, Typography, Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';

const ScreenAppBar = () => {
  const { navigate } = useNavigation<StackNavigation>();

  return (
    <AppBar.Extended
      title={'Template'}
      leading={{ icon: Icons.materialIcons.menu, onPress: () => navigate('Cache') }}
      trailing={[
        { icon: Icons.materialIcons.settings, label: 'Filter' },
        { icon: Icons.materialIcons.search, label: 'Filter' },
        { icon: Icons.materialIcons.mood, label: 'Filter' },
        { icon: Icons.materialIcons.favorite, label: 'Filter' },
        { icon: Icons.materialIcons.numbers, label: 'Filter' },
      ]}
    />
  );
};

const Home = () => {
  const { GET_ALL_PRODUCTS } = QUERY_CONSTANTS.KEYS;

  const theme = useAppSelector(({ theme }) => theme.colors);

  const getNextPageParam: GetNextPageParamFunction<number, AxiosResponse<GetAllProducts, any>> = (
    lastPage,
    pages,
  ) => {
    const { limit, skip, total } = lastPage.data;

    return skip / limit + 1;
  };

  const { isError, data, error, fetchStatus, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    {
      queryKey: GET_ALL_PRODUCTS,
      queryFn: fetchAllProducts,
      initialPageParam: 0,
      getNextPageParam,
      staleTime: 100000,
    },
  );

  useEffect(() => {
    if (isError && error) {
      Snackbar.show({ heading: error.name, text: error.message });
    }
  }, [isError]);

  const productsData = data?.pages.flatMap((page) => page.data.products);

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      appBar={<ScreenAppBar />}
    >
      {fetchStatus === 'paused' ? (
        <View style={[globalStyles.flex1, globalStyles.columnCenter, { gap: 20 }]}>
          <FastImage
            defaultSource={IMAGES.NO_INTERNET}
            resizeMode="contain"
            style={{ aspectRatio: 1, width: '60%' }}
          />
          <TextBlock
            family={FontFamily.normal.black}
            typography={Typography.titleLarge}
          >
            No Internet Connection
          </TextBlock>
        </View>
      ) : (
        <GridView
          data={productsData ?? []}
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
          Footer={data && <Loader size={'large'} />}
          onEndReached={() => {
            console.log('End Triggered');
            if (!isFetchingNextPage && data) {
              const { length } = data.pages;

              const { total, skip, limit } = data.pages[length - 1].data;
              if (skip + limit <= total) {
                console.log('Skip: ', skip + limit, '\nTotal: ', total);

                fetchNextPage();
              }
            }
          }}
        />
      )}
    </Scaffold>
  );
};

export default Home;
