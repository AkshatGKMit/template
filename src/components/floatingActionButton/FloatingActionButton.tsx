import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  LayoutChangeEvent,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from '@components/icon';
import { defaultLayout, FabAppearance, FabBorderRadius, FabSize, IconFamily } from '@constants';
import { Animation } from '@utility/helpers';
import ThemeContext from '@config/ThemeContext';

const FloatingActionButtonAutoHide = (props: FloatingActionButtonAutoHideProps) => {
  const { theme } = useContext(ThemeContext);
  const layoutDimensionsRef = useRef<ObjectLayout>(defaultLayout);

  const animateFAB = Animation.newValue(0);

  const { hide, hideDuration = 200 } = props;

  const animate = () => {
    Animation.timing(animateFAB, !hide ? 0 : 1, hideDuration).start();
  };

  useEffect(() => {
    if (!hide) {
      setTimeout(() => {
        animate();
      }, 3000);
    } else {
      animate();
    }
  }, [hide]);

  function getBorderRadius(fabBorderRadius: FabBorderRadius) {
    switch (fabBorderRadius) {
      case FabBorderRadius.auto:
        return 10;
      case FabBorderRadius.full:
        return 100;
      default:
        return 0;
    }
  }

  function getPadding(fabSize: FabSize) {
    switch (fabSize) {
      case FabSize.mini:
        return 2;
      case FabSize.normal:
        return 5;
      case FabSize.large:
        return 8;
      default:
        return 0;
    }
  }

  const {
    icon,
    iconColor = theme.colors.text,
    onPress,
    borderRadius = FabBorderRadius.auto,
    size = FabSize.normal,
    backgroundColor = theme.colors.primary,
    margin = 30,
    zIndex,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex,
            bottom: 0,
            right: 0,
            marginRight: margin,
            marginBottom: margin,
            backgroundColor,
            padding: getPadding(size),
            borderRadius: getBorderRadius(borderRadius),
            transform: [
              {
                translateX: animateFAB.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 30 + layoutDimensionsRef.current.width],
                }),
              },
              {
                rotate: animateFAB.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
            shadowColor: theme.colors.inverted.main,
            shadowOffset: {
              height: 1,
              width: 1,
            },
            shadowRadius: 3,
            shadowOpacity: 0.5,
            elevation: 4,
          },
        ]}
      >
        <Icon
          {...icon}
          style={{ color: iconColor, fontSize: 40 }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FloatingActionButtonAutoHide;
