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
      <View style={styles.container}>
        <View style = {styles.home}>
          <TouchableHighlight onPress={() => this.gotoAssets()}>
            <View style = {styles.card}>
              <Text style= {[styles.cardText, styles.baseFont]}> Assets </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.gotoVaults()}>
            <View style = {styles.card}>
              <Text style= {[styles.cardText, styles.baseFont]}> Vaults </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.emptyBottomView}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column'
  },
  home: {
    flex: 3,
    backgroundColor: '#E0F8D8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  emptyBottomView:{
    flex:2,
    backgroundColor: '#E0F8D8',
  },
  card: {
    backgroundColor: '#FF5E3A',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 30,
    width: 150,
    height: 150,
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 25,
    textAlign: 'center'
  },
  baseFont: {
    fontFamily: 'DevanagariSangamMN'
  }
});

module.exports = Home
