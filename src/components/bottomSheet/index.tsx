import { useCallback, useRef } from 'react';

import BottomSheetContainer from './BottomSheetContainer';

let refs: BottomSheetRefObj[] = [];

function addNewRef(newRef: BottomSheetRef) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef: BottomSheetRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  return activeRef ? activeRef.current : null;
}

function BottomSheet() {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null);

  const setRef = useCallback((ref: BottomSheetRef | null) => {
    if (ref) {
      bottomSheetRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(bottomSheetRef.current);
    }
  }, []);

  return <BottomSheetContainer ref={setRef} />;
}

BottomSheet.show = (params: BottomSheetParams) => {
  getRef()?.show(params);
};

BottomSheet.hide = (params: BottomSheetParams) => {
  getRef()?.hide(params);
};

export default BottomSheet;
