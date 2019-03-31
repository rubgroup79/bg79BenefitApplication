import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Switch, StyleSheet, ScrollView } from 'react-native';
import SearchModal from '../Components/SerchModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import Map from '../Components/Map';
export default class HomeTrainee extends Component {
  state = {
    isSwitchOn: false,
    searchMode: false,
    latitude: 0,
    longitude: 0,
    coupleResults: [],
    groupResults: [],
    status: 0,
  };


  switchChange() {
    this.setState({ isSwitchOn: !this.state.isSwitchOn })
    console.warn('hi');
  }



  UNSAFE_componentWillMount() {
    //Code = this.props.navigation.getParam('UserCode', 0);
    //() => this.setState({ UserCode: Code });
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const output =
          'latitude=' + position.coords.latitude +
          '\nlongitude=' + position.coords.longitude +
          '\naltitude=' + position.coords.altitude +
          '\nheading=' + position.coords.heading +
          '\nspeed=' + position.coords.speed;

        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude, status: 1 });// +  Math.random()/1000,

      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

    );
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} >

        <View style={styles.container}>
          <Switch
            trackColor={{ true: 'rgba(213, 100, 140, 1)' }}
            style={styles.switch}
            onValueChange={() => this.setState({ isSwitchOn: !this.state.isSwitchOn })}
            value={this.state.isSwitchOn}
          />
          <View style={{ flex: 1, marginLeft: 45 }}>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
              }}
              size="medium"
            />
            <Badge
              status="error"
              containerStyle={{ position: 'absolute', top: -3, right: 35 }}
              value='8'
            />
          </View>



          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
              }}
              size="medium"
            />

            <Badge
              status="success"
              containerStyle={{ position: 'absolute', top: -3, right: 35 }}
              value='8'
            />
          </View>



          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
              }}
              size="medium"
            />

            <Badge
              status="primary"
              containerStyle={{ position: 'absolute', top: -3, right: 35 }}
              value='8'
            />
          </View>

        </View>

        <View style={{ flex: 7, flexDirection: "column", }}>
          <GooglePlacesAutocomplete style={{ flex: 1, zIndex: 10000, position:'absolute' }}
            //MODE_OVERLAY={true}
            placeholder="Search"
            minLength={1} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="false"
            fetchDetails={true}
            renderDescription={row => row.description || row.formatted_address || row.name}
            onPress={(data, details = null) => {
              this.setState({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng });
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{

              key: 'AIzaSyB_OIuPsnUNvJ-CN0z2dir7cVbqJ7Xj3_Q',
              language: 'en', // language of the results
              //types: '(regions)', // default: 'geocode',

            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },

            }}
            enablePoweredByContainer={true}
            currentLocation={true}
            currentLocationLable='Current Location'

            nearbyPlacesAPI="GoogleReverseGeocoding"

            GooglePlacesSearchQuery={{

              rankby: 'distance',
              types: 'food',
            }}
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
              'street_address'
            ]}

            debounce={200}
          />
          <View style={{ flex: 6, }}>
            {this.state.status == 1 ?
              <Map style={{ zIndex: 0 }} coupleResults={this.state.coupleResults} groupResults={this.state.groupResults} longitude={this.state.longitude} latitude={this.state.latitude}></Map>
              : null}
          </View>

        </View>

        {this.state.isSwitchOn ? <SearchModal></SearchModal> : <View></View>}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 40,
    marginLeft: 15,
    height: 15,
  },
  switch: {
    marginTop: 8,
  }
})