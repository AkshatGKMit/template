import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import IconButton from '@components/iconButton';
import ThemeContext from '@config/ThemeContext';
import { IconFamily } from '@constants';
import { Animation } from '@utility/helpers';
import { GlobalThemedStyles } from '@themes/globalStyles';

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

  const { dimensions, theme, safeAreaInsets } = useContext(ThemeContext);

  const [isFocus, setFocus] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(defaultLayout);
  const [menuLayout, setMenuLayout] = useState(defaultLayout);

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const { height: H, width: W } = dimensions;
  const maxMenuHeight = H / 3;

  const _measureButton = useCallback(
    (e: LayoutChangeEvent) => {
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
    },
    [W, H],
  );

  const _measureList = useCallback(
    (e: LayoutChangeEvent) => {
      const { height, width, x, y } = e.nativeEvent.layout;

      const rightPos = x + width;
      const bottomPos = y + height;

      const shouldMoveToLeft = rightPos > W;
      const shouldMoveToTop = bottomPos > H;

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
    },
    [W, H, buttonLayout],
  );

  function showOrClose(): void {
    if (isFocus) {
      setFocus(false);
      setMenuLayout(defaultLayout);
      setButtonLayout(defaultLayout);
      onClose?.();
    } else {
      setFocus(true);
      onOpened?.();
    }
  }

  const _renderItem = useCallback(
    (): ListRenderItem<PopUpMenuButton> =>
      ({ item, index }) => {
        const { id, label, onPress, startIcon } = item;

        return (
          <TouchableHighlight
            underlayColor={theme.colors.underlay(0.1)}
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
      },
    [theme, styles],
  );

  const _renderList = useCallback(() => {
    const { top, left, minWidth, maxHeight } = menuLayout;

    const opacityAnim = useRef(new Animated.Value(0)).current;

    const animate = () => {
      opacityAnim.setValue(0);
      Animation.timing(opacityAnim, 1, 100).start();
    };

    useEffect(() => {
      if (isFocus) animate();
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
  }, [menuLayout, isFocus, showSeparator, styles]);

  const _renderModal = useCallback(
    () => (
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
    ),
    [isFocus, showOrClose, globalStyles],
  );

  const _renderMenuButton = useCallback(() => {
    return (
      <IconButton
        family={icon?.family ?? IconFamily.materialIcons}
        name={icon?.name ?? 'more-vert'}
        onPress={showOrClose}
        onLayout={_measureButton}
      />
    );
  }, [styles, theme, icon]);

  return (
    <>
      {_renderMenuButton()}
      {_renderModal()}
    </>
  );
};

export default memo(PopUpMenu);
