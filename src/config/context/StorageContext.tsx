import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultValue: StorageCtxValues = {};

const StorageContext = createContext<StorageCtxValues>(defaultValue);

export const StorageContextProvider = ({ children }: CtxProviderProps) => {
  const [] = useState();

  async function getStoreValue<T>(key: StorageKey): Promise<T | undefined> {
    try {
      const item = await AsyncStorage.getItem(key);

      if (!item) {
        return undefined;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Async Storage: Error retrieving item for key "${key}":`, error);
      return undefined;
    }
  }

  async function saveStoreValue(key: StorageKey, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  const ctxValues: StorageCtxValues = {};

  return (
    <StorageContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default StorageContext;
