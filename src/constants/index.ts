import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const StorageKey = {
  themeMode: 'ThemeMode',
  fontFamily: 'fontFamily',
};

export const Errors = {
  noInternet: 'Unable to connect to Internet',
  runtimeError: 'Unexpected error occurred',
} as const;

export const IconFamily = {
  antDesign: 'AntDesign',
  entypo: 'Entypo',
  feather: 'Feather',
  fontAwesome: 'FontAwesome',
  fontisto: 'Fontisto',
  ionicons: 'Ionicons',
  materialCommunityIcons: 'MaterialCommunityIcons',
  materialIcons: 'MaterialIcons',
  octicons: 'Octicons',
  simpleLineIcons: 'SimpleLineIcons',
} as const;

export const Images = {};
