import Icon from '@components/icon';
import ThemeContext from '@config/ThemeContext';
import { IconFamily } from '@constants';
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

const Dropdown = ({ items, hint, leftIcon, rightIcon, showSeparator }: DropdownProps) => {
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
      const { label, startNode } = item;

      return (
        <TouchableHighlight
          underlayColor={theme.colors.underlay}
          onPress={() => {}}
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
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
        data={items}
        keyExtractor={({ id }) => id.toString()}
        renderItem={_renderItem()}
        scrollEnabled={listLayout.shouldScroll}
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
          <Text style={{ marginRight: 'auto' }}>{hint}</Text>
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
