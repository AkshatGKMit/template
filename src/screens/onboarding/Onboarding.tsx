import { View, Text, PanResponder, Easing, Button } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GradientScreen from '@components/gradientScreen';
import useScalingMetrics from '@config/useScalingMetrics';
import Icon from '@components/icon';
import { IconFamily } from '@constants';
import ThemeContext from '@config/ThemeContext';
import IconButton from '@components/iconButton';
import { Animation } from '@utility/helpers';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Screen1 = () => {
  const { hp, wp, scaleSize } = useScalingMetrics();

  const [width, setWidth] = useState(0);

  const boxWidth = useSharedValue(100);
  const iconOpacity = useSharedValue(0);

  const animateIconOpacity = () => {
    console.log('Animating icon');
    iconOpacity.value = withTiming(1, { duration: 500 });
  };

  const animateBoxWidth = () => {
    const maxWidth = 120;
    boxWidth.value = withTiming(maxWidth, { duration: 200 }, animateIconOpacity);
  };

  useEffect(() => {
    animateBoxWidth();
  }, []);

  const boxStyle = useAnimatedStyle(() => {
    return {
      width: boxWidth.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  console.log(width);

  return (
    <Animated.View
      style={[
        {
          // flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: 'white',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 5,
        },
        boxStyle,
      ]}
    >
      <Text
        style={{ fontSize: 20 }}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {/* fleeso.com/@abcdefgh */}
      </Text>
      <Animated.View
        style={[
          {
            backgroundColor: 'green',
            padding: 4,
            borderRadius: 30,
          },
          iconStyle,
        ]}
      >
        <Icon
          family={IconFamily.materialIcons}
          name={'check'}
          style={{ color: 'white', fontSize: 14 }}
        />
      </Animated.View>
      <Animated.ScrollView
        style={{
          // transform: [{ translateX: -30 }],
          width: width,
          // left: -2,
        }}
        onLayout={(event) => {
          event.target.measureInWindow((x, y, w, h) => {
            console.log('Setting Width: ', w);

            setWidth(w);
          });
        }}
        horizontal
      >
        <Text>1234567890qwertyuiopasdfghjklzxcvbnm</Text>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const screens = [
  { key: 'a7f9dbd0-fc6f-48aa-9e5a-4f8e680dfb3e', node: <Screen1 /> },
  {
    key: 'f820a5fe-4c0a-4a60-bcb6-4f586b6f976d',
    node: <View style={{ width: 200, height: 200, backgroundColor: 'blue' }} />,
  },
  {
    key: '7027ee1d-28bb-45ff-81ea-c3df0436ed98',
    node: <View style={{ width: 200, height: 200, backgroundColor: 'green' }} />,
  },
];

const Onboarding = () => {
  const { hp, wp, scaleSize } = useScalingMetrics();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [currentPage, setCurrentPage] = useState(0);

  const _onNext = () => setCurrentPage((prevPage) => (prevPage === 2 ? 0 : prevPage + 1));

  const panResponder = useRef(PanResponder.create({})).current;

  return (
    <GradientScreen>
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
        {screens[currentPage].node}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {Array.from({ length: screens.length }).map((_, i: number) => (
            <View
              key={screens[i].key}
              style={{
                height: 8,
                width: 8,
                borderRadius: 12,
                backgroundColor: currentPage === i ? colors.primary : colors.inverted.main,
              }}
            />
          ))}
        </View>
        <IconButton
          family={IconFamily.materialCommunityIcons}
          name="arrow-right"
          onPress={_onNext}
          containerStyle={{
            backgroundColor: colors.inverted.main,
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          iconStyle={{ color: colors.main, fontSize: 40 }}
          {...panResponder.panHandlers}
        />
      </View>
    </GradientScreen>
  );
};

export default Onboarding;
