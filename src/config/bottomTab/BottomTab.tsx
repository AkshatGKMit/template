import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import { ROUTES, BOTTOM_TAB_CONSTANTS, Icons } from '@constants';
import { useAppSelector } from '@store';
import { getShadowStyle } from '@utility/styles';

import styles from './styles';

const { COMPONENTS_TAB: COMPONENTS_ROUTE, PRACTICE_TAB: PRACTICE_ROUTE } = ROUTES.BOTTOM_TABS;

const { MEASUREMENTS, THEME } = BOTTOM_TAB_CONSTANTS;

const {
  ACTIVE_INDICATOR_COLOR,
  BADGE_COLOR_COLOR,
  CONTAINER_COLOR,
  CONTAINER_ELEVATION,
  CONTAINER_SHADOW_COLOR,
  ICON_ACTIVE_COLOR,
  ICON_INACTIVE_COLOR,
  LABEL_ACTIVE_COLOR,
  LABEL_ACTIVE_WEIGHT,
  LABEL_INACTIVE_COLOR,
  LABEL_TYPOGRAPHY,
} = THEME;
const {
  ACTIVE_INDICATOR_HEIGHT,
  ACTIVE_INDICATOR_SHAPE,
  ACTIVE_INDICATOR_WIDTH,
  BADGE_SHAPE,
  BADGE_SIZE,
  BOTTOM_PADDING,
  CONTAINER_GAP,
  CONTAINER_HEIGHT,
  ICON_SIZE,
  INDICATOR_LABEL_GAP,
  TARGET_SIZE,
  TOP_PADDING,
} = MEASUREMENTS;

const Tab = (
  key: string,
  routeName: BottomTabRouteName,
  icon: IconType,
  isActive: boolean,
  index: number,
  setActiveTabIndex: (index: number) => void,
  theme: ThemeColors,
) => {
  const { navigate } = useNavigation<BottomTabNavigation>();

  return (
    <Pressable
      key={key}
      onPress={() => {
        setActiveTabIndex(index);
        navigate(routeName);
      }}
    >
      <View style={styles.tab}>
        <View
          style={[
            styles.iconContainer,
            {
              borderRadius: isActive ? ACTIVE_INDICATOR_SHAPE : undefined,
              backgroundColor: isActive ? theme.all[ACTIVE_INDICATOR_COLOR] : undefined,
            },
          ]}
        >
          <Icon
            icon={icon}
            size={ICON_SIZE}
            color={theme.all[isActive ? ICON_ACTIVE_COLOR : ICON_INACTIVE_COLOR]}
          />
        </View>
        <TextBlock
          typography={LABEL_TYPOGRAPHY}
          color={theme.all[isActive ? LABEL_ACTIVE_COLOR : LABEL_INACTIVE_COLOR]}
        >
          {routeName}
        </TextBlock>
      </View>
    </Pressable>
  );
};

const BottomTabBar = ({ insets, state }: BottomTabBarProps) => {
  const { colors: theme } = useAppSelector(({ theme }) => theme);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { routes } = state;

  const getIcon = useCallback((name: BottomTabRouteName) => {
    switch (name) {
      case COMPONENTS_ROUTE:
        return Icons.materialCommunityIcons.tools;
      case PRACTICE_ROUTE:
        return Icons.entypo.new;
      default:
        return Icons.materialIcons.report;
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.all[CONTAINER_COLOR],
          paddingBottom: insets.bottom,
          ...getShadowStyle(CONTAINER_ELEVATION, theme.all[CONTAINER_SHADOW_COLOR]),
        },
      ]}
    >
      {routes.map(({ key, name }, index) => {
        const isActive = activeTabIndex === index;

        const routeName = name as BottomTabRouteName;

        return Tab(key, routeName, getIcon(routeName), isActive, index, setActiveTabIndex, theme);
      })}
    </View>
  );
};

export default BottomTabBar;
