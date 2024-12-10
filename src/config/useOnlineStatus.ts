import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface OnlineStatus {
  isConnected: boolean;
  showNoConnectionScreenMessage: boolean;
}

const useOnlineStatus = <T>(data: T | undefined) => {
  const [online, setOnline] = useState<OnlineStatus>({
    isConnected: false,
    showNoConnectionScreenMessage: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      setOnline({
        isConnected,
        showNoConnectionScreenMessage: !isConnected && !data,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [data]);

  return online;
};

export default useOnlineStatus;
