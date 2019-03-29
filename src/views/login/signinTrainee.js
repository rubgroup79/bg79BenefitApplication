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
} from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import { Font } from 'expo';
import GenderButton from '../../Components/genderButton';
//import UserTypeItem from '../../Components/userTypeItem';

const MALE_AVATAR = require('../../../Images/MaleAvatar.png');
const FEMALE_AVATAR = require('../../../Images/FemaleAvatar.png');
const BOTH_AVATAR = require('../../../Images/BothAvatar.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 250;
const SLIDER_SIZE = SCREEN_WIDTH - 150;

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
      image:'',
      partnerGender: '',
      trainerGender: '',
      minPartnerAge: 0,
      maxPartnerAge:0,
      minBudget:0,
      maxBudget:0,

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

  submit()
  {
  //   fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/CheckIfEmailExists?Email=' + this.state.email, {
  //     method: 'POST',
  //     headers: { "Content-type": "application/json; charset=UTF-8" },
  //     body: JSON.stringify({}),

  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       if (response) {
  //         alert('Email already exists!');
  //       }
  //       else  this.props.navigation.navigate('SignIn1', {email: this.state.email, password: this.state.password});
  //     })

  //     .catch(error => console.warn('Error:', error.message));
   

  // }
  }


  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoaded ? (
          <View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Stav Shalechet</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{
                    uri:
                      'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
                  }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                  }}
                />
              </View>


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
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Radius: {this.state.searchRadius}</Text>

              <View style={styles.partnerPreferencesStyle}>
                <Text style={style = styles.partnersGenderHeadline}>
                  Partner's Gender
                    </Text>
                <View style={styles.partnerPreferencesContainerStyle} >

                  <View style={styles.userTypesContainer}>
                    <GenderButton
                      image={MALE_AVATAR}
                      onPress={() => this.setSelectedType('Male')}
                      selected={this.state.selectedType === 'Male'}
                    />
                    <GenderButton
                      image={FEMALE_AVATAR}
                      onPress={() => { this.setSelectedType('Female'); }}
                      selected={this.state.selectedType === 'Female'}
                    />
                    <GenderButton
                      image={BOTH_AVATAR}
                      onPress={() => { this.setSelectedType('Both'); }}
                      selected={this.state.selectedType === 'Both'}
                    />
                  </View>
                </View>
               
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
                onPress={()=>this.submit()}
                
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
  }


});
