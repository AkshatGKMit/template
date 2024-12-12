import { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, Pressable } from 'react-native';

import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { colorWithOpacity } from '@utility/helpers';

import Styles from './styles';

function renderData(data: DialogParams, hideModal: () => void, styles: any) {
  const { backdropColor, borderRadius, child } = data;

  const dialogStyles = [globalStyles.flex1, { backgroundColor: backdropColor }];

  return (
    <>
      <Pressable
        onPress={() => {
          hideModal();
        }}
        style={dialogStyles}
      ></Pressable>
      <View style={[globalStyles.columnCenter, styles.container, { borderRadius }]}>{child}</View>
    </>
  );
}

const DialogContainer = forwardRef<DialogRef>((_, ref) => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<DialogParams | null>(null);

  function showModal(params: DialogParams) {
    const { isDismissible = true, backdropColor = colorWithOpacity(Colors.black, 0.5) } = params;

    setData({ ...params, isDismissible, backdropColor });
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
    setData(null);
  }

  useImperativeHandle(ref, () => ({
    show: (params: DialogParams) => showModal(params),
    hide: hideModal,
  }));

  const styles = Styles();

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={isVisible}
      presentationStyle="overFullScreen"
    >
      {data && renderData(data, hideModal, styles)}
    </Modal>
  );
});

export default DialogContainer;
