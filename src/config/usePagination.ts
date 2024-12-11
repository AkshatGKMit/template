import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { QueryFunction, QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';

import Snackbar from '@components/snackBar';

import useOnlineStatus from './useOnlineStatus';

const usePagination = <T extends PaginatedResponse>(
  key: any,
  queryFn: QueryFunction<AxiosResponse<T>, QueryKey, unknown>,
  page: number,
  setPage: (page: number) => void,
  config?: UsePaginationConfigProps<T>,
) => {
  const {
    enabled = true,
    showErrorSnackbar = true,
    onSuccess = () => {},
    onError = () => {},
  } = config ?? {};

  const queryClient = useQueryClient();

  const [isQueryEnabled, setQueryEnabled] = useState(false);

  const { data, isSuccess, isError, error } = useQuery<AxiosResponse<T> | undefined>({
    queryKey: key,
    queryFn,
    enabled: isQueryEnabled,
    networkMode: 'offlineFirst',
    ...config,
  });

  const online = useOnlineStatus(data);

  useEffect(() => {
    if (isError && error) {
      onError(error);

      if (showErrorSnackbar) {
        Snackbar.show({ heading: error.name, text: error.message });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      onSuccess(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    setQueryEnabled(online.isConnected && enabled);
  }, [enabled, online]);

  const fetchPreviousPage = () => {
    if (data) {
      const { page, total_pages: total } = data.data;

      if (page > 0) {
        setPage(page - 1);
      }
    }
  };

  const fetchNextPage = () => {
    const currentKey = key[0];

    const currentActiveKeys = queryClient
      .getQueryCache()
      .getAll()
      .filter(({ queryKey }) => queryKey[0] === currentKey);

    const lastKeyIndex = currentActiveKeys.length - 1;

    const cachedPages = currentActiveKeys[lastKeyIndex].queryKey[1] as number;

    if (online.isConnected || page < cachedPages) {
      if (data) {
        const { page, total_pages: total } = data.data;

        if (page < total) {
          setPage(page + 1);
        }
      }
    } else {
      Snackbar.show({
        heading: 'No Internet Connection',
        text: 'Please check your network settings and try again.',
      });
    }
  };

  const canGoBack = page > 1;
  const canGoForward = data ? data.data.page < data.data.total_pages : false;

  return { data, fetchNextPage, fetchPreviousPage, isSuccess, online, canGoBack, canGoForward };
};

export default usePagination;
