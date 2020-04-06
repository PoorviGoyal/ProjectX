import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Div, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import CameraPage from './screens/CameraScreen';
import something from './categoriesIn.json';
import HomeActivity from './HomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';


const Tabs = 
createMaterialTopTabNavigator({
  HomeActivity: { screen: HomeActivity },
  SettingsScreen: { screen: SettingsScreen }
},
  {
    tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#ffffff',
    inactiveBackgroundColor: '#353539',
    activeBackgroundColor: '#353539',
    showIcon: false,
    scrollEnabled:true,
    indicatorStyle: {
      borderBottomColor: '#ffffff',
      borderBottomWidth: 2,
    },
    labelStyle:{
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style:{
      backgroundColor: '#353539',
    },
    tabStyle: {
      width:90,
    }
  },
}


);


const TabPages = createAppContainer(createStackNavigator({
  Tab:{ screen:Tabs,
      navigationOptions:()=>({
          header:null
      }),},
  CameraPage: { screen: CameraPage }
},
));

export default TabPages;
// const AppNavigator = createStackNavigator({
//   HomeActivity:HomeActivity,
//   CameraPage:CameraPage
// });

// function HomeScreen() {
//   return (
//     <SafeAreaView style= { { flex : 1 } }>
//     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//       {something.map((postDetail, index) => {
//         return <Text> {postDetail.Categories} </Text>
//       })}

//     </View>
//     </SafeAreaView >
//   );
// }

function SettingsScreen() {
  return (
    <SafeAreaView style= { { flex : 1 } }>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This will be changed to History tab soon!!</Text>
    </View>
    </SafeAreaView >
  );
}

// // const Tab = createBottomTabNavigator();

// const Tab = createMaterialTopTabNavigator();

// export default function App() {
  
//   return (
    
//     <SafeAreaView style= { { flex : 1 } }>
    
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBarPosition = 'bottom'
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color}) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-folder' : 'ios-folder';
//             }
//             else if (route.name === 'Camera') {
//               iconName = focused ? 'ios-camera' : 'ios-camera';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size = { 24 } color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//           showIcon : true
//         }}
      
//       >
//         <Tab.Screen name="Home" component={HomeActivity} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//         <Tab.Screen name="Camera" component={CameraPage} />
//       </Tab.Navigator>
 
//     </NavigationContainer>
//     </SafeAreaView>
   
//   );
// }