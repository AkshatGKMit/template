import { AxiosResponse } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_CONSTANTS } from '@constants';
import { mutateAddFavorites } from '@network/apiCalls';

const { ADD_FAVORITE: ADD_FAVORITE_KEY, GET_FAVORITES } = QUERY_CONSTANTS.KEYS;

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const onMutationSuccess = async (_: AxiosResponse, { movie, favorite }: AddFavoriteParams) => {
    const favoritesData =
      queryClient.getQueryData<InfiniteData<AxiosResponse<PaginatedMovies>>>(GET_FAVORITES);

    if (favoritesData === undefined) return;

    const { id } = movie;
    favoritesData.pages = favoritesData.pages.map((page) => {
      return {
        ...page,
        data: {
          ...page.data,
          results: favorite
            ? [movie, ...page.data.results]
            : page.data.results.filter(({ id: favId }) => favId !== id),
        },
      };
    });

    queryClient.setQueryData<InfiniteData<AxiosResponse<PaginatedMovies>>>(
      GET_FAVORITES,
      favoritesData,
    );
  };

  const mutation = useMutation<AxiosResponse<AddFavoriteResponse>, Error, AddFavoriteParams>({
    mutationKey: ADD_FAVORITE_KEY,
    mutationFn: ({ movie, favorite }) => mutateAddFavorites(movie.id, favorite),
    onSuccess: onMutationSuccess,
  });

  return mutation;
};

export default useFavoriteMutation;
