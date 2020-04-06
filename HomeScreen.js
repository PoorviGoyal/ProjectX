import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Alert, SafeAreaView, Image, ImageBackground } from "react-native";
import leavesBG from './Images/bg.jpg';
import camera from './Images/camera.png';
import siri from './Images/siri.png';


import CameraPage from './screens/CameraScreen'
import { StackNavigator } from "react-navigation";

export default class HomeActivity extends Component {

  constructor(props) {
    super(props)
    // this.navigate = this.navigate.bind(this);
    this.state = {
      TextInputValue: '',
      jsonResults: ''
    }
  }

  buttonClickListener = () => {
    const { TextInputValue } = this.state;
    Alert.alert(TextInputValue);
  }

  // handlerClick = () => {
  //   //handler for Long Click
  //   Alert.alert(' Button Long Pressed');
  // };



  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ImageBackground
            source={leavesBG}
            style={styles.background}>

            <View style={styles.top}>
              <Text style={styles.headerText}>
                Retrieve TextInput entered value on Button Click
              </Text>
            </View>

            <View style={styles.row}>

              <TextInput
                style={{ height: 70, width: "52%", borderColor: "black", borderWidth: 2, backgroundColor: '#fff' }}
                // Adding hint in TextInput using Placeholder option.
                placeholder=" Enter Your First Name"
                //set the value in state.
                onChangeText={TextInputValue => this.setState({ TextInputValue })}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
              />


              <View style={{ width: "20%" }}>
                <TouchableOpacity
                  onPress={() => navigate('CameraPage')}
                  style={styles.ImageIconStyle1}>
                  <Image source={camera}
                    style={{ height: '100%', width: '100%' }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ width: "20%" }}>
                <TouchableOpacity style={styles.ImageIconStyle2} >
                  <Image source={siri}
                    style={{ height: '100%', width: '100%' }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={this.buttonClickListener}
                style={styles.search}>
                <Text style={{ color: '#fff' }}>Search</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.headerText}>
              {this.state.TextInputValue}
            </Text>

          </ImageBackground>
        </View>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255, .5)"
  },
  top: {
    //flex: 1,
    height: '30%',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: 'flex-end'
  },
  ImageIconStyle1: {
    height: 70,
    width: 60,
    borderWidth: 2,
    marginLeft: 15
  },
  ImageIconStyle2: {
    height: 70,
    width: 60,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5

  },
  background: {
    width: '100%',
    height: '100%'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  search: {
    height: 40,
    borderWidth: 2,
    width: '55%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  text: {
    width: '60%'
  }
});