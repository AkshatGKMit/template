import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ListRenderItem,
  TouchableHighlight,
  Modal,
  Animated,
  LayoutChangeEvent,
} from 'react-native';

import Icon from '@components/icon';
import RippleButton from '@components/rippleButton';
import useScalingMetrics from '@config/useScalingMetrics';
import { ICON_FAMILY } from '@constants';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import ThemedStyles from './styles';

const PopUpMenu = ({
  items,
  icon,
  onClose,
  onOpened,
  listStyle,
  itemStyle,
  gap = 4,
  showSeparator,
}: PopUpMenuProps) => {
  const defaultLayout: ObjectLayout = {
    height: 0,
    width: 0,
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
  };

  const { WW, WH } = useScalingMetrics();

  const theme = useAppSelector((state) => state.theme.colors);

  const [isFocus, setFocus] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(defaultLayout);
  const [menuLayout, setMenuLayout] = useState(defaultLayout);

  const styles = ThemedStyles();

  const maxMenuHeight = WH / 3;

  const _measureButton = (e: LayoutChangeEvent) => {
    e.target.measureInWindow((x, y, width, height) => {
      const top = y + height + gap;
      const left = x;

      setButtonLayout({
        width,
        height,
        top,
        left,
        bottom: y + height,
        right: x + width,
      });

      setMenuLayout({
        width: Math.floor(width),
        height: Math.floor(height),
        top: Math.floor(top),
        bottom: Math.floor(top + height),
        left: Math.floor(left),
        right: Math.floor(left + width),
        minWidth: Math.floor(width),
        maxHeight: maxMenuHeight,
      });
    });
  };

  const _measureList = (e: LayoutChangeEvent) => {
    const { height, width, x, y } = e.nativeEvent.layout;

    const rightPos = x + width;
    const bottomPos = y + height;

    const shouldMoveToLeft = rightPos > WW;
    const shouldMoveToTop = bottomPos > WH;

    if (shouldMoveToLeft) {
      //* Calculation -> Current X Position - (Right Position - Button Right Position)
      const newLeftPos = x - (rightPos - buttonLayout.right);
      setMenuLayout((prevLayout) => ({ ...prevLayout, left: newLeftPos }));
    }

    if (shouldMoveToTop) {
      //* Calculation -> Current Y Position - (2 * Custom Gap Between Button and List) - list height - button height
      let newTopPos = y - 2 * gap - height - buttonLayout.height;
      setMenuLayout((prevLayout) => ({ ...prevLayout, top: newTopPos }));
    }
  };

  function showOrClose(): void {
    if (isFocus) {
      setFocus(false);
      onClose?.();
    } else {
      setFocus(true);
      onOpened?.();
    }
  }

  const _renderItem =
    (): ListRenderItem<PopUpMenuButton> =>
    ({ item, index }) => {
      const { label, onPress, startIcon } = item;

      return (
        <TouchableHighlight
          underlayColor={theme.underlay()}
          onPress={() => {
            showOrClose();
            onPress?.(item, index);
          }}
        >
          <View style={[styles.item, itemStyle]}>
            {startIcon && <Icon {...startIcon} />}
            <Text style={styles.itemLabel}>{label}</Text>
          </View>
        </TouchableHighlight>
      );
    };

  const _renderList = () => {
    const { top, left, minWidth, maxHeight } = menuLayout;

    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isFocus) {
        Animation.timing(opacityAnim, 1, 100).start();
      }
    }, [isFocus]);

    const ListSeparator = () => {
      if (!showSeparator) return null;
      return <View style={styles.listSeparator} />;
    };

    const listViewStyles = [styles.listView, { opacity: opacityAnim }];
    const listStyles = [styles.list, listStyle, { top, left, minWidth, maxHeight }];

    return (
      <Animated.View style={listViewStyles}>
        <FlatList
          data={items}
          keyExtractor={({ id }) => id.toString()}
          renderItem={_renderItem()}
          ItemSeparatorComponent={ListSeparator}
          scrollEnabled={items.length > 7}
          showsVerticalScrollIndicator={false}
          onLayout={_measureList}
          style={listStyles}
        />
      </Animated.View>
    );
  };

  const _renderModal = () => (
    <Modal
      transparent
      statusBarTranslucent
      visible={isFocus}
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={showOrClose}
    >
      <Pressable
        style={globalStyles.flex1}
        onPress={showOrClose}
        children={_renderList()}
      />
    </Modal>
  );

  return (
    <>
      <RippleButton
        onPress={showOrClose}
        onLayout={_measureButton}
        borderRadius={40}
      >
        <Icon
          family={icon?.family ?? ICON_FAMILY.MATERIAL_ICONS}
          name={icon?.name ?? 'more-vert'}
          size={icon?.size}
        />
      </RippleButton>
      {_renderModal()}
    </>
  );
};

export default PopUpMenu;
