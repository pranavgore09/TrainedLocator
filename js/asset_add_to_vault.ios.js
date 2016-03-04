/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var DB = require('./DB')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS
} from 'react-native';

class Vaults extends Component {
  addAssetToVault(vault_id) {
  	var add = function(vault_id){
  		var that = this
		DB.assets.get_id(this.props.id, function(data){
			if(data.length == 1){
				var asset = data[0]
				asset.vault_id = vault_id
				asset.is_safe = true
				DB.assets.update_id(asset._id, asset, function(updated_data){
					console.log('Asset updated', updated_data)
					that.props.navigator.popToTop();
				});
			}
		});
  	}
  	AlertIOS.alert(
     'Add to this vault ?', '',
     [
      {text: 'Cancel', onPress: ()=>console.log("Cancel pressed")},
      {text: 'Ok', onPress: ()=> add.bind(this, vault_id)()}
     ]
    );
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
      <TouchableHighlight onPress={this.addAssetToVault.bind(this, rowData._id)}>
        <View style = {styles.row}>
          <Text style={styles.rowText}>{rowData.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  loadData(){
    var that = this;
    DB.vaults.get_all(function(data){
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      if(data.totalrows == 0){
        that.setState({'dataSource': ds.cloneWithRows([]), 'fetchData': false})
      }else{
        that.setState({'dataSource': ds.cloneWithRows(data.rows), 'fetchData': false})
      }
    })
  }
  render() {
    if(this.state.fetchData){
      this.loadData()
      return(
        <View style={styles.informative_box}>
          <Text style={styles.informative_messae}> Initializing list </Text>
        </View>
        )
    }
    if(this.state.dataSource.getRowCount() == 0){
      return(
          <View style={styles.informative_box}>
            <Text style={styles.informative_messae}>Please create vaults and then only you can add assets.</Text>
          </View>
        );
    }
    return (
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          style={{backgroundColor:'#FF5B37', paddingTop: 64}}/>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 2,
    borderBottomColor: '#55EFCB',
  },
  rowText: {
    fontSize: 35,
  },
  informative_box:{
    paddingTop: 100,
    padding: 60
  },
  informative_messae: {
    fontSize: 30
  }
});

module.exports = Vaults
