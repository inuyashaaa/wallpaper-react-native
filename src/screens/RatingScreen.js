import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import DeviceInfo from 'react-native-device-info';
import {Text} from '../components';

const RatingScreen = () => {
  const handleRatingApp = () => {
    const options = {
      AppleAppID: null,
      GooglePackageName: DeviceInfo.getBundleId(),
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
    };
    Rate.rate(options, success => {});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleRatingApp}>
        <View
          style={{
            width: 200,
            height: 50,
            borderRadius: 10,
            backgroundColor: '#40BFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Rating app</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RatingScreen;
