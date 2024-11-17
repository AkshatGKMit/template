import { useState, useCallback } from 'react';

const defaultData: BottomSheetDataParams = {
  child: null,
};

const defaultOptions: BottomSHeetOptionParams = {
  onShow: () => undefined,
  onHide: () => undefined,
};

function useBottomSheet() {
  const initialOptions = defaultOptions;

  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(defaultData);
  const [options, setOptions] = useState(initialOptions);

  const hide = useCallback(() => {
    setIsVisible(false);
    options.onHide?.();
  }, [options]);

  const show = useCallback(
    (params: BottomSheetParams) => {
      const {
        child = defaultData.child,
        onShow = initialOptions.onShow,
        onHide = initialOptions.onHide,
      } = params;

      setData({ child });
      setOptions({
        onShow,
        onHide,
      });
      setIsVisible(true);

      onShow?.();
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

export default useBottomSheet;
