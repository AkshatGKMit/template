import { StorageKey } from '@constants';

declare global {
  type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];
}
