import { useCallback, useRef } from 'react';

import BottomSheetContainer from './BottomSheetContainer';
import RefManager from '@utility/RefManager';

const refManager = new RefManager<BottomSheetRef>();

function BottomSheet() {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null);

  const setRef = useCallback((ref: BottomSheetRef | null) => {
    if (ref) {
      bottomSheetRef.current = ref;
      refManager.addNewRef(ref);
    } else {
      refManager.removeOldRef(bottomSheetRef.current);
    }
  }, []);

  return <BottomSheetContainer ref={setRef} />;
}

BottomSheet.show = (params: BottomSheetParams) => {
  refManager.getRef()?.show(params);
};

BottomSheet.hide = (params: BottomSheetParams) => {
  refManager.getRef()?.hide(params);
};

export default BottomSheet;
