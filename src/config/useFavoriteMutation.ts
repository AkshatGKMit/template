import { AxiosResponse } from 'axios';

import { QUERY_CONSTANTS } from '@constants';
import { mutateAddFavorites } from '@network/apiCalls';
import { useMutation } from '@tanstack/react-query';

const { ADD_FAVORITE: ADD_FAVORITE_KEY } = QUERY_CONSTANTS.KEYS;

const useFavoriteMutation = () => {
  const mutation = useMutation<AxiosResponse<AddFavoriteResponse>, Error, AddFavoriteParams>({
    mutationKey: ADD_FAVORITE_KEY,
    mutationFn: ({ id, favorite }) => mutateAddFavorites(id, favorite),
  });

  return mutation;
};

export default useFavoriteMutation;
