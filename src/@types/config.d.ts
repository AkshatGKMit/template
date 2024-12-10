import { FetchInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

declare global {
  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

  interface ScalingMetrics {
    horizontalScale: (size: number) => number;
    verticalScale: (size: number) => number;
    moderateScale: (size: number, factor?: number) => number;
    wp: (widthPercent: number | string) => number;
    hp: (heightPercent: number | string) => number;
    scaleSize: (size: number, factor?: number) => number;
  }

  interface DeviceSafeArea {
    useSafeArea?: boolean;
    bottomInset?: boolean;
    leftInset?: boolean;
    rightInset?: boolean;
    topInset?: boolean;
  }

  interface BottomSheetRef {
    show: (params: BottomSheetParams) => void;
    hide: () => void;
  }

  interface SnackbarRef {
    show: (params: SnackbarParams) => void;
    hide: () => void;
  }

  interface Online {
    isConnected: boolean;
    showNoConnectionScreenMessage: boolean;
  }

  interface UseInfinitePaginationConfigProps<T> {
    enabled?: boolean;
    maxPages?: number;
    initialPage?: number;
    showErrorSnackbar?: boolean;
    onSuccess?: (data: InfiniteData<AxiosResponse<T>>) => void;
    onError?: (error: Error) => void;
  }
}
