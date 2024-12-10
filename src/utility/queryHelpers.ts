import { isIos } from '@constants';
import { FetchStatus, onlineManager, QueryStatus } from '@tanstack/react-query';

export function isConnectedToInternet<T>(data: undefined | any): boolean {
  const isOnline = onlineManager.isOnline();

  if (data === undefined) {
    console.log('Online Status: ', isOnline);

    return isOnline;
  }

  return true;
}
