import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { IconFamily } from '@constants';
import { Colors } from '@themes';
import { Animation } from '@utility/helpers';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  LayoutRectangle,
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
  const { top: topInsets } = insets;

  const _measureButton = (e: LayoutChangeEvent) => {
    e.target.measureInWindow((x, y, width, height) => {
      const top = y + height + 2;
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
        maxHeight: H / 2,
      });
    });
  };

  const _measureList = (e: LayoutChangeEvent) => {
    const { height, width, x, y } = e.nativeEvent.layout;

    const rightPos = x + width;
    const bottomPos = y + height;

    const shouldMoveToLeft = rightPos > W;
    const shouldMoveToTop = bottomPos > H;

    if (shouldMoveToLeft) {
      const newLeftPos = x - (rightPos - buttonLayout.right);

      setListLayout((prevLayout) => ({ ...prevLayout, left: newLeftPos }));
    }

    if (shouldMoveToTop) {
      // const newTopPos = buttonLayout.top + 10;
      // setListLayout((prevLayout) => ({ ...prevLayout, top: newTopPos }));
    }
  };

  function showOrClose(): void {
    if (isFocus) {
      setFocus(!isFocus);
      setListLayout(defaultLayout);
      setButtonLayout(defaultLayout);
    }
  }

  const _renderItem = (): ListRenderItem<DropDownItem> => {
    return ({ item, index }) => {
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
    };
  };

  const _renderList = () => {
    const { top, left, right, bottom, minWidth, maxHeight } = listLayout;

    const opacityAnim = useRef(new Animated.Value(0)).current;

    const animate = () => {
      opacityAnim.setValue(0);
      Animation.timing(opacityAnim, 1, 100).start();
    };

    useEffect(() => {
      if (isFocus) animate();
    }, [isFocus]);

    return (
      <Animated.View style={{ opacity: opacityAnim }}>
        <FlatList
          onLayout={_measureList}
          style={{
            backgroundColor: '#eeeeee',
            position: 'absolute',
            zIndex: 10,
            top,
            left,
            // right,
            // bottom,
            minWidth,
            maxHeight,
            paddingVertical: 4,
            borderWidth: 1,
            borderColor: theme.colors.primary,
          }}
          data={items}
          keyExtractor={({ id }) => id.toString()}
          renderItem={_renderItem()}
          scrollEnabled={items.length > 11}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: 'auto',
                height: 0.75,
                backgroundColor: theme.colors.divider,
                marginHorizontal: 12,
                marginVertical: 1,
              }}
            />
          )}
        />
      </Animated.View>
    );
  };

  const _renderModal = () => {
    return (
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
    );
  };

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

export default Dropdown;
