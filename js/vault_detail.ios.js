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

class VaultDetail extends Component {
  componentWillMount() {
    this.setState({"vault": false})
    this.updateStateWithVaultInfo(this.props.id)
  }
  updateStateWithVaultInfo(vault_id){
    var that = this;
    DB.vaults.get_id(vault_id, function(data){
      if(data.length == 1)
        that.setState({'vault': data[0]})
      else
        console.log('Error : multiple row with same id', data)
    })
  }
  render() {
    if(!this.state.vault){
      return (
        <View style={styles.container}>
          <Text> Loading vault </Text>
        </View>
      );
    }else{
      var vault = this.state.vault
      return (
        <View style={styles.container}>
          <Text style={styles.item}> ID : {vault.id}</Text>
          <Text style={styles.item}> Name : {vault.name}</Text>
          <Text style={styles.item}> Address : {vault.addr}</Text>
          <Text style={styles.atBottom}>
            {(
              () => {
                if(vault.is_empty){
                  return "This vault is empty."
                }else{
                  return "N items are safe inside this vault."
                }
              }
            )()}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5E3A',
    flexDirection: 'column',
    paddingTop: 64,
    alignItems: 'center',
  },
  item: {
    // flex: 1,
    fontSize: 20,
  },
  atBottom: {
    flex:1,
    fontSize: 24,
  }
});

module.exports = VaultDetail
