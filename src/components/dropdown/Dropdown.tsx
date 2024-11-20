import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { IconFamily } from '@constants';
import { Colors } from '@themes';
import { Animation } from '@utility/helpers';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ListRenderItem,
  TouchableHighlight,
  I18nManager,
  Modal,
  Animated,
  LayoutChangeEvent,
} from 'react-native';

const Dropdown = ({
  value,
  items,
  onSelect,
  hint,
  leftIcon,
  rightIcon,
  showSeparator,
}: DropdownProps) => {
  const defaultLayout: ObjectLayout = {
    height: 0,
    width: 0,
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
  };

  const { dimensions, theme, safeAreaInsets: insets } = useContext(ThemeContext);

  const [isFocus, setFocus] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(defaultLayout);
  const [listLayout, setListLayout] = useState(defaultLayout);

  const { height: H, width: W } = dimensions;

  const extraGap = 4;
  const maxDropdownHeight = H / 3;

  const _measureButton = useCallback(
    (e: LayoutChangeEvent) => {
      e.target.measureInWindow((x, y, width, height) => {
        const top = y + height + extraGap;
        const left = I18nManager.isRTL ? W - width - x : x;

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
        let newTopPos = y - 2 * extraGap - height - buttonLayout.height;
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
            underlayColor={theme.colors.underlay}
            onPress={() => {
              setFocus(false);
              onSelect?.(item, index);
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                paddingLeft: 12,
                paddingVertical: 10,
                paddingRight: 30,
              }}
            >
              {startNode && <Icon {...startNode} />}
              <Text>{label}</Text>
            </View>
          </TouchableHighlight>
        );
      },
    [theme],
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

      return (
        <View
          style={{
            width: 'auto',
            height: 0.75,
            backgroundColor: theme.colors.divider,
            marginHorizontal: 12,
            marginVertical: 1,
          }}
        />
      );
    };

    return (
      <Animated.View
        style={{
          opacity: opacityAnim,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <FlatList
          onLayout={_measureList}
          style={{
            backgroundColor: '#eeeeee',
            position: 'absolute',
            zIndex: 10,
            top,
            left,
            minWidth,
            maxHeight,
            paddingVertical: 4,
          }}
          data={items}
          keyExtractor={({ id }) => id.toString()}
          renderItem={_renderItem()}
          scrollEnabled={items.length > 7}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ListSeparator}
        />
      </Animated.View>
    );
  }, [listLayout, isFocus, showSeparator]);

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
          style={{
            backgroundColor: Colors.transparent,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          onPress={() => setFocus(false)}
          children={_renderList()}
        />
      </Modal>
    ),
    [isFocus, showOrClose],
  );

  return (
    <>
      <Pressable
        onPress={() => setFocus((prevFocus) => !prevFocus)}
        onLayout={_measureButton}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#eeeeee',
            padding: 12,
            gap: 10,
            borderWidth: 1,
            borderColor: isFocus ? theme.colors.primary : Colors.transparent,
          }}
        >
          {leftIcon && <Icon {...leftIcon} />}
          <Text
            style={{
              marginRight: 'auto',
              color: value ? theme.colors.text : theme.colors.placeholder,
            }}
          >
            {value ? value.label : hint}
          </Text>
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
      {_renderModal()}
    </>
  );
};

export default memo(Dropdown);
