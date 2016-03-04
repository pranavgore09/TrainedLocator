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

class AssetDetail extends Component {
  componentWillMount() {
    this.setState({"asset": false})
    this.updateStateWithAssetInfo(this.props.id)
  }
  updateStateWithAssetInfo(asset_id){
    var that = this;
    AsyncStorage.getItem(asset_id, function(err, data){
      if(!err){
        that.setState({'asset': JSON.parse(data)})
      }
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
          <Text style={styles.atBottom}>
            {(
              () => {
                if(asset.is_safe){
                  return "This is safe in vault."
                }else{
                  return "Not yet safe. Quickly add it to safe."
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
    backgroundColor: '#DBDDDE',
    flexDirection: 'column',
    paddingTop: 64,
    alignItems: 'center',
  },
  item: {
    // flex: 1,
    fontSize: 20
  },
  atBottom: {
    flex:1,
    fontSize: 24,
  }
});

module.exports = AssetDetail
