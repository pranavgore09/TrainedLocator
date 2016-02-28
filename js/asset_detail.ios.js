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
} from 'react-native';

class AssetDetail extends Component {
  componentWillMount() {
    this.asset = this.fetchAsset(this.props.id)
  }
  fetchAsset(asset_id){
    return {
      'name': 'Gold Chain',
      'description': '10 gm from PNG jwellers',
      'current_valut': 'XYZ bank safe',
      'is_safe': true
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> ID : {this.props.id}</Text>
        <Text> Name : {this.asset.name}</Text>
        <Text> Description : {this.asset.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDDDE',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = AssetDetail
