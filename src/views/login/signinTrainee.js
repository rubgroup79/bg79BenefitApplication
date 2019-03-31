import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  LayoutAnimation,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
  Share

} from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import { Font } from 'expo';
import GenderButton from '../../Components/genderButton';
import NumericInput from 'react-native-numeric-input';

import { Constants, ImagePicker, Permissions } from 'expo';

//import UserTypeItem from '../../Components/userTypeItem';
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import ActionButton from 'react-native-action-button';

import ImageUpload from '../../Components/ImagePicker';

const MALE_AVATAR = require('../../../Images/MaleAvatar.png');
const FEMALE_AVATAR = require('../../../Images/FemaleAvatar.png');
const BOTH_AVATAR = require('../../../Images/BothAvatar.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 250;
const SLIDER_SIZE = SCREEN_WIDTH - 150;
const MalePicture = require('../../../Images/MaleAvatar.png');
const FemalePicture = require('../../../Images/FemaleAvatar.png');

class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,

    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected,
    });
  }

  render() {
    const { title } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
        buttonStyle={
          selected
            ? {
              backgroundColor: 'rgba(213, 100, 140, 1)',
              borderRadius: 100,
              width: 127,
            }
            : {
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 30,
              width: 127,
              backgroundColor: 'transparent',
            }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={() => this.setState({ selected: !selected })}
      />
    );
  }
}

