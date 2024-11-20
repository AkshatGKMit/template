import ThemeContext from '@config/ThemeContext';
import { Colors } from '@themes';
import { memo, useCallback, useContext, useRef, useState } from 'react';
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
} from 'react-native';

const Dropdown = ({ items }: DropdownProps) => {
  const defaultRectLayout = {
    height: 0,
    minWidth: 0,
    left: 0,
    top: 0,
    maxHeight: 0,
    shouldScroll: true,
  };

  const { dimensions, theme, safeAreaInsets: insets } = useContext(ThemeContext);

  const buttonRef = useRef<View | null>(null);

  const [isFocus, setFocus] = useState(false);
  const [listLayout, setListLayout] = useState(defaultRectLayout);

  const { height: H, width: W } = dimensions;
  const { top: topInsets } = insets;

  const _measureList = useCallback(() => {
    if (buttonRef && buttonRef.current) {
      buttonRef.current.measureInWindow((pageX, pageY, width, height) => {
        const top = topInsets + pageY + height + 2;
        const left = I18nManager.isRTL ? W - width - pageX : pageX;

        setListLayout({
          minWidth: Math.floor(width),
          top: Math.floor(top),
          left: Math.floor(left),
          height: Math.floor(height),
          maxHeight: H / 2,
          shouldScroll: items.length > 11,
        });
      });
    }
  }, [dimensions, buttonRef, items]);

  const _renderItem = useCallback((): ListRenderItem<DropDownItem> => {
    return ({ item }) => {
      const { label, startNode, endNode } = item;

      return (
        <TouchableHighlight
          underlayColor={theme.colors.underlay}
          onPress={() => {}}
        >
          <View style={{ paddingLeft: 12, paddingVertical: 10, paddingRight: 30 }}>
            {startNode}
            <Text>{label}</Text>
            {endNode}
          </View>
        </TouchableHighlight>
      );
    };
  }, [items]);

  const _renderList = useCallback(() => {
    const { top, left, minWidth, maxHeight } = listLayout;

    return (
      <FlatList
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
        scrollEnabled={listLayout.shouldScroll}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [listLayout, items]);

  const _renderModal = useCallback(() => {
    function showOrClose(): void {
      if (isFocus) {
        setFocus(!isFocus);
        setListLayout(defaultRectLayout);
      }
    }

    return (
      <Modal
        transparent
        statusBarTranslucent
        visible={isFocus}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={showOrClose}
        animationType="fade"
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
  }, [isFocus]);

  return (
    <>
      <Pressable
        ref={buttonRef}
        onPress={() => setFocus((prevFocus) => !prevFocus)}
        onLayout={_measureList}
      >
        <View style={{ backgroundColor: '#eeeeee', padding: 12 }}>
          <Text>Num List</Text>
        </View>
      </Pressable>
      {_renderModal()}
    </>
  );
};

export default Dropdown;
