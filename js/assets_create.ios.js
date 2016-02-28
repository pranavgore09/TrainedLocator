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
      description: null
    }
    this.state = {
      ...this.fields,
    }
  }
  gotoAssetCreate() {
    this.props.navigator.push({
      title: "New Asset",
      component: AssetsCreateNav
    });
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
  _save(){
    var cb = function(err){
      if(err){
        console.log(err)
      }else{
        dismissKeyboard();
        this.props.navigator.popToTop()
        // this.props.navigator.replacePreviousAndPop({
        //   title: "Assets",
        //   component: AssetsNav,
        //   rightButtonTitle: "New",
        //   onRightButtonPress: () => this.gotoAssetCreate(),
        // });
      }
    }
    AsyncStorage.setItem("item", JSON.stringify({'id': 'a4', 'name': this.fields.name}), cb.bind(this));
    AsyncStorage.setItem("assets_modified", '1', cb.bind(this));
  }
  render() {
    return (
      <View style = {styles.container}>
        <View>
          <Text> Asset Name :</Text>
          <TextInput
            style = {{ borderColor: 'black', borderWidth: 5, flex: 1, height: 30, width: 100, lineHeight: 10 }}
            onChangeText={(text) => this.fields.name = text}
            value={this.state.name}
            placeholder={"placeholder"}
            editable={true}>
          </TextInput>
        </View>
        <TouchableHighlight onPress={this.save.bind(this)} style = {styles.save_button}>
          <View style = {styles.save_button}>
           <Text style = {styles.save_text}>Save New Asset</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#5856D6',
  },
  save_text: {
    fontSize: 35,
  }
});

module.exports = AssetsCreate
