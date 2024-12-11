import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_CONSTANTS, STORAGE_KEY } from '@constants';
import { StorageManager } from '@utility/helpers';

const useFavorite = () => {
  const { GET_FAVORITES_FROM_STORAGE } = QUERY_CONSTANTS.KEYS;

  const { data, refetch } = useQuery({
    queryKey: GET_FAVORITES_FROM_STORAGE,
    queryFn: async () =>
      (await StorageManager.getStoreValue<number[]>(STORAGE_KEY.FAVORITE_MOVIES_ID)) ?? [],
    initialData: [],
  });

  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      await StorageManager.saveStoreValue(STORAGE_KEY.FAVORITE_MOVIES_ID, ids);
    },
    onSuccess: () => refetch(),
  });

  const saveNewValues = async (ids: number[]) => {
    mutation.mutate(ids);
  };

  return { favorite: data, refetchFavorites: refetch, saveNewValues };
};

export default useFavorite;
