import React, { useState, useCallback } from 'react';

export const DEFAULT_DATA: { child: React.ReactNode | null } = {
  child: null,
};

export const DEFAULT_OPTIONS = {
  type: 'success',
  onShow: () => undefined,
  onHide: () => undefined,
};

export function useBottomSheet() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);

  const initialOptions = DEFAULT_OPTIONS;
  const [options, setOptions] = useState(initialOptions);

  const onAutoHide = useCallback(() => {
    setIsVisible(false);
    options.onHide();
  }, [options]);

  const hide = useCallback(() => {
    console.log('Hidden');
    setIsVisible(false);
    options.onHide();
  }, [options]);

  const show = useCallback(
    (params: any) => {
      console.log('Showing Bottom Sheet');
      const {
        child = params?.child ?? DEFAULT_DATA.child,
        type = initialOptions.type,
        onShow = initialOptions.onShow,
        onHide = initialOptions.onHide,
      } = params;
      setData({ child });
      setOptions({
        type,
        onShow,
        onHide,
      });
      // TODO: validate input
      // TODO: use a queue when Toast is already visible
      setIsVisible(true);
      onShow();
    },
    [initialOptions],
  );

  return {
    isVisible,
    data,
    options,
    show,
    hide,
  };
}
