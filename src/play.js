import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Dimensions,
  ImageBackground
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

function ProgressBar() {
  const progress = useTrackPlayerProgress();
  const { position, bufferedPosition, duration } = useTrackPlayerProgress()
  var {height, width} = Dimensions.get('window');

  return (
    <View style={styles.progress}>
      <View style={{ flex: progress.position, backgroundColor: "#FFF" , marginTop : width * 0.03}} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: "#ff3334",
        }}
      />
    </View>
  );
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState("");
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist, artwork } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback } = props;

  var middleButtonText = <Image source={require('./img/Play.png')} style={styles.controlIcon}/>;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = <Image source={require('./img/pause.png')} style={styles.controlIcon}/>;
  }
  const { position, bufferedPosition, duration } = useTrackPlayerProgress()
  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{ uri: trackArtwork }} />
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
      <Text style={{color:'#FFF'}}>Track progress: {position} seconds out of {duration} total</Text>
      <Text style={{color:'#FFF'}}>Buffered progress: {bufferedPosition} seconds buffered out of {duration} total</Text>
      <ProgressBar />

      <View style={styles.controls}>
        <ControlButton title={<Image source={require('./img/Previous.png')} style={styles.controlIcon}/>} onPress={onPrevious} />
        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
        <ControlButton title={<Image source={require('./img/Next.png')} style={styles.controlIcon}/>} onPress={onNext} />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: "100%",
    flex : 1,
    alignItems: "center",
  },
  cover: {
    width: width * 0.8,
    height: width * 0.8,
    marginTop: width * 0.1,
    backgroundColor: "#000",
    borderRadius : width * 0.4,
    marginBottom : width * 0.2
  },
  progress: {
    height: width * 0.03,
    width: "90%",
    marginTop: width * 0.03,
    flexDirection: "row",
    color : '#ff3334',
  },
  title: {
    marginTop: width * 0.01,
    marginBottom: width * 0.01,
    color : '#FFF',
    fontSize : RFPercentage(2.6)
  },
  artist: {
    fontWeight: "bold",
    color : '#FFF',
    fontSize : RFPercentage(2.4),
    marginBottom: width * 0.05,
  },
  controls: {
    flexDirection: "row",
    color : '#000',
    justifyContent : 'center',
    height : width * 0.3,
    marginTop : width * 0.1
  },
  controlButtonContainer: {
    flex: 1,
    justifyContent : 'center'
  },
  controlButtonText: {
    textAlign: "center",
    height : width * 0.3,
    justifyContent : 'center'
  },
  playIcon : {
    width : width * 0.1,
    height : width * 0.1,
    resizeMode: 'contain',
    justifyContent : 'center'
  },
  controlIcon : {
    width : width * 0.1,
    height : width * 0.1,
    resizeMode: 'contain',
    justifyContent : 'center'
  }
});
