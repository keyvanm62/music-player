import * as React from 'react';
import { Button, View , Image , Dimensions} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Spalsh from './src/splash';
import Home from './src/home';
import Browse from './src/home';
import Radio from './src/home';
import Setting from './src/home';
import Player from './src/music';
import Track from './src/track';

const Drawer = createDrawerNavigator();

export default function App() {
  var {height, width} = Dimensions.get('window');
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Spalsh"
        activeTintColor="#FFF"
        activeBackgroundColor="#FFF"
        labelStyle={{color:'#FFF'}}
        drawerStyle={{
          backgroundColor : '#fa3839',
          color: '#FFF',
        }}
        drawerContentOptions={{
          activeTintColor: '#FFF',
          inactiveTintColor : '#FFF',
          itemStyle: { marginVertical: 5 },
        }}

      >
        <Drawer.Screen name="Spalsh" component={Spalsh}
          options={{
            title: '',
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('./src/img/logo.png')}
                style={{
                  width : width * 0.09,
                  height : width * 0.09,
                  color:'#FFF',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('./src/img/Activity.png')}
                style={{
                  width : width * 0.04,
                  height : width * 0.04,
                  color:'#FFF',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Browse"
          component={Browse}
          options={{
            title: 'Browse',
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('./src/img/Browse.png')}
                style={{
                  width : width * 0.04,
                  height : width * 0.04,
                  color:'#FFF',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Radio"
          component={Radio}
          options={{
            title: 'Radio',
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('./src/img/Radio.png')}
                style={{
                  width : width * 0.04,
                  height : width * 0.04,
                  color:'#FFF',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={Setting}
          options={{
            title: 'Setting',
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('./src/img/Settings.png')}
                style={{
                  width : width * 0.04,
                  height : width * 0.04,
                  color:'#FFF',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Player"
          component={Player}
          options={() => ({
            drawerLabel: () => null,
            title: undefined,
            drawerIcon: () => null,
          })}
        />
        <Drawer.Screen
          name="Track"
          component={Track}
          options={() => ({
            drawerLabel: () => null,
            title: undefined,
            drawerIcon: () => null,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
