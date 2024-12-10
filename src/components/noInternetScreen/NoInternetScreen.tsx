import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import TextBlock from '@components/textBlock';
import { IMAGES } from '@constants';
import { FontFamily, Typography } from '@themes';
import { globalStyles } from '@themes/globalStyles';

const NoInternetScreen = () => {
  return (
    <View style={[globalStyles.flex1, globalStyles.columnCenter, { gap: 20 }]}>
      <FastImage
        defaultSource={IMAGES.NO_INTERNET}
        resizeMode="contain"
        style={{ aspectRatio: 1, width: '60%' }}
      />
      <TextBlock
        family={FontFamily.normal.black}
        typography={Typography.titleLarge}
      >
        No Internet Connection
      </TextBlock>
    </View>
  );
};

export default NoInternetScreen;
