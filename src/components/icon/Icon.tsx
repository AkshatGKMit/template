import { memo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useAppSelector } from '@store';
import { FontSize } from '@themes';

const iconFamilies = {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
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
