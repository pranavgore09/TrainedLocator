/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

var DB = require('./DB')
var AddToVaultNav = require('./asset_add_to_vault.ios')

class AssetDetail extends Component {
  componentWillMount() {
    this.setState({"asset": false})
    this.updateStateWithAssetInfo(this.props.id)
  }
  updateStateWithAssetInfo(asset_id){
    var that = this;
    DB.assets.get_id(asset_id, function(data){
      if(data.length == 1)
        that.setState({'asset': data[0]})
      else
        console.log('Error : multiple row with same id', data)
    })
  }
  addToVault(asset_id){
    this.props.navigator.push({
      title: "Add to Vault",
      component: AddToVaultNav,
      passProps: {id: asset_id},
    });
  }
  render() {
    if(!this.state.asset){
      return (
        <View style={styles.container}>
          <Text> Loading asset </Text>
        </View>
      );
    }else{
      var asset = this.state.asset
      return (
        <View style={styles.container}>
          <Text style={styles.item}> ID : {asset.id}</Text>
          <Text style={styles.item}> Name : {asset.name}</Text>
          <Text style={styles.item}> Description : {asset.desc}</Text>
          <View style={styles.atBottom}>
            {(
              () => {
                if(asset.is_safe){
                  return (
                    <View>
                      <Text style={styles.infoText}>This is safe in vault id = {asset.vault_id}</Text>
                      <TouchableHighlight onPress={this.addToVault.bind(this, asset._id)}>
                        <Text style={styles.infoButton}>Move to another vault</Text>
                      </TouchableHighlight>
                    </View>
                    )
                }else{
                  return (
                    <View>
                      <Text style={styles.infoTextDanger}>This asset is not safe</Text>
                      <TouchableHighlight onPress={this.addToVault.bind(this, asset._id)}>
                        <Text style={styles.infoButton}>Select and add to vault</Text>
                      </TouchableHighlight>
                    </View>
                    )
                }
              }
            )()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDDDE',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    paddingTop: 64,
    // justifyContent: 'center',
  },
  item: {
    // flex: 1,
    fontSize: 20,
    margin: 20
  },
  atBottom: {
    margin: 20
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center'
  },
  infoButton: {
    borderWidth: 2,
    fontSize: 20,
    textAlign: 'center'
  },
  infoTextDanger: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center'
  }
});

module.exports = AssetDetail
