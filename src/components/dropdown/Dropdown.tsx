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
import ThemeContext from '@config/ThemeContext';
import { defaultLayout, IconFamily } from '@constants';
import { Colors } from '@themes';
import { GlobalThemedStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import ThemedStyles from './styles';

const Dropdown = ({
  value,
  items,
  onSelect,
  hint,
  leftIcon,
  rightIcon,
  buttonStyle,
  listStyle,
  itemStyle,
  gap = 4,
  showSeparator,
}: DropdownProps) => {
  const { dimensions, theme } = useContext(ThemeContext);

  const [isFocus, setFocus] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(defaultLayout);
  const [listLayout, setListLayout] = useState(defaultLayout);

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const { height: H, width: W } = dimensions;
  const maxDropdownHeight = H / 3;

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

        setListLayout({
          width: Math.floor(width),
          height: Math.floor(height),
          top: Math.floor(top),
          bottom: Math.floor(top + height),
          left: Math.floor(left),
          right: Math.floor(left + width),
          minWidth: Math.floor(width),
          maxHeight: maxDropdownHeight,
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
        setListLayout((prevLayout) => ({ ...prevLayout, left: newLeftPos }));
      }

      if (shouldMoveToTop) {
        //* Calculation -> Current Y Position - (2 * Custom Gap Between Button and List) - list height - button height
        let newTopPos = y - 2 * gap - height - buttonLayout.height;
        setListLayout((prevLayout) => ({ ...prevLayout, top: newTopPos }));
      }
    },
    [W, H, buttonLayout],
  );

  function showOrClose(): void {
    if (isFocus) {
      setFocus(!isFocus);
      setListLayout(defaultLayout);
      setButtonLayout(defaultLayout);
    }
  }

  const _renderItem = useCallback(
    (): ListRenderItem<DropDownItem> =>
      ({ item, index }) => {
        const { label, startNode } = item;

        return (
          <TouchableHighlight
            underlayColor={theme.colors.underlay(0.1)}
            onPress={() => {
              setFocus(false);
              onSelect?.(item, index);
            }}
          >
            <View style={[styles.item, itemStyle]}>
              {startNode && <Icon {...startNode} />}
              <Text style={styles.itemLabel}>{label}</Text>
            </View>
          </TouchableHighlight>
        );
      },
    [theme, styles],
  );

  const _renderList = useCallback(() => {
    const { top, left, minWidth, maxHeight } = listLayout;

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
  }, [listLayout, isFocus, showSeparator, styles]);

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
          onPress={() => setFocus(false)}
          children={_renderList()}
        />
      </Modal>
    ),
    [isFocus, showOrClose, globalStyles],
  );

  const _renderDropdownButton = useCallback(() => {
    const buttonStyles = useMemo(
      () => [
        styles.button,
        { borderColor: isFocus ? theme.colors.primary : Colors.transparent },
        buttonStyle,
      ],
      [styles, isFocus, theme, buttonStyle],
    );

    const buttonTextStyles = useMemo(
      () => [styles.buttonText, { color: value ? theme.colors.text : theme.colors.placeholder() }],
      [styles, value, theme],
    );

    return (
      <Pressable
        onPress={() => setFocus((prevFocus) => !prevFocus)}
        onLayout={_measureButton}
      >
        <View style={buttonStyles}>
          {leftIcon && <Icon {...leftIcon} />}
          <Text style={buttonTextStyles}>{value ? value.label : hint}</Text>
          {rightIcon ? (
            <Icon {...rightIcon} />
          ) : (
            <Icon
              family={IconFamily.materialIcons}
              name="arrow-drop-down"
            />
          )}
        </View>
      </Pressable>
    );
  }, [styles, leftIcon, rightIcon, value, hint, theme]);

  return (
    <>
      {_renderDropdownButton()}
      {_renderModal()}
    </>
  );
};

export default memo(Dropdown);
