import { useCallback, useRef } from 'react';

import RefManager from '@utility/RefManager';

import SnackBarRoot from './SnackBar';

const refManager = new RefManager<SnackbarRef>();

function Snackbar() {
  const snackbarRef = useRef<SnackbarRef | null>(null);

  const setRef = useCallback((ref: SnackbarRef | null) => {
    if (ref) {
      snackbarRef.current = ref;
      refManager.addNewRef(ref);
    } else {
      refManager.removeOldRef(snackbarRef.current);
    }
  }, []);

  return <SnackBarRoot ref={setRef} />;
}

Snackbar.show = (params: SnackbarParams) => {
  refManager.getRef()?.show(params);
};

Snackbar.hide = () => {
  refManager.getRef()?.hide();
};

export default Snackbar;
