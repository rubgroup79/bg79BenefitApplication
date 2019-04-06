import React, { Component } from 'react';
import { Text, View, Switch, StyleSheet, Dimensions, LayoutAnimation, ActivityIndicator, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, Badge, Divider } from 'react-native-elements';
import Map from '../Components/Map';
import GenderButton from '../Components/genderButton';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Icon1 from 'react-native-vector-icons/Feather';
import TimePickerNew from '../Components/TimePicker';
import moment from 'moment';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MALE_AVATAR = require('../../Images/MaleAvatar.png');
const FEMALE_AVATAR = require('../../Images/FemaleAvatar.png'); 3
const APPROVED_REQUESTS = require('../../Images/ApprovedRequests.png');
const PENDING_REQUESTS = require('../../Images/PendingRequests.png');
const FUTURE_TRAININGS = require('../../Images/FutureTrainings.png');
var hours_now = new Date().getHours();
var minutes_now = new Date().getMinutes();
var timeNow = hours_now + ":" + minutes_now;


export default class HomeTrainee extends Component {
  constructor(props) {

    super(props);

    this.state = {
      status: 0,
      fontLoaded: false,
      isSwitchOn: false,
      isDateTimePickerVisible: false,
      latitude: 0,
      longitude: 0,
      withTrainer: false,
      withPartner: false,
      groupWithTrainer: false,
      groupWithPartners: false,
      startTime: '10:00',
      endTime: '10:00',
      //startTime: (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),
      //endTime: (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),
      coupleResults: [],
      groupResults: [],
      
    };

    this.onConfirmStartTime = this.onConfirmStartTime.bind(this);
  }

  boolToInt(b) {
    if (b == true)
      return 1;
    else return 0;
  }

  onConfirmStartTime = (hour, minute) => {
    this.state.endTimePickerDisabled= false;
     start=hour+":"+minute;
      this.setState({ startTime: moment(new Date()).format('YYYY-MM-DD')+" " + start +":00.000"});
      
  }

  onConfirmEndTime = (hour, minute) => {
    this.state.endTimePickerDisabled= false;
    end=hour+":"+minute;
    this.setState({ endTime: moment(new Date()).format('YYYY-MM-DD')+" " +end+":00.000"});
  }

  switchChange() {
    this.setState({ isSwitchOn: !this.state.isSwitchOn })

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
    this.getCurrentLocation();
  }

