import { View, Text } from 'react-native';
import React from 'react';
import { QueryCache } from '@tanstack/react-query';
import { QUERY_CONSTANTS } from '@constants';

const Cache = () => {
  const { GET_ALL_PRODUCTS } = QUERY_CONSTANTS.KEYS;

  const queryCache = new QueryCache({
    onError: (error) => console.error(error),
    onSettled: (error) => console.warn(error),
    onSuccess: (error) => console.log(error),
  });

  console.log(queryCache.findAll());

  return (
    <View>
      <Text>Cache</Text>
    </View>
  );
};

export default Cache;
