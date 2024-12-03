import { View } from 'react-native';

import PopUpMenu from '@components/popUpMenu';
import { AppBarConstants } from '@constants';

import AppBarMain from './AppBarMain';
import ThemedStyles from './styles';
import { TrailingContainer } from './TrailingContainer';

const ExtendedMenuButton = (menuButtons: TrailingButtons) => {
  const styles = ThemedStyles();

  const { iconSize } = AppBarConstants;

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

const TrailingButtonContainer = (trailing: TrailingButtons, iconColor?: string) => {
  const styles = ThemedStyles();

  const { targetSize, gap, maxExtendedTrailing } = AppBarConstants;

  const trailingLength = Math.min(trailing.length, maxExtendedTrailing);
  const isExtended = trailing.length > 3;

  const trailingSize = trailingLength * targetSize + gap * (trailingLength - 1);

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
  const { trailing, iconColor } = props;

  return (
    <AppBarMain
      {...props}
      trailing={TrailingButtonContainer(trailing, iconColor)}
    />
  );
};

export default AppBarExtended;
