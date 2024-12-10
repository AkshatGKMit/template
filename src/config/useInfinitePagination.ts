import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {
  GetNextPageParamFunction,
  InfiniteData,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import Snackbar from '@components/snackBar';

import useOnlineStatus from './useOnlineStatus';

const useInfinitePagination = <T extends PaginatedResponse>(
  key: any,
  queryFn: QueryFunction<AxiosResponse<T>, QueryKey, number>,
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
    const { page } = lastPage.data;

    return page + 1;
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

      const { total_pages: total, page } = data.pages[length - 1].data;
      if (page < total) {
        fetchNextQueryPage();
      }
    }
  };

  return { data, fetchNextPage, online };
};

export default useInfinitePagination;
