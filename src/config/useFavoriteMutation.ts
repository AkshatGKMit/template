import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_CONSTANTS } from '@constants';
import { mutateAddFavorites } from '@network/apiCalls';

const { ADD_FAVORITE: ADD_FAVORITE_KEY, GET_FAVORITES } = QUERY_CONSTANTS.KEYS;

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const onMutationSuccess = () => {
    queryClient.refetchQueries({ queryKey: GET_FAVORITES });
  };

  const mutation = useMutation<AxiosResponse<AddFavoriteResponse>, Error, AddFavoriteParams>({
    mutationKey: ADD_FAVORITE_KEY,
    mutationFn: ({ id, favorite }) => mutateAddFavorites(id, favorite),
    onSuccess: onMutationSuccess,
  });

  return mutation;
};

export default useFavoriteMutation;
