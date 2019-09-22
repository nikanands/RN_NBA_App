import React from 'react';
import {View, Image} from 'react-native';

import Logo from '../../assets/images/nba_login_logo.png';

const AppLogo = ({width, height}) => (
  <View style={{alignItems:'center'}}>
    <Image
      source={Logo}
      resizeMode="contain"
      style={{
        width: {width},
        height: {height},
      }}
    />
  </View>
);

export default AppLogo;
