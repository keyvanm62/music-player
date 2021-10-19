import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Slider,
  AppRegistry,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  AppState
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title , Content } from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import TrackPlayer, {ProgressComponent}  from 'react-native-track-player';
import { useTrackPlayerProgress } from 'react-native-track-player';
import { DrawerActions , NavigationEvents } from '@react-navigation/native';
TrackPlayer.setupPlayer();

import playlistDataOne from "./data/playlistOne.json";
import playlistDataTwo from "./data/playlistTwo.json";

export default class Player extends React.Component{
  constructor(Props){
    super(Props);
    this.state ={
      album_id : 0,
      data : '',
      AudioStatus: true,
      CurrentPlayTitle : '',
      CurrentPlayArtist : '',
      CurrentPlayImage : require('./img/logo.png'),
      Volume : 30,
      durationTime : 0,
      position : 0,
    }

  }

  formatTime(seconds) {
    if(this.state.SliderDisable){
      this.TrackSlider();
    }
    return seconds > 3600
    ?
      [
        parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ].join(":").replace(/\b(\d)\b/g, "0$1")
    :
      [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ].join(":").replace(/\b(\d)\b/g, "0$1")
  }

  componentWillMount() {
    this.UpdateTrack();
  }

  forceUpdate(){
    this.setState({ CurrentPlayTitle: '' });
    this.setState({ durationTime: 0 });
    this.setState({ position: 0 });
    this.setState({ CurrentPlayArtist: '' });
    this.setState({ CurrentPlayImage: require('./img/logo.png') });
    const id = this.props.route.params.id;
    this.setState({ album_id: id });
    if(id == 1)
    {
      this.setState({ data: playlistDataOne });
      TrackPlayer.destroy();
    }
    else {
      this.setState({ data: playlistDataTwo });
      TrackPlayer.destroy();

    }

    this.setState({ AudioStatus: true });
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'focus',
      payload => {
        this.forceUpdate();
        this.UpdateTrackUI();
      }
    );

    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ]
    });
    this.UpdateTrackUI();
  }

  togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      TrackPlayer.reset();
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(this.state.data);
      TrackPlayer.play();
    } else {
      if(await TrackPlayer.getState() === 2){
        TrackPlayer.play();
      }else{
        TrackPlayer.pause();
      }
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }

  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
      TrackPlayer.stop();
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }

  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      this.UpdateTrack();
    } catch (error) {
      console.log(error);
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }

  UpdateTrack = async () => {
    var current_id = await TrackPlayer.getCurrentTrack();
    if(current_id){
      var track = await TrackPlayer.getTrack(current_id);
      this.setState({
        CurrentPlayTitle : track.title,
        CurrentPlayArtist : track.artist,
        CurrentPlayImage : {uri: track.artwork},
        durationTime : {uri: track.duration},
      });
    }else{
      this.setState({
        CurrentPlayTitle : data[0].title,
        CurrentPlayArtist : data[0].artist,
        CurrentPlayImage : {uri: data[0].artwork},
        durationTime : {uri: data[0].duration},
      });
    }
  }

  UpdateTrackUI = async () => {
    if(await TrackPlayer.getState() == 2){
      this.setState({
        AudioStatus: true
      });
    } else if(await TrackPlayer.getState() == 3){
      this.setState({
        AudioStatus: false
      });
    } else if(await TrackPlayer.getState() == 6){
      this.setState({
        AudioStatus: false
      });
    }
  }

	render(){
    const {navigate} = this.props.navigation;
		return(
      <Container style={styles.container}>
		    <ImageBackground source={require('./img/playerbg.jpg')} style={styles.backgroundImage} resizeMode='stretch'>
          <Header transparent>
            <Left>
              <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={require('./img/menu.png')} style={styles.menu} />
              </Button>
            </Left>
            <Body>
              <Title style={{fontSize : RFPercentage(2)}}></Title>
            </Body>
            <Right>
            <Button transparent onPress={() => console.log(this.state.album_id)}>
              <Image source={require('./img/Search.png')} style={styles.menu} />
            </Button>
            </Right>
          </Header>
          <View style={{flex: 2}}>
              <View style={{justifyContent:'center', alignItems:'center', flex: 6 , marginTop : width * 0.03}}>
                  <Image source={this.state.CurrentPlayImage} style={{width: width * 0.6, height: width * 0.6 , borderRadius : width * 0.6}}/>
              </View>
              <View style={{flex: 1, padding: width * 0.03 , marginTop : width * 0.07}}>
                  <Text style={{fontSize: RFPercentage(3), fontWeight: 'bold', color:'#FFF' , textAlign : 'center'}}>{this.state.CurrentPlayTitle}</Text>
                  <Text style={{fontSize: RFPercentage(2.8), color:'#183965' , textAlign : 'center' , marginTop : width * 0.02}}>{this.state.CurrentPlayArtist}</Text>
              </View>
          </View>
          <TrackStatus />
          <View style={{justifyContent:'center', flex: 1, alignItems:'center'}}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.skipToPrevious()} style={{padding: width * 0.03}} activeOpacity={1}>
                    <Image source={require('./img/Previous.png')} style={{width: width * 0.1, height: width * 0.1}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.togglePlayback()} style={{padding: width * 0.03}} activeOpacity={1}>
                    <Image source={this.state.AudioStatus ? require('./img/Play.png') : require('./img/pause.png')} style={{width: width * 0.15, height: width * 0.15}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.skipToNext()} style={{padding: width * 0.03}} activeOpacity={1}>
                    <Image source={require('./img/Next.png')} style={{width: width * 0.1, height:width * 0.1}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', justifyContent:'center', alignItems:'center', flexDirection: 'row' , marginTop : width * 0.03}}>
              <Text style={{color: 'white',backgroundColor:'transparent',width:width * 0.05,textAlign:'center',fontSize:RFPercentage(2) , color : '#FFF'}}>{this.state.Volume}</Text>
              <Slider
                minimumValue          = {0}
                maximumValue          = {100}
                thumbTintColor        = '#ff3334'
                minimumTrackTintColor = '#ff3334'
                maximumTrackTintColor = '#808080'
                step                  = {1}
                onValueChange ={ val=>{
                  this.setState({Volume: val})
                  TrackPlayer.setVolume(val / 100)
                }}
                onSlidingComplete={ val=>{
                  this.setState({Volume: val})
                  TrackPlayer.setVolume(val / 100)
                }}
                value={this.state.Volume}
                style={{width: '70%' , fontSize : RFPercentage(2) , color : '#FFF'}}
              />
              <Text style={{fontSize : RFPercentage(2) , color : '#FFF'}}>100</Text>
            </View>
          </View>
        </ImageBackground>
      </Container>
		);
  }
}


