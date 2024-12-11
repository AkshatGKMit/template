import AsyncStorage from '@react-native-async-storage/async-storage';

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

async function saveStoreValue(key: StorageKey, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

namespace StorageManager {
  export const getValue = getStoreValue;
  export const saveValue = saveStoreValue;
}

export default StorageManager;
