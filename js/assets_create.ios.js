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
var AssetsNav = require('./assets.ios')
var AssetsCreateNav = require('./assets_create.ios')

class AssetsCreate extends Component {
  constructor(props) {
    super(props)
    this.fields = {
      name: null,
      desc: null
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
  get_unique_asset_id(){
    var ts = Date.now();
    return 'asset'+ts
  }
  _save(){
    var cb = function(err){
      if(err){
        console.log(err)
      }else{
        dismissKeyboard();
        this.props.navigator.popToTop()
      }
    }
    var id = this.get_unique_asset_id();
    var asset_details = {
      'id': id,
      'name': this.fields.name,
      'desc': this.fields.desc,
      'is_safe': false
    }
    var that = this;
    AsyncStorage.getItem("assets", function(err, data){
      if(data){
        var all = JSON.parse(data);
      }else{
        var all = []
      }
      all.push(asset_details);
      AsyncStorage.setItem("assets", JSON.stringify(all), cb.bind(that));
    });
    AsyncStorage.setItem(id, JSON.stringify(asset_details));
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
            onChangeText={(text) => this.fields.desc = text}
            value={this.state.desc}
            placeholder={"Description"}
            placeholderTextColor="#FF2D55"
            editable={true}>
          </TextInput>
        </View>
        <View style = {styles.button_container}>
          <TouchableHighlight onPress={this.save.bind(this)}>
            <View style = {styles.save_button}>
             <Text style = {styles.save_text}>Save New Asset</Text>
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
    // alignItems: 'center',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // backgroundColor: '#C7C7CC',
  },
  text_box_container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    paddingTop: 64,
    flexWrap: 'wrap'
  },
  input_box: {
    borderWidth: 1,
    borderColor: '#5856D6',
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
    borderColor: '#5856D6',
    borderRadius: 4,
    backgroundColor: '#D1EEFC'
  }
});

module.exports = AssetsCreate
