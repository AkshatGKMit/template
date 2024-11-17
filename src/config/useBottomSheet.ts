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
    setData(defaultData);
    setOptions(defaultOptions);
    options.onHide?.();
  }, [options]);

  const show = useCallback((params: BottomSheetParams) => {
    const { child = defaultData.child, isDismissible = true, snap, onShow } = params;

    setData({ ...params, child, isDismissible, snap });
    setOptions(params);
    setIsVisible(true);

    onShow?.();
  }, []);

  return {
    isVisible,
    data,
    options,
    show,
    hide,
  };
}

export default useBottomSheet;
