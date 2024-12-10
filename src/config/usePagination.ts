import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

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

  const [cachedPages, setCachedPages] = useState(1);

  const [isQueryEnabled, setQueryEnabled] = useState(false);

  const { data, isSuccess, isError, error } = useQuery<AxiosResponse<T> | undefined>({
    queryKey: key,
    queryFn,
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

  const fetchPreviousPage = () => {
    if (data) {
      const { page, total_pages: total } = data.data;

      if (page > 0) {
        setPage(page - 1);
      }
    }
  };

  const fetchNextPage = () => {
    if (online.isConnected || page < cachedPages) {
      if (data) {
        const { page, total_pages: total } = data.data;

        if (page < total) {
          setPage(page + 1);

          if (page === cachedPages) {
            setCachedPages((prevPage) => prevPage + 1);
          }
        }
      }
    } else {
      Snackbar.show({
        heading: 'No Internet Connection',
        text: 'Please check your network settings and try again.',
      });
    }
  };

  const canGoBack = page > 0;
  const canGoForward = data ? data.data.page < data.data.total_pages : false;

  return { data, fetchNextPage, fetchPreviousPage, isSuccess, online, canGoBack, canGoForward };
};

export default usePagination;