  setPartnerTraining = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ withPartner: !this.state.withPartner });

  setTrainerTraining = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ withTrainer: !this.state.withTrainer });

  setPartnersGroupTraining = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ groupWithPartners: !this.state.groupWithPartners });

  setTrainerGroupTraining = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ groupWithTrainer: !this.state.groupWithTrainer });

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

  // setTime = () => {
  //   let hours_now = new Date().getHours();
  //   let minutes_now = new Date().getMinutes();
  //   let timeNow = hours_now + ":" + minutes_now;
  //   let dayStart = new Date();
  //   let dayEnd = new Date();

  //    if (this.state.startTime < timeNow) {
  //     dayStart = moment(dayStart).add(1, 'day').format('YYYY-MM-DD');
  //     dayEnd = moment(dayEnd).add(1, 'day').format('YYYY-MM-DD');
  //   }

  //   else if (this.state.endTime < timeNow) {
  //     dayStart = moment(dayStart).add(0, 'day').format('YYYY-MM-DD');
  //     dayEnd = moment(dayEnd).add(1, 'day').format('YYYY-MM-DD');
  //   }

  //   else {
  //     dayStart = moment(dayStart).add(0, 'day').format('YYYY-MM-DD');
  //     dayEnd = moment(dayEnd).add(0, 'day').format('YYYY-MM-DD');
  //   }

  //   this.setState({ startTime: (dayStart + ' ' + this.state.startTime+ ':00.000').toString() });
  //   this.setState({ endTime: (dayEnd + ' ' + this.state.endTime + ':00.000').toString() });
    
  //   return true;
  // }

  search() {
    if (this.state.startTime < this.state.endTime) {
      var OnlineDetails = {
        UserCode: 1,
        //UserCode: this.props.navigation.getParam('userCode', '0'),
        Latitude: this.state.latitude,
        Longitude: this.state.longitude,
        StartTime: this.state.startTime,
        EndTime: this.state.endTime,
        WithTrainer: this.boolToInt(this.state.withTrainer),
        WithPartner: this.boolToInt(this.state.withPartner),
        GroupWithTrainer: this.boolToInt(this.state.groupWithTrainer),
        GroupWithPartners: this.boolToInt(this.state.groupWithPartners),
      };
  
      fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/InsertOnlineTrainee', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(OnlineDetails),
      })
        .then(res => res.json())
        .then(response => {
          if (response.length==0) alert ('no results')
           else this.setState({ coupleResults: response });
        })

        .catch(error => console.warn('Error:', error.message));

      if (this.state.groupWithTrainer || this.state.groupWithPartners) {
        fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/SearchGroups', {

          method: 'POST',
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(OnlineDetails),
        })
          .then(res => res.json())
          .then(response => {
            this.setState({ groupResults: response });
          })

          .catch(error => console.warn('Error:', error.message));
      }

    }
    else alert('Start time cannot be before end time');

  }


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
                  source={
                    PENDING_REQUESTS
                  }
                  size="medium"
                />

                <Badge
                  status="warning"
                  containerStyle={{ position: 'absolute', top: -3, right: 35 }}
                  value='8'
                />

              </View>

              <View style={{ flex: 1 }}>

                <Avatar
                  rounded
                  source={
                    APPROVED_REQUESTS
                  }
                  size="medium"
                />

                <Badge
                  status="primary"
                  containerStyle={{ position: 'absolute', top: -3, right: 35 }}
                  value='8'
                />

              </View>

              <View style={{ flex: 1 }}>

                <Avatar
                  rounded
                  source={
                    FUTURE_TRAININGS
                  }
                  size="medium"
                />

                <Badge
                  status="success"
                  containerStyle={{ position: 'absolute', top: -3, right: 35 }}
                  value='8'
                />

              </View>

            </View>

            <View >

              <Divider style={styles.dividerStyle}></Divider>

            </View>


            {this.state.isSwitchOn ?
              <View style={{ flex: 4, flexDirection: 'column', marginBottom: 15, marginTop: 10 }}>

                <View style={styles.trainingsPreferencesStyle}>

                  <Text style={style = styles.trainingsHeadline}>
                    Looking for
                    </Text>
                  {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

                    <Text style={{ flex: 1 }}>Couple</Text>

                    <Text style={{ flex: 1 }}>Group</Text>

                  </View> */}
                  <View style={styles.trainingsPreferencesContainerStyle} >

                    <GenderButton style={{ margin: 10 }}
                      label="Partner"
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setPartnerTraining();
                        }
                      }
                      selected={this.state.withPartner == true}
                    />

                    <GenderButton style={{ margin: 10 }}
                      label="Trainer"
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setTrainerTraining();
                        }
                      }
                      selected={this.state.withTrainer == true}
                    />

                    <GenderButton style={{ margin: 10 }}
                      label="Partners"
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setPartnersGroupTraining();
                        }
                      }
                      selected={this.state.groupWithPartners == true}
                    />

                    <GenderButton style={{ margin: 10 }}
                      label="Partners & Trainer"
                      image={FEMALE_AVATAR}
                      onPress={
                        () => {
                          this.setTrainerGroupTraining();
                        }
                      }
                      selected={this.state.groupWithTrainer == true}
                    />

                  </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                  <View style={{ flex: 4, flexDirection: 'row', marginLeft: 15 }}>

                    <Icon
                      size={40}
                      color='rgba(216, 121, 112, 1)'
                      name='clock-o'
                    ></Icon>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                      <TimePickerNew setTime={this.onConfirmStartTime} title={'From: '}></TimePickerNew>

                      <TimePickerNew setTime={this.onConfirmEndTime} title={'To: '}></TimePickerNew>

                    </View>

                  </View >
                  
                  <View style={{ flex: 1, }}>

                    <ActionButton
                      buttonColor='#46db93'
                      size={50}
                      renderIcon={active => active ? (<Icon1
                        name="md-create"
                        size={60}
                      />) :
                        (<Icon
                          name='search'
                          color='white'
                          size={20}
                        />)
                      }
                      onPress={() => this.search()}
                    ></ActionButton>

                  </View>

                </View>

              </View>
              :
              <View>

              </View>}

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
                        listViewDisplayed: { backgroundColor: 'blue' }

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
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator style={{ flex: 1 }}
                    size='large'
                  ></ActivityIndicator>
                </View>}


            </View>


          </View>
          :
          null}

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 15,
    height: 15,
  },

  switch: {
    marginTop: 8,
  },

  trainingsPreferencesStyle: {
    flex: 2,
    flexDirection: 'column',
    //marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  trainingsHeadline: {
    flex: 1,
    fontSize: 23,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
  },

  trainingsPreferencesContainerStyle: {
    flex: 3,
    flexDirection: 'row',
  },

  dividerStyle: {
    backgroundColor: 'gray'
  }

})