import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, ListViewComponent, Image,Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Header, Card, CardItem, Title, Toolbar, Icon, Left, Right } from 'native-base'
import file from '../convertcsv.json';
import Toast from 'react-native-simple-toast';
import maxvalue from '../MaxResult.json';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window')
const horizontalMargin = 0;
const slideWidth = width;

const sliderWidth = width-20;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight =250;


class ResultCard extends Component {
  constructor(props) {

    super(props);
    this.getData();
    this.state = {
      isLoading: true,
      dataSource: [],
      favourites: [],
      reccomendation_list : [],
      item : '',
      imageURL : ''
    };
    this.createRecommendations();
  }

  // Function to load the data from AsyncStorage intitally
  getData = async () => {
    try {
      const favs = await AsyncStorage.getItem('favourites')
      if (favs !== null) {
        this.setState({ favourites: JSON.parse(favs) });
        console.log("got favourites: " + this.state.favourites)
      }
    } catch (e) {
      // error reading value
      this.setState({ favourites: [] });
      console.log("got no favourites: ")
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: file[this.props.navigation.getParam('search', 'nothing sent')],  // Obtaining the object of the item seached
      item: this.props.navigation.getParam('search', 'nothing sent') // Obtaining the name of the item seached
    });

  }
  
  my_renderItem = ({item, index}) => {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.slide}>
        <View style={styles.slideInnerContainer} >

            <View style = {{ height: 10, flex :9 ,paddingHorizontal: 10, paddingVertical : 10, borderWidth : 0.5}}>
              {/* <TouchableOpacity style = {{flex : 1} } onPress={() => navigate('ResultPage', { search : item.name }) }> */}
              <TouchableOpacity style = {{flex : 1} }
                onPress={() =>{
                    this.setState({ dataSource:file[item.name] , item : item.name  });
                    // this.createRecommendations();
                }}>
              <Image source={{ uri: item.path }} style={{flex: 1}} resizeMode="contain"/>

              </TouchableOpacity>
            </View>
            <View style = {{ flex :3 }} >

              {/* Grade Value  */}
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'black',
                    position: 'absolute',
                    bottom: 2,
                    right: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#82b74b"
                    }}
                >
                    {item.grade}
                </Text>

                {/* Item Name */}
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'black',
                    position: 'absolute',
                    bottom: 10,
                    left: 10
                    }}
                >
                    {item.name}
                </Text>
            </View>

        </View>
      </View>

    );
  }
  // Adding to list of favourites and making it persistent
  setFavourite = (value) => {
    old_list = this.state.favourites
    new_list = [...old_list, value]  // Appending old list values and the new value
    if (value != '') {
      AsyncStorage.setItem('favourites', JSON.stringify(new_list));
      console.log("Set favourites: " + JSON.stringify(new_list));
    }
    Toast.show('Saved to favourites');

  }
  compare(a, b) {
    const bandA = a.grade;
    const bandB = b.grade;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  createRecommendations()
  {
      let searched = this.props.navigation.getParam('search', 'nothing sent');
      console.log(searched)
      //console.log(file)
      let searched_object= file[searched][0]
      let cat_objects2 = Object.keys(file).map( (item , index) =>{

        // Creating a new mini object with required fields from the appropriate category
        if(file[item][0].Categories== file[searched][0].Categories)
        {
            return {
              grade :file[item][0].Grade,
              name : item,
              path : file[item][0].Images
          }
        }

      });

    // Removing the undefined values in the array from the map function
    cat_objects2 = cat_objects2.filter(function( element ) {
      return (element !== undefined) && (element.name !== searched);
    });

    // Filtering out reccomendations habing lesser Grade
    cat_objects2 = cat_objects2.filter(function( element ) {
      return element.grade <= searched_object.Grade ;
    });

    // Sorting based on Grade values
    cat_objects2.sort(this.compare)

    // Setting the no of recommendations to max 5
    let siz = cat_objects2.length;
    (siz >= 5) ? this.state.reccomendation_list = cat_objects2.slice(0,6) : this.state.reccomendation_list = cat_objects2.slice(0,siz+1)

  }

  // To be used if needed
  clearFavourites = async () => {
    try {
      await AsyncStorage.removeItem('favourites');
      this.setState({ favourites: [] });
      console.log("cleared favourites: ")
    } catch (e) {
      // error reading value
      console.log("could not clear favourites: ")
    }

  }



  render() {

    const searched = this.state.item;
    let imageName = "";
    let category = "";


    this.state.dataSource.map((value) =>

      category = value["Categories"]

    )
    this.state.dataSource.map((value) =>

      imageName = value["Images"]

    )
    console.log(maxvalue[category]);
    console.log(imageName);

    console.log(searched);

    return (

      //   <Text> Carbon Emissions :{ value["Carbon_Emissions"]} 
      //     Environmental Policy :{ value["Environmental_Policy"]} 
      //     </Text>


      <SafeAreaView style={{ flex: 1 }}>

        <Container>
          {/* <Toolbar>
        {this.state.dataSource.map((value) =>
                
                  <Text style={styles.CardContent}>{value["Categories"]}


                  </Text>
                 
                )
  }

                   

                </Toolbar> */}


          <Header style={{ backgroundColor: "#82b74b", height: 50 }} >
            <Content>
              <View style={styles.row}>
                {/* <Text style={{width: "30%"}}>{value["Categories"]}</Text> */}
                <View style={{ width: "33%", textAlign: 'left', paddingVertical: 10, }}>
                  {this.state.dataSource.map((value) =>

                    <Text style={{ paddingRight: 20, fontSize: 20, color: "white" }}>{value["Categories"]} </Text>

                  )
                  }
                </View>
                <View style={{ width: "33%", alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.setFavourite(this.state.item)}
                    style={{ height: 40, paddingVertical: 5, }}>
                    <FontAwesome name="star" size={30} color="gold" />
                  </TouchableOpacity>
                </View>

                <View style={{ width: "30%", alignItems: 'flex-end', paddingVertical: 5 }}>
                  <TouchableOpacity
                    onPress={() => this.setFavourite(this.state.item)}
                    style={{ height: 40 }}>
                    <AntDesign name="infocirlce" size={30} color="black" />
                  </TouchableOpacity>
                </View>

              </View>
            </Content>
          </Header>

          <Content padder>
            < View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>
                {searched}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

              <Card style={{ alignItems: 'center', height: 210, width: "50%" }}>

                <CardItem cardBody>
                  <Image source={{ uri: imageName }} style={{ height: 210, flex: 1 }} resizeMode="contain" />


                </CardItem>


              </Card>
              <View style={{ width: "50%", flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <Card style={{ height: 100, alignItems: 'center' }}>
                  <CardItem header bordered>
                    <Text style={{ fontSize: 12 }}>Grade</Text>

                  </CardItem>
                  <CardItem bordered>

                    {this.state.dataSource.map((value) =>
                      <Text style={styles.Card_value}> {value["Grade"]}

                      </Text>
                    )
                    }


                  </CardItem>


                </Card>
                <Card style={{ height: 100, alignItems: 'center' }}>
                  <CardItem header bordered>
                    <Text style={{ fontSize: 12 }}>Sustainability Score</Text>

                  </CardItem>
                  <CardItem bordered >
                    {this.state.dataSource.map((value) =>
                      <Text style={styles.Card_value}> {value["Final_sum"]}/{maxvalue[category].Final_sum}

                      </Text>
                    )
                    }


                  </CardItem>


                </Card>
              </View>
            </View>
            <Card style={{ alignItems: 'center', height: 200 }}>
              <CardItem header bordered>
                <Text style={styles.CardContent}>Sustainability Score Details</Text>

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                      <Text style={styles.CardContent}>Carbon Emissions </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.CardContent}>   {value["Carbon_Emissions"]}/{maxvalue[category].Carbon_Emissions} </Text>
                      </View>
                    </View>
                  </Content>
                )
                }
              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                      <Text style={styles.CardContent}>Environmental Policy</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.CardContent}>   {value["Environmental_Policy"]}/{maxvalue[category].Environmental_Policy} </Text>
                      </View>
                    </View>
                  </Content>
                )
                }

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                      <Text style={styles.CardContent}>Labour Conditions </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.CardContent}>   {value["Labour_Conditions"]}/{maxvalue[category].Labour_Conditions} </Text>
                      </View>
                    </View>
                  </Content>
                )
                }

              </CardItem>






            </Card>
            <View>

              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                Check Out These Other Brands</Text>
            </View>

            <View>

              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.reccomendation_list}
                renderItem={this.my_renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                layout={'stack'}
              />

              {/* <Carousel data = {this.state.reccomendation_list}/> */}

            </View>

          </Content>
        </Container>

      </SafeAreaView>
    );
  }

}
export default ResultCard;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255, .5)"
  },
  title: {
    //flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#82b74b",
    paddingVertical: 10
  },
  CardContent: {

    fontSize: 12,
    color: "#000",

  },
  Card_value: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#82b74b",

  },
  grandparent: {
    flex: 1,
    flexDirection: "row",
  },
  parent: {
    flex: 1, // in react-native just flex:1
  },
  child: {



    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },
  child2: {


    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },

  row_zero: {
    flexDirection: "row",


  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
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
    backgroundColor: '#000',
  },
  text: {
    width: '60%'
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#EEEEEE',
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
    flex: 1,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  slide: {
    width: itemWidth,
    height: itemHeight - 50,  // size of the scrollable area
    paddingHorizontal: 10,
    paddingVertical : 10,
},
slideInnerContainer: {
    width: slideWidth -40 , // makes the card smaller
    flex: 1,
    height : height ,
    backgroundColor: 'white',
    // margin: 10, // Around card and the slide area
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1.0, height: 1.0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
}
});