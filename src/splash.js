import React, {Component} from 'react';
import {Dimensions ,Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';

export default class Splash extends Component<Props> {
  constructor(Props){
    super(Props);
    this.state ={
      progress: 20,
    }
  }
  //---------
  componentDidMount(){
    setTimeout(() => {
      const {navigate} = this.props.navigation;
      navigate('Home');
    },2000);
  }
  //----------
  render()
  {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/splash.jpg')} style={styles.backgroundImage} resizeMode='stretch'>
        </ImageBackground>
      </View>
    );
  }
}
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent : 'center',
    alignItems : 'center',
  },
  backgroundImage: {
    width : width *1,
    height: width * 1.75,
    resizeMode: 'contain', // or 'stretch',
    justifyContent: 'center',
  },
});
