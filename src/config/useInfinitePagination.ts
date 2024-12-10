import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  GetNextPageParamFunction,
  InfiniteData,
  onlineManager,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import Snackbar from '@components/snackBar';
import useOnlineStatus from './useInternetConnectionInfo';

const useInfinitePagination = <T extends PaginatedResponse>(
  key: any,
  queryFn: QueryFunction<AxiosResponse<T>, QueryKey, unknown>,
  config?: UseInfinitePaginationConfigProps<T>,
) => {
  const {
    enabled = true,
    initialPage = 0,
    showErrorSnackbar = true,
    onSuccess = () => {},
    onError = () => {},
  } = config ?? {};

  const [isQueryEnabled, setQueryEnabled] = useState(false);

  const getNextPageParam: GetNextPageParamFunction<number, AxiosResponse<T>> = (lastPage) => {
    const { limit, skip } = lastPage.data;

    return skip / limit + 1;
  };

  const {
    data,
    isSuccess,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage: fetchNextQueryPage,
  } = useInfiniteQuery<AxiosResponse<T>, Error, InfiniteData<AxiosResponse<T>>, QueryKey, number>({
    queryKey: key,
    queryFn,
    initialPageParam: initialPage,
    getNextPageParam,
    enabled: isQueryEnabled,
    ...config,
  });

  const online = useOnlineStatus(data);

  useEffect(() => {
    if (isError) {
      onError(error);

      if (showErrorSnackbar && error) {
        Snackbar.show({ heading: error.name, text: error.message });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      onSuccess(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    setQueryEnabled(online.isConnected && enabled);
  }, [enabled, online]);

  const fetchNextPage = () => {
    if (online.isConnected && !isFetchingNextPage && data) {
      const { length } = data.pages;

      const { total, skip, limit } = data.pages[length - 1].data;
      if (skip + limit <= total) {
        fetchNextQueryPage();
      }
    }
  };

  return { data, fetchNextPage, online };
};

export default useInfinitePagination;
