/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var HomeNav = require('./js/home.ios')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

class TrainedLocator extends Component {
  render() {
    return (
      <NavigatorIOS
        style = {styles.nav}
        initialRoute={{
          title: "Home",
          component: HomeNav,
        }}>
      </NavigatorIOS>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
  }
});

AppRegistry.registerComponent('TrainedLocator', () => TrainedLocator);
