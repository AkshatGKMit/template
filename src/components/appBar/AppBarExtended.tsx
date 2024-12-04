import { useWindowDimensions, View } from 'react-native';

import PopUpMenu from '@components/popUpMenu';
import { APP_BAR_CONSTANTS } from '@constants';

import AppBarMain from './AppBarMain';
import ThemedStyles from './styles';
import { TrailingContainer } from './TrailingContainer';
import useScalingMetrics from '@config/useScalingMetrics';

const ExtendedMenuButton = (menuButtons: TrailingButtons) => {
  const styles = ThemedStyles();

  const { ICON_SIZE: iconSize } = APP_BAR_CONSTANTS;

  return (
    <View style={styles.trailingContainer}>
      <PopUpMenu
        items={menuButtons!.map((button, index) => {
          const { icon: startIcon, title: label, onPress } = button;
          const id = label + index;

          return { id, label, onPress, startIcon };
        })}
        icon={{ size: iconSize }}
      />
    </View>
  );
};

const TrailingButtonContainer = ({
  trailing,
  maxNumberOfButtons,
  styles,
  iconColor,
}: TrailingButtonContainerProps) => {
  const { GAP: gap, TARGET_SIZE } = APP_BAR_CONSTANTS;

  const trailingLength = Math.min(trailing.length, maxNumberOfButtons);
  const isExtended = trailing.length > maxNumberOfButtons;

  const trailingSize = trailingLength * TARGET_SIZE + gap * (trailingLength - 1);

  const displayedButtons = trailing.slice(0, isExtended ? trailingLength - 1 : trailingLength);
  const menuButtons = isExtended ? trailing.slice(trailingLength) : null;

  return (
    <View style={[styles.extendedTrailingContainer, { width: trailingSize }]}>
      {displayedButtons.map(({ icon, title, onPress }, index) => {
        const { family, name } = icon;
        const iconButton: IconButtonProps = { family, name, onPress };

        return (
          <TrailingContainer
            key={index + title}
            style={styles}
            trailing={iconButton}
            iconColor={iconColor}
          />
        );
      })}
      {isExtended && ExtendedMenuButton(menuButtons!)}
    </View>
  );
};

const AppBarExtended = (props: ExtendedAppBarProps) => {
  const { portrait } = useScalingMetrics();

  const styles = ThemedStyles();

  const maxNumberOfButtons = portrait ? 3 : 5;

  const { trailing, iconColor } = props;

  return (
    <AppBarMain
      {...props}
      trailing={
        <TrailingButtonContainer {...{ trailing, maxNumberOfButtons, styles, iconColor }} />
      }
    />
  );
};

export default AppBarExtended;
