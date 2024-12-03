import { View, ViewProps } from 'react-native';

import { GlobalThemedStyles } from '@themes/globalStyles';

const Scaffold = (props: ViewProps) => {
  const globalThemedStyles = GlobalThemedStyles();

  return (
    <View
      {...props}
      style={[globalThemedStyles.screen, props.style]}
    />
  );
};

export default Scaffold;
