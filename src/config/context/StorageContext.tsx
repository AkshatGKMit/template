import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const defaultValue: StorageCtxValues = {
  darkTheme: false,
  changeTheme: () => {},
};

const StorageContext = createContext<StorageCtxValues>(defaultValue);

export const StorageContextProvider = ({ children }: CtxProviderProps) => {
  const { darkTheme: defaultDarkTheme } = defaultValue;

  const colorScheme = useColorScheme();

  const [darkTheme, setDarkTheme] = useState(defaultDarkTheme);

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

  async function loadStore() {
    const darkTheme = (await getStoreValue<boolean>('theme')) ?? colorScheme === 'dark';

    setDarkTheme(darkTheme);
  }

  useEffect(() => {
    loadStore();
  }, []);

  const changeTheme = async (dark: boolean) => {
    setDarkTheme(dark);
    await saveStoreValue('theme', JSON.stringify(dark));
  };

  const ctxValues: StorageCtxValues = { darkTheme, changeTheme };

  return (
    <StorageContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default StorageContext;
