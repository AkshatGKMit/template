import { useState } from 'react';
import { PermissionsAndroid, Button } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const ToggleWifi = () => {
  const [isWifiOn, setWifiOn] = useState(true);

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission Required',
        message: 'This app needs location permission to access Wi-Fi.',
        buttonNegative: 'Deny',
        buttonPositive: 'Allow',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const toggleWifi = async () => {
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      const wifiEnabled = await WifiManager.isEnabled();
      if (wifiEnabled) {
        WifiManager.setEnabled(false);
        console.log('Wi-Fi is turned off');
      } else {
        WifiManager.setEnabled(true);
        console.log('Wi-Fi is turned on');
      }
    } else {
      console.log('Permission denied');
    }
  };

  return (
    <Button
      title="Toggle Wi-Fi"
      onPress={toggleWifi}
      color={isWifiOn ? '#00ff00' : '#ff0000'}
    />
  );
};

export default ToggleWifi;
