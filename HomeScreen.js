import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, TextInput, Alert, SafeAreaView, Image, ImageBackground,ActivityIndicator,FlatList, AsyncStorage} from "react-native";
import { FontAwesome, AntDesign,SimpleLineIcons } from '@expo/vector-icons';
import file from '../convertcsv.json';
import Toast from 'react-native-simple-toast';
import ResultCard from'./ResultScreen.js'
import { Container, Header, Content, Item, Input,Button } from 'native-base';
import leavesBG from '../Images/bg.jpg';
import CameraPage from './CameraScreen'
import { StackNavigator } from "react-navigation";
import Carousel from 'react-native-snap-carousel';
import maxvalue from '../MaxResult.json';




export default class HomeActivity extends Component {

  constructor(props) {
    
    super(props);
       //setting default state
    this.getHistory();
    this.state = { 
    isLoading: true, 
    text: '', 
    show : true,
    history:[],
    
  };
    this.arrayholder = [];
    
    
    
}

GetFlatListItem (searched) {

this.setState({text : searched, show: false})

}

async componentDidMount() {
  try {
        const response = await fetch('https://gist.githubusercontent.com/JB4Jaison/4a5de0b7b14a905fbb3ebd02e43d2e3b/raw/8a685a8fc9056ff836312c4a1407c01e1526692d/Beautifiedjson.json');
        const responseJson = await response.json();
        this.setState({
            isLoading: false,
            dataSource: []
        }, function () {
            this.arrayholder = Object.keys(responseJson);
        });
    }
    catch (error) {
        console.error(error);
    }
}
SearchFilterFunction(text) {
  this.setState({show: true})
  //passing the inserted text in textinput
  const newData = this.arrayholder.filter(function(item) {
    //applying filter for the inserted text in search bar
  //   const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
    
    const itemData = item ? item.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    const regex = new RegExp("^"+textData, 'i');
    // return itemData.indexOf(textData) > -1; // if found anywhere in the string return true
    if(textData == "")
      return false
    else
      return (itemData.search(regex) > -1);
  });
  this.setState({

    //setting the filtered newData on datasource
    //After setting the data it will automatically re-render the view
    dataSource: newData,
    text: text,
  });
}
ListViewItemSeparator = () => {
  //Item sparator view
  return (
      <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
      }}
    />
  );
};
getHistory = async () => {
  try {
    const hist = await AsyncStorage.getItem('history')
    if (hist !== null) {
      this.setState({ history: JSON.parse(hist) });
      console.log("history recorded:" + this.state.history)

    }
  } catch (e) {
    // error reading value
    this.setState({ history: [] });
    console.log("no history recorded: ")
  }
}


  // handlerClick = () => {
  //   //handler for Long Click
  //   Alert.alert(' Button Long Pressed');
  // };
   // Adding to list of history and making it persistent
   setHistory = (value) => {
    console.log("before setting: " + value)
    old_list = this.state.history

    console.log("old list:" + old_list)
    new_list = [...old_list, value]  // Appending old list values and the new value
    console.log("new list" + new_list)
    if (value != '') {
      AsyncStorage.setItem('history', JSON.stringify(new_list));
      this.setState({history:new_list})
      console.log("Set history: " + JSON.stringify(new_list));
    }
    Toast.show('Added to history');

  }
 
    // To be used if needed
  clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('history');
      this.setState({ history: [] });
      console.log("cleared history: ")
    } catch (e) {
      // error reading value
      console.log("could not clear history: ")
    }

  }

functioncombined(){
  this.setHistory(this.state.text);
  const { navigate } = this.props.navigation;
  navigate('ResultCard', { search : this.state.text });
  
  console.log("history working")

}

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {

      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      
      <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={leavesBG}
            style={styles.background}>
                <View style={{paddingVertical:30,justifyContent:'space-between'}}>
                <View style={styles.row_zero}>
                  <View style={{width:"70%"}}>
                <Item rounded style={{backgroundColor:"white",marginLeft:10}}>
                    <Input
                    
                    onChangeText={text => this.SearchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                    />
                  </Item>
                  </View>
                    <View style={{ width: "10%" }}>
                        <TouchableOpacity
                        onPress={() => navigate('CameraPage')}
                        style={styles.ImageIconStyle1}>
                        <AntDesign name="camera" size={40} color="black" />
                        </TouchableOpacity>
                     </View>

                     
                    <View style={{ width: "10%" }}>
                        <TouchableOpacity style={styles.ImageIconStyle2} >
                        <SimpleLineIcons name="microphone" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{marginLeft:30}}>
                    {this.state.show ? (
                        <FlatList
                            data={this.state.dataSource}
                            // ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                // <Text style={styles.textStyle}>{item.title}</Text>
                                <Item regular style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                                <Text placeholder='Rounded Textbox' style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
                                    {item} 
                                    </Text>
                                   </Item>
                            )}
                            enableEmptySections={true}
                            style={{ marginTop: -15,width:"70%",paddingLeft:10}}
                            keyExtractor={(item, index) => index}
                        />
                    ) : null}
                </View>

                <View style={styles.row_one}>

                <Button block dark style={{width:"50%"}} onPress={() => this.functioncombined() }>
                 <Text style={{color:"white",fontSize:15}}>Search</Text>
                </Button>
                    {/* <TouchableOpacity
                        // onPress={() => navigate('ResultPage', { text: this.state.text }) }
                        onPress={() => navigate('ResultCard', { search : this.state.text }) }
                        style={styles.search}>
                        <Text style={{ color: '#fff' }}>Search</Text>
                    </TouchableOpacity> */}

                </View>
                </View>
                
            </ImageBackground>
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
  row_one: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 1,
  },
  row_zero: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  ImageIconStyle1: {
    height: 70,
    width: 60,
    paddingTop: 5,
    marginLeft: 10
  },
  ImageIconStyle2: {
    height: 70,
    width: 60,
    
    paddingTop: 10,
    paddingLeft:10

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
    backgroundColor: '#000',
  },
  text: {
    width: '60%'
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    
  },
  viewStyle: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 40,
      padding: 16,
  },
  textStyle: {
      padding: 10,
  },
  textInputStyle: {
      flex : 1,
     
      
  },
});