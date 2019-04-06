import React from 'react';
import { Text, View, Dimensions, Image, StyleSheet} from 'react-native';
import { MapView, MapMarkerWaypoint } from 'expo';
const { Marker } = MapView;
_Latitude = 0;
_Longitude = 0;

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class LocationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    }

  }


  render() {
    return (
      <View style={styles.container}>
       
            <MapView
              style={{
                flex: 1,
                width: Dimensions.get('window').width - 30
              }}

              region={{
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: 0.01322,
                longitudeDelta: 0.01321,
              }}
           
             
            >
              <MapView.Marker
               coordinate={{
                latitude: this.props.latitude,
                longitude: this.props.longitude
              }}
              // title='my place:)'
              // description='here i am'
              >
               
            <MapView.Callout
      
            style={{ flex: -1, position: 'absolute', width:100, height:80}}
            tooltip={false} >
          <View style={{flex:1, flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
            <Text>That's you</Text>
          <Image
                source={require("../../Images/TrainerAvatar.png")}
                style={{width:50, height:50}}
              />
          </View>
            </MapView.Callout>
           
                </MapView.Marker>
        
              {this.props.coupleResults.map(data => (
                <Marker
                  coordinate={{
                    latitude: data.Latitude,
                    longitude: data.Longitude
                  }}
                  title={data.FirstName + ' ' + data.LastName + ', ' + data.Age.toString()}
                  description={(Math.floor(data.Distance * 10) / 10).toString() + ' KM away from you'}
                //image={require('../assets/icon.png')}
                />
              )
              )}
              {this.props.groupResults.map(data => (
                <Marker
                  coordinate={{
                    latitude: data.Latitude,
                    longitude: data.Longitude
                  }}
                  title={'Group'}
                  description={'result'}
                //image={require('../assets/icon.png')}
                />
              )
              )}

            </MapView>

      </View>
    );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        marginTop:-14,
        width:SCREEN_WIDTH+20,
  
    },

    textBig: {
        fontSize: 35,
        color: 'red',
        margin: 10
    },
    textMedium: {
        fontSize: 30,
        color: 'blue'
    },
    Button: {
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 15
    },
    TxtInp: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 15,
        fontSize:30,
        padding:5,
        borderRadius:5
    },
    Err:{
        color:'red',
        margin:15,
        
    },
    lblText:{
        fontSize:30
    }
});