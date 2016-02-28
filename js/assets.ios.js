/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var AssetDetailNav = require('./asset_detail.ios')

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

class Assets extends Component {
  gotoAssetDetail(asset_id) {
    this.props.navigator.push({
      title: "Asset Deatils",
      component: AssetDetailNav,
      passProps: {id: asset_id},
    });
  }
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: [],
      fetchData: true
    };
  }
  renderRow(rowData){
    return(
      <TouchableHighlight onPress={this.gotoAssetDetail.bind(this, rowData.id)}>
        <View style = {styles.row}>
          <Text style={styles.rowText}>{rowData.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  loadData(){
    var that = this;
    var asset_list = [
      {'id': 'a1', 'name': 'Gold Chain'},
      {'id': 'a3', 'name': 'Property X Document'},
    ]
    AsyncStorage.getItem('item', function(err, data){
      if(!err){
        data = JSON.parse(data)
        asset_list.push(data)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        that.setState({'dataSource': ds.cloneWithRows(asset_list), 'fetchData': false})
      }else{
        console.log(err, data)
      }
    })
  }
  render() {
    if(this.state.fetchData){
      this.loadData()
      return(
        <View>
          <Text> Initializing list </Text>
        </View>
        )
    }
    return (
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          style={{top:20}}/>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#5856D6',
  },
  rowText: {
    fontSize: 35,
  }
});

module.exports = Assets