export default class SigninTrainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      selectedType: null,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      sportCategories: [],
      gender: null,
      isTrainer: null,
      searchRadius: 5,
      picture: '',
      partnerGender: '',
      trainerGender: '',
      minPartnerAge: 18,
      maxPartnerAge: 30,
      minBudget: 0,
      maxBudget: 0,
      value:0

    };

    this.setSelectedType = this.setSelectedType.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({
      fontLoaded: true,
    });
  }

  submit() {
    const pictureValid = this.validatePicture();
    const partnerGenderValid = this.validatePartnerGender();
    const trainerGenderValid = this.validateTrainerGender();

    if (
      pictureValid &&
      partnerGenderValid &&
      trainerGenderValid
    ) {
      let Trainee = {
        Email: this.props.navigation.getParam('email'),
        Password: this.props.navigation.getParam('password'),
        FirstName: this.props.navigation.getParam('firstName'),
        LastName: this.props.navigation.getParam('lastName'),
        Gender: this.props.navigation.getParam('gender'),
        DateOfBirth: this.props.navigation.getParam('dateOfBirth'),
        SportCategories: this.props.navigation.getParam('sportCategories'),
        IsTrainer: 0,
        Picture: 'this.state.picture',
        SearchRadius: this.state.searchRadius,
        MinBudget: 100,
        MaxBudget: 200,
        MinParntnerAge: 26,
        MaxPartnerAge: 35,
        PartnerGender: this.state.partnerGender,
        TrainerGender: 'Both',
        // Picture: this.state.picture,
        // MinBudget: this.state.minBudget,
        // MaxBudget: this.state.maxBudget,
        // MinPartnerAge: this.state.minPartnerAge,
        // MaxPartnerAge: this.state.maxPartnerAge,
        // TrainerGender: this.state.trainerGender,
      }

      fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/InsertTrainee', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(Trainee),

      })
        .then(res => res.json())
        .then(response => {
          if (response == 0) {
            alert('Error');
          }
          else alert('User Code: ' + response);
          this.props.navigation.navigate('Login');
        })

        .catch(error => console.warn('Error:', error.message));
    }



  }

  validatePicture() {
    if (this.state.picture == null) {
      alert('Please insert picture');
      return false;
    }
    else return true;

  }

  validatePartnerGender() {
    if (this.state.partnerGender == null) {
      alert('Please select prefered partner gender');
      return false;
    }
    else return true;

  }

  validateTrainerGender() {
    if (this.state.trainerGender == null) {
      alert('Please select prefered trainer gender');
      return false;
    }
    else return true;

  }



  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  // //choose image from camera roll
  //     _pickImage = async () => {
  //       const {
  //         status: cameraRollPerm
  //       } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //       // only if user allows permission to camera roll
  //       if (cameraRollPerm === 'granted') {
  //         let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //           allowsEditing: true,
  //           aspect: [4, 3],
  //         });

  //         this._handleImagePicked(pickerResult);
  //       }
  //     };




  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoaded ? (
          <View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>{this.state.firstName + ' ' + this.state.lastName}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View><ImageUpload gender={'Male'}></ImageUpload></View>

              {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={this.props.navigation.getParam('gender') == 'Male' ? MalePicture : FemalePicture}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                  }}
                />
                <ActionButton style={styles.editImageButton} 
                renderIcon={ active => active ? (  <Icon1
                      name="md-create"
                      size={15}
                      style={styles.uploadImageIcon}
                    />) : 
                    (  <Icon1
                      name="md-create"
                      size={15}
                      style={styles.uploadImageIcon}
                    />)
                
                }
                verticalOrientation='down'
                buttonColor='#d0d6e0'
                size={33}
                >
                
                <ActionButton.Item
                buttonColor= 'white'
            
                >
                    <Icon
                      name="upload"
                      size={15}
                      style={styles.uploadImageIcon}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                buttonColor= 'white'
                >
                    <Icon
                      name="camera"
                      size={15}
                      style={styles.uploadImageIcon}
                    />
                </ActionButton.Item>
                </ActionButton> 
            </View>  */}


              <Text
                style={style = styles.textHeadlines}
              >
                Search Radius
                </Text>
              <View style={styles.sliderContainerStyle} >
                <Text style={styles.sliderRangeText}>0</Text >
                <Slider
                  minimumTrackTintColor='white'
                  maximumTrackTintColor='gray'
                  thumbTintColor='rgba(213, 100, 140, 1)'
                  style={styles.sliderStyle}
                  minimumValue={0}
                  step={1}
                  maximumValue={30}
                  value={this.state.searchRadius}
                  onValueChange={value => this.setState({ searchRadius: value })}
                />
                <Text style={style = styles.sliderRangeText}>30</Text>

              </View>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Radius: {this.state.searchRadius} km</Text>

              <View style={styles.partnerPreferencesStyle}>
                <Text style={style = styles.partnersGenderHeadline}>
                  Partner's Gender
                    </Text>
                <View style={styles.partnerPreferencesContainerStyle} >

                  <View style={styles.userTypesContainer}>
                    <GenderButton
                      image={MALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Male')
                          this.setState({ partnerGender: 'Male' })
                        }
                      }
                      selected={this.state.selectedType === 'Male'}
                    />
                    <GenderButton
                      image={FEMALE_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Female')
                          this.setState({ partnerGender: 'Female' })
                        }
                      }
                      selected={this.state.selectedType === 'Female'}
                    />
                    <GenderButton
                      image={BOTH_AVATAR}
                      onPress={
                        () => {
                          this.setSelectedType('Both')
                          this.setState({ partnerGender: 'Both' })
                        }
                      }
                      selected={this.state.selectedType === 'Both'}
                    />
                  </View>
                </View>

              </View>

              <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
              <Text style={style = styles.partnersAgeHeadline}>
                  Partner's Age Range
                    </Text>

                  <NumericInput 
              style={styles.numericInput}
              value={this.state.minPartnerAge} 
              onChange={value => this.setState({minPartnerAge:value})} 
              type='up-down'
              initValue={this.state.minPartnerAge}
              totalWidth={100}
              textColor='white'
              minValue={18}
              maxValue={this.state.maxPartnerAge}
              rounded
              />
              <Text style={{flex:1, color:'white'}}>---</Text>
                    <NumericInput 
              style={styles.numericInput}
              value={this.state.maxPartnerAge} 
              onChange={value => this.setState({maxPartnerAge:value})} 
              type='up-down'
              initValue={this.state.maxPartnerAge}
              totalWidth={100}
              textColor='white'
              minValue={this.state.minPartnerAge}
              maxValue={100}
              rounded
              />
              </View>
            




              <Button
                containerStyle={{ marginVertical: 20 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                buttonStyle={{
                  height: 55,
                  width: SCREEN_WIDTH - 250,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                linearGradientProps={{
                  colors: ['rgba(216, 121, 112, 1)', 'rgba(216, 121, 112, 1)'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                title="Submit"
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={() => this.submit()}

                activeOpacity={0.5}
              />

            </ScrollView>
          </View>
        ) : (
            <Text>Loading...</Text>
          )}
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
    height: 100,

  },
  inputContainer: {
    marginTop: 25
  },
  sliderStyle: {
    width: SLIDER_SIZE,
    marginTop: 25,
  },


  sliderContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -18
  },

  partnerPreferencesContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    //alignItems: 'center',
    flexDirection: 'row',
    marginRight: 40

  },
  sliderRangeText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 37,
    textAlign: 'center'
  },
  textHeadlines: {
    flex: 1,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    marginLeft: 40,
    marginTop: 30
  },
  partnersGenderHeadline: {
    flex: 1,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    marginLeft: 40,
    marginTop: 30
  },

  partnersAgeHeadline:{
    flex: 2,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    marginLeft: 40,
    marginTop: 0
  },

  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    marginTop: -18,
  },
  partnerPreferencesStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  uploadImageIcon: {
    fontSize: 20,
    height: 22,
    color: 'black'
  },
  editImageButton: {
    marginRight: 95,
    marginTop: -30
  },
  numericInput:{
    flex:1,


  }


});
