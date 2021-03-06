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
  Modal,
  Button,
  AlertIOS,
  TextInput,
  AsyncStorage,
} from 'react-native';

var dismissKeyboard = require('dismissKeyboard')
var VaultsNav = require('./vaults.ios')
var VaultsCreateNav = require('./vaults_create.ios')

var DB = require('./DB')

class VaultsCreate extends Component {
  constructor(props) {
    super(props)
    this.fields = {
      name: null,
      addr: null
    }
    this.state = {
      ...this.fields,
    }
  }
  save(data) {
    var sv = this._save.bind(this)
    AlertIOS.alert(
     'Save data ?', this.fields.name,
     [
      {text: 'Cancel', onPress: ()=>console.log("Cancel pressed")},
      {text: 'Ok', onPress: ()=> sv()}
     ]
    );
  }
  get_unique_vault_id(){
    var ts = Date.now();
    return 'vault'+ts
  }
  _save(){
    var id = this.get_unique_vault_id();
    var vault_details = {
      'id': id,
      'name': this.fields.name,
      'addr': this.fields.addr,
      'is_empty': true
    }
    var that = this;
    DB.vaults.add(vault_details, function(added_data){
      if(!added_data){
        console.log('Could not insert into vaults', added_data, vault_details)
      }else{
        dismissKeyboard();
        that.props.navigator.popToTop();
      }
    });
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.text_box_container }>
          <TextInput
            style = {styles.input_box }
            onChangeText={(text) => this.fields.name = text}
            value={this.state.name}
            placeholder={"Name"}
            placeholderTextColor="#FF2D55"
            editable={true}>
          </TextInput>
          <TextInput
            style = { styles.input_box }
            onChangeText={(text) => this.fields.addr = text}
            value={this.state.addr}
            placeholder={"Address"}
            placeholderTextColor="#FF2D55"
            editable={true}>
          </TextInput>
        </View>
        <View style = {styles.button_container}>
          <TouchableHighlight onPress={this.save.bind(this)}>
            <View style = {styles.save_button}>
             <Text style = {styles.save_text}>Create New Vault</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E0F8D8'
  },
  text_box_container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 64,
    flexWrap: 'wrap'
  },
  input_box: {
    borderWidth: 1,
    borderColor: '#FF9500',
    height: 50,
    width: 360,
    fontWeight: "100",
    margin: 5
  },
  button_container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  save_text: {
    fontSize: 35,
  },
  save_button: {
    borderWidth: 3,
    borderColor: '#FF9500',
    borderRadius: 4
  }
});

module.exports = VaultsCreate
