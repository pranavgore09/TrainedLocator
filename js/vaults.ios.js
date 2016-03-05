/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var VaultDetailNav = require('./vault_detail.ios')
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
} from 'react-native';

class Vaults extends Component {
  gotoVaultDetail(vault_id) {
    this.props.navigator.push({
      title: "Vault Deatils",
      component: VaultDetailNav,
      passProps: {id: vault_id},
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
      <TouchableHighlight onPress={this.gotoVaultDetail.bind(this, rowData._id)}>
        <View style = {styles.row}>
          <Text style={[styles.rowText, styles.baseFont]}>{rowData.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  loadData(){
    var that = this;
    DB.vaults.get_all(function(data){
      console.log('vaults', data)
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
            <Text style={styles.informative_messae}>Create vaults by tapping 'New' button.</Text>
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
  },
  baseFont: {
    fontFamily: 'DevanagariSangamMN'
  }
});

module.exports = Vaults
