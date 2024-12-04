import { STORAGE_KEY } from '@constants';

declare global {
  type StorageKey = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];
}
