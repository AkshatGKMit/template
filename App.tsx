import { useEffect, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  FlatList,
  LogBox,
  Platform,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {
  focusManager,
  GetNextPageParamFunction,
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import BottomSheet from '@components/bottomSheet';
import Snackbar from '@components/snackBar';
import { Colors, FontFamily, ThemeMode, Typography } from '@themes';
import Scaffold from '@components/scaffold/Scaffold';
import store, { useAppDispatch, useAppSelector } from '@store';
import { switchTheme } from '@store/reducers/theme';
import AppBar from '@components/appBar';
import { Icons, IMAGES, QUERY_CONSTANTS } from '@constants';
import { fetchAllProducts } from '@network/apiCalls';
import Loader from '@components/loader';
import { globalStyles } from '@themes/globalStyles';
import TextBlock from '@components/textBlock';
import GridView from '@components/gridView/GridView';
import FastImage from 'react-native-fast-image';
import Shimmer from '@components/shimmer';
import { AxiosResponse } from 'axios';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
        />
        <SafeAreaProvider>
          <Main />
          <BottomSheet />
          <Snackbar />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const ScreenAppBar = () => {
  return (
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
};

const Main = () => {
  const { GET_ALL_PRODUCTS } = QUERY_CONSTANTS.KEYS;

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const getNextPageParam: GetNextPageParamFunction<number, AxiosResponse<GetAllProducts, any>> = (
    lastPage,
    pages,
  ) => {
    const { limit, skip, total } = lastPage.data;

    return skip / limit + 1;
  };

  const {
    isPending,
    isError,
    data,
    error,
    fetchStatus,
    status,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: GET_ALL_PRODUCTS,
    queryFn: fetchAllProducts,
    initialPageParam: 0,
    getNextPageParam,
    staleTime: 100000,
  });

  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', onAppStateChange);

    return () => appStateSubscription.remove();
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

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
      <TextBlock>{productsData?.length}</TextBlock>
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
          endThreshold={1}
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

export default App;
