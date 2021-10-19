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

export default class Home extends Component {
  openMusic(id){
    const {navigate} = this.props.navigation;
    navigate('Player' , {
      id : id ,
    });
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
            <TouchableOpacity onPress={() => this.openMusic(1)} style={styles.albums}>
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
            <TouchableOpacity onPress={() => this.openMusic(2)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/rock.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Rock & Metal</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(3)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/dance.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Dance</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(4)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/rap.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Rap & Hip Hop</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(5)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/relax.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Relaxing</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(6)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/persian.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Persian Sonati</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(7)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/trance.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Trance & Electronics</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(8)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/gilan.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Gilaki</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(9)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/gher.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Persian Dance</Text>
                </View>
              </View>
              <View style={{width : '20%' , justifyContent : 'center'}}>
                <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(1.8)}}>20 Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMusic(10)} style={styles.albums}>
              <View style={{width : '20%' , alignItems : 'center' , justifyContent : 'center'}}>
                <Image source={require('./img/kurd.jpg')} style={styles.albumImage} />
              </View>
              <View style={{width : '60%' , justifyContent : 'center' , flexDirection : 'column'}}>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#3e6eaf' , textAlign : 'left' , fontSize : RFPercentage(1.6)}}>Collection</Text>
                </View>
                <View style={{width : '100%'}}>
                  <Text style={{color:'#FFF' , textAlign : 'left' , fontSize : RFPercentage(2.2)}}>Kurdish</Text>
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
