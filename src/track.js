import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title , Content } from 'native-base';
import { DrawerActions } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import playlistData from "./data/playlist.json";
import localTrack from "./music/music.mp3";

export default class Track extends Component {
  openMusic(id){
    const {navigate} = this.props.navigation;
    navigate('Player' , {
      id : id ,
    });
  }
  //-----------
  async start(){
      // Set up the player
      TrackPlayer.registerPlaybackService(() => require('./m.js'));
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ]
      });


      // Start playing it
      //await TrackPlayer.play();
  };
  //-----------
  componentDidMount() {
    this.start();
    this.togglePlayback();
  }
  //-----------
  async togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlistData);

      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }
  //-----------
  render() {
    const {navigate} = this.props.navigation;
    var {height, width} = Dimensions.get('window');
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Left>
            <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={require('./img/menu.png')} style={styles.menu} />
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize : RFPercentage(2)}}>Collections & Albums</Title>
          </Body>
          <Right>
          <Button transparent onPress={() => console.log('he')}>
            <Image source={require('./img/Search.png')} style={styles.menu} />
          </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.parentAlbums}>
          <TouchableOpacity onPress={() => this.togglePlayback()} style={styles.albums}>
            <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
              <Image source={require('./img/pop.jpg')} style={styles.albumImage} />
            </View>
            <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
              <View style={{width : '100%'}}>
                <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
              </View>
              <View style={{width : '100%'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>POP</Text>
              </View>
            </View>
            <View style={{width : '20%' , justifyContent : 'center'}}>
              <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
            </View>
          </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container : {
    backgroundColor : '#061326'
  },
  menu: {
    width : width * 0.04,
    height : width * 0.04,
    resizeMode: 'contain',
  },
  parentAlbums : {
    width : '100%',
    flexDirection : 'column',
    backgroundColor : '#092141'
  },
  albums : {
    width : '100%',
    color:'#FFF',
    height: width * 0.15,
    flexDirection : 'row',
    justifyContent : 'center',
    borderBottomColor: '#14264b',
    borderBottomWidth: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // or 'stretch',
    justifyContent: 'center',
  },
  albumImage : {
    width : width * 0.08,
    height : width * 0.08,
    resizeMode: 'contain',
    borderRadius : width * 0.4,
    overflow : 'hidden'
  }
});
