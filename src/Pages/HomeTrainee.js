import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Switch, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchModal from '../Components/SerchModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import Map from '../Components/Map';
import GenderButton from '../Components/genderButton';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Font } from 'expo';

const MALE_AVATAR = require('../../Images/MaleAvatar.png');
const FEMALE_AVATAR = require('../../Images/FemaleAvatar.png');
export default class HomeTrainee extends Component {
  state = {
    isSwitchOn: false,
    searchMode: false,
    latitude: 0,
    longitude: 0,
    coupleResults: [],
    groupResults: [],
    status: 0,
    fontLoaded: false
  };


  switchChange() {
    this.setState({ isSwitchOn: !this.state.isSwitchOn })
    console.warn('hi');
  }



  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({
      fontLoaded: true,
    });
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
      <View style={{ flex: 1, flexDirection: 'column', width: SCREEN_WIDTH }}>
        {this.state.fontLoaded ?
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


            {this.state.isSwitchOn ?
              <View style={{ flex: 4, flexDirection: 'column', marginBottom: 15 }}>

                <View style={styles.partnerPreferencesStyle}>
                  <Text style={style = styles.partnersGenderHeadline}>
                    Looking for
                    </Text>
                  <View style={styles.partnerPreferencesContainerStyle} >


                    <GenderButton style={styles.lookingFor}
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Male')
                          this.setState({ partnerGender: 'Male' })
                        }
                      }
                      selected={this.state.selectedType === 'Male'}
                    />
                    <GenderButton style={styles.lookingFor}
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Male')
                          this.setState({ partnerGender: 'Male' })
                        }
                      }
                      selected={this.state.selectedType === 'Male'}
                    />
                    <GenderButton style={styles.lookingFor}
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Male')
                          this.setState({ partnerGender: 'Male' })
                        }
                      }
                      selected={this.state.selectedType === 'Male'}
                    />
                    <GenderButton style={styles.lookingFor}
                      image={FEMALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Female')
                          this.setState({ partnerGender: 'Female' })
                        }
                      }
                      selected={this.state.selectedType === 'Female'}
                    />

                  </View>
                </View>
              </View> : <View></View>}

            <View style={{ flex: 6, }}>
              {this.state.status == 1 ?
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                  <View style={{ flex: 1, position: 'absolute', zIndex: 10000, width: SCREEN_WIDTH - 30 }}>

                    <GooglePlacesAutocomplete style={{ flex: 1, }}

                      //MODE_OVERLAY={true}
                      placeholder="Search"
                      minLength={1} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'search'}
                      listViewDisplayed="false"
                      styles={{
                        listViewDisplayed:{ backgroundColor:'blue'}
                        
                      }
                      }
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


                  </View>

                  <Map style={{ zIndex: 0 }} coupleResults={this.state.coupleResults} groupResults={this.state.groupResults} longitude={this.state.longitude} latitude={this.state.latitude}></Map>

                </View> : null}
            </View>


          </View> : null}
        {/* {this.state.isSwitchOn ? <SearchModal></SearchModal> : <View></View>} */}
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
  },
  partnerPreferencesStyle: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  partnersGenderHeadline: {
    flex: 1,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    //marginLeft: 20,
    //marginTop: 30
  },
  partnerPreferencesContainerStyle: {
    flex: 3,
    flexDirection: 'row',
    marginTop: -50
    //marginRight:150

  },
  lookingFor: {
    margin: 15
  }
})