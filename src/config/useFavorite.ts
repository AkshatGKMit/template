import { AxiosResponse } from 'axios';
import { InfiniteData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_CONSTANTS, STORAGE_KEY } from '@constants';
import { mutateAddFavorites } from '@network/apiCalls';
import StorageManager from '@utility/storage';

const useFavorite = () => {
  const queryClient = useQueryClient();
  const { GET_FAVORITES, ADD_FAVORITE, GET_FAVORITES_FROM_STORAGE } = QUERY_CONSTANTS.KEYS;

  const { data: favoriteIds, refetch: refetchFavorites } = useQuery({
    queryKey: GET_FAVORITES_FROM_STORAGE,
    queryFn: async () =>
      (await StorageManager.getValue<number[]>(STORAGE_KEY.FAVORITE_MOVIES_ID)) ?? [],
    initialData: [],
  });

  const saveNewValues = async (ids: number[]) => {
    await StorageManager.saveValue(STORAGE_KEY.FAVORITE_MOVIES_ID, ids).then(() =>
      refetchFavorites(),
    );
  };

  const mutateFavorite = ({ movie, favorite }: AddFavoriteParams) => {
    const { id } = movie;

    let newFavorites: number[] = [...favoriteIds];

    if (favorite) {
      newFavorites = newFavorites.filter((favId) => favId !== id);
    } else {
      newFavorites.push(id);
    }

    return mutateAddFavorites(movie.id, favorite);
  };

  const onMutating = async ({ favorite, movie: { id } }: AddFavoriteParams) => {
    const newFavoriteIds = favorite
      ? [...favoriteIds, id]
      : favoriteIds.filter((favId) => id !== favId);

    await StorageManager.saveValue(STORAGE_KEY.FAVORITE_MOVIES_ID, newFavoriteIds);
    refetchFavorites();

    return { newFavoriteIds };
  };

  const onMutationSuccess = async (_: AxiosResponse, { movie, favorite }: AddFavoriteParams) => {
    const favoritesData =
      queryClient.getQueryData<InfiniteData<AxiosResponse<PaginatedMovies>>>(GET_FAVORITES);

    if (favoritesData === undefined) return;

    const { id } = movie;
    favoritesData.pages = favoritesData.pages.map((page) => ({
      ...page,
      data: {
        ...page.data,
        results: favorite
          ? [movie, ...page.data.results]
          : page.data.results.filter(({ id: favId }) => favId !== id),
      },
    }));

    queryClient.setQueryData<InfiniteData<AxiosResponse<PaginatedMovies>>>(
      GET_FAVORITES,
      favoritesData,
    );
  };

  const mutation = useMutation<AxiosResponse<AddFavoriteResponse>, Error, AddFavoriteParams>({
    mutationKey: ADD_FAVORITE,
    mutationFn: mutateFavorite,
    onMutate: onMutating,
    onSuccess: onMutationSuccess,
  });

  return {
    favorite: favoriteIds,
    refetchFavorites,
    saveNewValues,
    isLoading: mutation.isPending,
    addOrRemoveFavorite: mutation.mutate,
  };
};

export default useFavorite;
