import { memo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import { useAppSelector } from '@store';
import { FontSize } from '@themes';

const iconFamilies = {
  AntDesign,
  Entypo,
  Feather,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Brands: FontAwesome5Pro,
  FontAwesome6,
  FontAwesome6Brands: FontAwesome6Pro,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

const Icon = ({ family, name, color, size }: IconProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const SelectedIcon = iconFamilies[family];

  return (
    <SelectedIcon
      name={name}
      color={color ?? theme.text}
      size={size ?? FontSize.labelMedium}
    />
  );
};

export default memo(Icon);
