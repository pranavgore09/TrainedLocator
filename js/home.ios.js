/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var AssetsNav = require('./assets.ios')
var AssetsCreateNav = require('./assets_create.ios')

var VaultsNav = require('./vaults.ios')
var VaultCreateNav = require('./vaults_create.ios')

var DBEvents = require('react-native-db-models').DBEvents

DBEvents.on("all", function() {
  console.log('DB changed');
})

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Home extends Component {
  gotoAssets() {
    this.props.navigator.push({
      title: "Assets",
      component: AssetsNav,
      rightButtonTitle: "New",
      onRightButtonPress: () => this.gotoAssetCreate(),
    });
  }
  gotoAssetCreate() {
    this.props.navigator.push({
      title: "New Asset",
      component: AssetsCreateNav
    });
  }
  gotoVaults() {
    this.props.navigator.push({
      title: "Vaults",
      component: VaultsNav,
      rightButtonTitle: "New",
      onRightButtonPress: () => this.gotoVaultCreate(),
    });
  }
  gotoVaultCreate(){
    this.props.navigator.push({
      title: "New Vault",
      component: VaultCreateNav
    });
  }
  render() {
    return (
      <View style = {styles.home}>
        <View style = {styles.card}>
          <TouchableHighlight onPress={() => this.gotoAssets()}>
          <Text style= {styles.cardText}> Assets </Text>
          </TouchableHighlight>
        </View>

        <View style = {styles.card}>
          <TouchableHighlight onPress={() => this.gotoVaults()}>
          <Text style= {styles.cardText}> Vaults </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#C7C7CC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FF5E3A',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 30,
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 25,
  }
});

module.exports = Home
