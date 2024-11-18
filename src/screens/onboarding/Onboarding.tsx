import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import GradientScreen from '@components/gradientScreen';
import useScalingMetrics from '@config/useScalingMetrics';
import Icon from '@components/icon';
import { IconFamily } from '@constants';
import ThemeContext from '@config/ThemeContext';
import IconButton from '@components/iconButton';

const screens = [
  <View style={{ width: 200, height: 200, backgroundColor: 'red' }} />,
  <View style={{ width: 200, height: 200, backgroundColor: 'blue' }} />,
  <View style={{ width: 200, height: 200, backgroundColor: 'green' }} />,
];

const Onboarding = () => {
  const { hp, wp, scaleSize } = useScalingMetrics();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [currentPage, setCurrentPage] = useState(0);

  const _onNext = () => setCurrentPage((prevPage) => (prevPage === 2 ? 0 : prevPage + 1));

  return (
    <GradientScreen>
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
        {screens[currentPage]}
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
              key={`${screens[i]}`}
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
        />
      </View>
    </GradientScreen>
  );
};

export default Onboarding;