export class TrackStatus extends ProgressComponent {
    state = {
      duration: 0,
      isSeeking: false,
      position : 0,
      SliderDisable : true
    }
    formatTime(seconds) {
      if(this.state.SliderDisable){
        this.TrackSlider();
      }
      return seconds > 3600
      ?
        [
          parseInt(seconds / 60 / 60),
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
      :
        [
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
    }

    componentDidMount(){
      TrackPlayer.getDuration().then(
        duration=>this.setState({duration}),
      TrackPlayer.getPosition().then(res=> console.log('res ',res))
      )
      TrackPlayer.getPosition().then(
        position=>this.setState({position}),

      )
    }

    TrackSlider = async () => {
      if(await TrackPlayer.getState() == 2){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 3){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 0){
        this.setState({
          SliderDisable: true
        });
      }
    }

    render () {
      return (
        <View>
          <View style={{flexDirection:'row',paddingHorizontal: 10,alignItems:'center'}}>
            <Text style={{color: 'white',backgroundColor:'transparent',width:40,textAlign:'center',fontSize:12}}>
              {/* { this.state.isSeeking ? this.formatTime(this.seek) : this.formatTime(this.state.position) } */}
              {this.formatTime(this.state.position)}
            </Text>
            <Slider
              minimumValue          = {0}
              maximumValue          = {this.state.duration}
              thumbTintColor        = '#FFFFFF'
              minimumTrackTintColor = '#000000'
              maximumTrackTintColor = '#808080'
              step                  = {1}
              disabled              = {this.state.SliderDisable}
              onValueChange ={ val=>{
                TrackPlayer.pause();
                this.seek = val;
                this.setState({isSeeking:true})
              }}
              onSlidingComplete={ val=>{
                TrackPlayer.play();
                this.setState(()=> {
                  TrackPlayer.seekTo(this.seek);
                  this.position = this.seek;
                })
              }}
              //value={this.state.isSeeking ? this.seek : this.state.position}
              value={this.state.position}
              style={{width: '75%'}}
            />
            <Text style={{color:'#FFF'}}>{this.formatTime(this.state.duration)}</Text>
          </View>
        </View>
      )
    }
  }
  AppRegistry.registerComponent('Player', () => Player);

  AppRegistry.registerHeadlessTask('TrackPlayer', () =>
  module.exports = async (data) => {
    if(data.type === 'playback-state') {
        // Update the UI with the new state
    } else if(data.type === 'remote-play') {
        _player = false;
        TrackPlayer.play();
    } else if(data.type === 'remote-pause') {
        TrackPlayer.pause();
        _player = true;
    } else if(data.type === 'remote-stop') {
        TrackPlayer.stop();
    } else if(data.type === 'remote-seek') {
        console.warn(data.position);
        TrackPlayer.seekTo(data.position);
    } else if(data.type === 'remote-next') {
        TrackPlayer.skipToNext();
    } else if(data.type === 'remote-previous') {
        TrackPlayer.skipToPrevious();
    }
  }
);



  const {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    player: {
      marginTop: 0
    },
    state: {
      marginTop: 20,
      color : '#FFF'
    },
    backgroundImage: {
      width : width *1,
      height: width * 1.75,
      resizeMode: 'contain', // or 'stretch',
      justifyContent: 'center',
    },
    menu: {
      width : width * 0.04,
      height : width * 0.04,
      resizeMode: 'contain',
    },
  });
