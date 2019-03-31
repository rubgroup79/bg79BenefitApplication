import React from 'react';
import { Text, View, Dimensions, Image, StyleSheet} from 'react-native';
import { MapView } from 'expo';
const { Marker } = MapView;
_Latitude = 0;
_Longitude = 0;

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class LocationPage extends React.Component {
  static navigationOptions = {
    title: 'LOCATION',
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    }
    this.show = this.show.bind(this);
  }



  show() {
    console.warn('show');
    return this.props.couple_results.map((data) => {
      return (
        <Marker
          coordinate={{
            latitude: data.Latitude,
            longitude: data.Longitude
          }}
        // title={result.FirstName}
        // description={result.Age}
        //image={require('../assets/icon.png')}
        />
      )
    })

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
              <Marker
                coordinate={{
                  latitude: this.props.latitude,
                  longitude: this.props.longitude
                }}
                title='my place:)'
                description='here i am'
              //image={require('../assets/icon.png')}
              />
              {this.props.coupleResults == null ? alert('no results') : this.props.coupleResults.map(data => (
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
              {this.props.groupResults == null ?alert('no results') : this.props.groupResults.map(data => (
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
              {/* {this.props.couple_results && this.show()} */}
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
        width:SCREEN_WIDTH,
  
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